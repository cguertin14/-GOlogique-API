import BaseController from './baseController';
import { Point } from '../models/point';

export default class PointsController extends BaseController {
    async leaderBoard() {
        try {
            Point.find({}).sort({ value: -1 }).populate('user','firstName lastName -_id').exec((err, points) => {
                if (err) throw err;
                return this.res.json({ points });
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }
}