import BaseController from './baseController';
import { Activity } from '../models/activity';
import _ from 'lodash';
import { User } from '../models/user';
import GeoPoint from 'geopoint';
import geojson from 'geojson-coords'
import axios from 'axios';

// JSON Files
import Google from './../../config/json/google.json';
import grandsParcs from './../../../data/grandsparcs.json';
import ecoTerritoires from './../../../data/ecoterritoires.json';
import espacesVerts from './../../../data/espacesverts.json';
import { activities } from './../../../data/activities.json';

export default class ActivityController extends BaseController {
    async store(coords) {
        // Call google API
        const addr    = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[1]},${coords[0]}&key=${Google.GEOLOCATION}`),
              address = addr.data.results[0].formatted_address;

        // Create new activity
        const activity = new Activity({
            ...activities[Math.floor(Math.random()*activities.length)],
            address,
        });
        await activity.save();
        return this.res.status(201).json({ activity });
    }

    async index() {
        try {
            Activity.find({}).sort({ createdAt: -1 }).exec((err, activities) => {
                if (err) throw err;
                return this.res.json({ activities });
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }

    async finish() {
        try {
            // Update activity's users
            const activity = await Activity.findByIdAndUpdate(this.req.params.id, { $push: { users: [{ user: this.user._id }] } });
            // Update user's points
            await User.findByIdAndUpdate(this.user._id, { $inc: { points: activity.points } });
            return this.res.json({
                success: true,
                message: 'Activity successfully finished!'
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }

    async generate() {
        try {
            this.req.checkBody('lat', 'Latitude is required').notEmpty();
            this.req.checkBody('lng', 'Longitude is required').notEmpty();
            this.req.checkBody('activityType', 'Activity type is required').notEmpty();

            const errors = this.req.validationErrors();
            if (errors) return this.res.status(406).json({ errors });

            const body = _.pick(this.req.body, ['lat', 'lng', 'activityType']);

            // 0 => Grands parcs, 1 => Eco territoires, 2 => Espaces verts
            if (!_.includes([0, 1, 2], _.toInteger(body.activityType))) {
                return this.res.status(406).json({
                    success: false,
                    message: 'You must provide a correct Activity Type.'
                });
            }

            // Read appropriate json file and find coordinate | closest coordinate.
            let data = this.fileReading(_.toInteger(body.activityType));
            if (!data) return this.res.status(406).json({ error: 'No activity found near that place.' });
            return await this.store(data);
        } catch (error) {
            return this.res.status(500).json({ error: error.message });
        }
    }

    fileReading(activityType) {
        switch (activityType) {
            case 0: { // Grands parcs
                return this.readData(grandsParcs);
                break;
            }
            case 1: { // EcoTerritoires
                return this.readData(ecoTerritoires);
                break;
            }
            case 2: { // Espaces verts
                return this.readData(espacesVerts);
                break;
            }
        }
    }

    readData(data) {
        const userLocation = new GeoPoint(_.toNumber(this.req.body.lat),_.toNumber(this.req.body.lng));
        return geojson(data).find(coordinate => userLocation.distanceTo(new GeoPoint(coordinate[1], coordinate[0]), true) <= 1);
    }
}