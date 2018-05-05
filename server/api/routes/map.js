import MapController from './../controllers/mapController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
const router = express.Router();

router.post('/gendata', async (req, res) => {
    await new MapController(req,res).generateData();
});

router.post('/genpoints', async (req, res) => {
    await new MapController(req, res).generatePoints(); 
});

export default router;