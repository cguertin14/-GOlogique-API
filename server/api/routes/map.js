import MapController from './../controllers/mapController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    new MapController(req,res).generateData();
});

export default router;