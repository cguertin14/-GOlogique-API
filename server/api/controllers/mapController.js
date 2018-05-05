import _ from 'lodash';
import { ObjectId } from 'mongodb';
import BaseController from './baseController';
import Google from './../../config/json/google.json';
import axios from 'axios';

export default class MapController extends BaseController {

    async generateData() {
        try {
            const payload = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.req.body.lat},${this.req.body.lng}&key=${Google.GEOLOCATION}`);
            const img = await axios.get(`https://maps.googleapis.com/maps/api/streetview?size=128x128&location=${this.req.body.lat},${this.req.body.lng}&heading=151.78&pitch=-0.76&key=${Google.STREET_VIEW}`);
            var address = payload.data.results[0].formatted_address;
            var image = img.config.url;
            
            return this.res.json({ address, image });
        } catch(e) {
            console.log(e);
            
            return this.res.status(400).send(e);
        }
    }

    async generatePoints() {
        try {

        } catch(e) {

        }
    }
}