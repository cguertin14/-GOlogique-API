import BaseController from './baseController';
import { Activity } from '../models/activity';
import _ from 'lodash';
import { User } from '../models/user';

export default class ActivityController extends BaseController {
    async store() {
        this.req.checkBody('name', 'Name is required').notEmpty();
        this.req.checkBody('description', 'Description is required').notEmpty();
        this.req.checkBody('imageUrl', 'Image URL is required').notEmpty();
        this.req.checkBody('points', 'Points are required').notEmpty();

        const errors = this.req.validationErrors();
        if (errors) return this.res.status(406).json({ errors });

        try {
            // Create new activity await here with data
            const data = _.pick(this.req.body, ['name','description','imageUrl','points']);
            const activity = new Activity(data);
            await activity.save();
            return this.res.status(201).json({
                success: true,
                message: 'Activity successfully created!'
            });
        } catch (error) {
            return this.res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async index() {
        try {            
            Activity.find({}).sort({ createdAt: -1 }).exec((err, activities) => {
                if (err) throw err;
                return this.res.json({ activities });
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }

    async finish() {
        try {
            // Update activity's users
            const activity = await Activity.findByIdAndUpdate(this.req.params.id, { $push: { users: [{ user: this.user._id }] } });
            // Update user's pointsk
            await User.findByIdAndUpdate(this.user._id, { $inc: { points: activity.points } });
            return this.res.json({
                success: true,
                message: 'Activity successfully finished!'
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }
}