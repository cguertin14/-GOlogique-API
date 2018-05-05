import _ from 'lodash';
import { ObjectId } from 'mongodb';
import BaseController from './baseController';
import Google from './../../config/json/google.json';
import axios from 'axios';
import fs from 'fs';
import geolib from 'geolib';
import Path from 'path';
import coords from './../../../data/grandsparcs.json';

export default class MapController extends BaseController {

    async generateData() {
        try {
            const addr = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.req.body.lat},${this.req.body.lng}&key=${Google.GEOLOCATION}`);
            const img = await axios.get(`https://maps.googleapis.com/maps/api/streetview?size=128x128&location=${this.req.body.lat},${this.req.body.lng}&heading=151.78&pitch=-0.76&key=${Google.STREET_VIEW}`);
            var address = addr.data.results[0].formatted_address;
            var image = img.config.url;

            return this.res.json({ address, image });
        } catch (e) {
            return this.res.status(400).send(e);
        }
    }

    async generatePoints() {
        try {
            coords.forEach(element => {
                
            });
            
            let data = coords.filter(coordinate => {
                if (geolib.isPointInCircle({
                    latitude: coordinate[0],
                    longitude: coordinate[1]
                }, {
                        latitude: this.req.body.lat,
                        longitude: this.req.body.lng
                    }, 5000)) {
                    return coordinate;
                }
            });

            if (data.length >= 5)
                return this.res.json(data.slice(0,4));
            else
                return this.res.json(data);    

        } catch (e) {
            return this.res.status(400).send(e);
        }
    }
}