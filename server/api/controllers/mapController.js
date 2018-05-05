import _ from 'lodash';
import { ObjectId } from 'mongodb';
import BaseController from './baseController';
import Google from './../../config/json/google.json';
import axios from 'axios';
import fs from 'fs';
import geolib from 'geolib';
import Path from 'path';
import geojson from 'geojson-coords';
import shuffle from 'shuffle-array';
import asyncForEach from './../../utils/asyncForEach';

import espacesverts from './../../../data/espacesverts.json';
import grandsParcs from './../../../data/grandsparcs.json';
import mobilierUrbain from './../../../data/mobilierurbaingp.json';
import ecoterritoires from './../../../data/ecoterritoires.json';
import collectOrganique from './../../../data/collecte-des-matieres-organiques.json';
import collectRecycle from './../../../data/collecte-des-matieres-recyclables.json';
import collectMenage from './../../../data/collecte-des-ordures-menageres.json';
import vulnPluie from './../../../data/vulnerabilitepluiesabondantes2016.json';
import vulnSecheresse from './../../../data/vulnerabilitesecheresses2016.json';
import vulnTempete from './../../../data/vulnerabilitetempetesdestructrices2016.json';
import vulnVague from './../../../data/vulnerabilitevagueschaleur2016.json';

export default class MapController extends BaseController {

    async generateCoords() {
        try {
            const geoJsonFiles = [grandsParcs, ecoterritoires, espacesverts];

            let data = [];
            data = geojson(geoJsonFiles[this.req.body.category]).filter(coordinate => {
                if (geolib.isPointInCircle({
                    latitude: coordinate[1],
                    longitude: coordinate[0]
                }, {
                        latitude: this.req.body.lat,
                        longitude: this.req.body.lng
                    }, this.req.body.range)) {
                    return coordinate;
                }
            });

            if (data.length >= 6) {
                shuffle(data);
                data = data.slice(0, 5);
            }

            let toReturn = [];
            await asyncForEach(data, async (coords) => {
                let addr = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[1]},${coords[0]}&key=${Google.GEOLOCATION}`);
                let img = await axios.get(`https://maps.googleapis.com/maps/api/streetview?size=128x128&location=${coords[1]},${coords[0]}&heading=151.78&pitch=-0.76&key=${Google.STREET_VIEW}`);
                let address = addr.data.results[0].formatted_address;
                let image = img.config.url;
                toReturn.push({
                    info: {
                        address,
                        image
                    },
                    coords
                });
            });
            return this.res.json({ data: toReturn });

        } catch (e) {
            return this.res.status(400).json({ e: e.message });
        }
    }
}