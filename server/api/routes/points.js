import PointsController from './../controllers/pointsController';
import { bearer } from './../middlewares/authenticate';
import express from 'express';
import { body, check } from 'express-validator/check';
const router = express.Router();

router.get('/leaderboard', bearer, async (req, res) => {
    await new PointsController(req, res).leaderBoard();
});

export default router;