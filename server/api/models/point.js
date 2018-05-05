import _ from 'lodash';
import mongoose from 'mongoose';
import validator from 'validator';
import moment from 'moment';

const PointSchema = new mongoose.Schema({
    value: {
        type: Number,
        min: 1,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Number,
        required: false,
        min: 1,
        default: moment().valueOf()
    }
});

// Methods
PointSchema.methods.toJSON = function () {
    return _.pick(this.toObject(), ['value', 'userId','createdAt']);
}

export const Point = mongoose.model('Point', PointSchema);