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
        minlength: 1,
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: '{VALUE} is not a valid url!'
        }
    },
    points: {
        type: Number,
        required: true,
    },
    users: [
        {
            completedAt: {
                type: Number,
                required: false,
                default: moment().valueOf()
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
    return _.pick(this.toObject(), ['name', 'description','imageUrl', 'points','users','createdAt']);
}

export const Activity = mongoose.model('Activity', ActivitySchema);