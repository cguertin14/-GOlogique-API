import BaseController from './baseController';
import { Feedback } from './../models/feedback';
import _ from 'lodash';

export default class FeedBackController extends BaseController {
    async store() {
        try {
            this.req.checkBody('address', 'Address is required').notEmpty();
            this.req.checkBody('question', 'Question is required').notEmpty();
            this.req.checkBody('answer', 'Answer is required').notEmpty();

            const errors = this.req.validationErrors();
            if (errors) return this.res.status(406).json({ errors });

            let data = _.pick(this.req.body, ['address', 'question', 'answer']);
            
            await Feedback.findOne({ address: data.address }, async (err, res) => {
                if (err) throw err;
                if (!res) res = new Feedback(data);
                res.opinions.push({ question: data.question, answer: data.answer });
                return await res.save();
            });

            return this.res.status(201).json({
                success: true,
                message: 'Feedback successfully created!'
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }
}