import BaseController from './baseController';
import { User } from '../models/user';

export default class PointController extends BaseController {
    async leaderBoard() {
        try {
            User.find({}).select(['firstName','lastName','-_id']).exec((err, users) => {
                if (err) throw err;
                users.sort((a,b) => b.point.value - a.point.value);
                return this.res.json({ users });
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }
}