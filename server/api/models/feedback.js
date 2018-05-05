import _ from 'lodash';
import mongoose from 'mongoose';
import validator from 'validator';
import moment from 'moment';

const FeedbackSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    opinions: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Number,
        required: false,
        min: 1,
        default: moment().valueOf()
    }
});

// Methods
FeedbackSchema.methods.toJSON = function () {
    return _.pick(this.toObject(), ['address', 'opinions','createdAt']);
}

export const Feedback = mongoose.model('Feedback', FeedbackSchema);