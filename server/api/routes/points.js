import PointController from './../controllers/pointController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
const router = express.Router();

router.get('/leaderboard', bearer, async (req, res) => {
    await new PointController(req, res).leaderBoard();
});

export default router;