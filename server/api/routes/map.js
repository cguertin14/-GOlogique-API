import MapController from './../controllers/mapController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
const router = express.Router();

router.post('/gencoords', bearer, async (req, res) => {
    await new MapController(req, res).generateCoords(); 
});

export default router;