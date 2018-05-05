import _ from 'lodash';
import mongoose from 'mongoose';
import validator from 'validator';
import moment from 'moment';

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    users: [
        {
            completedAt: {
                type: Number,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
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
ActivitySchema.methods.toJSON = function () {
    return _.pick(this.toObject(), ['value', 'user','createdAt']);
}

export const Activity = mongoose.model('Activity', ActivitySchema);