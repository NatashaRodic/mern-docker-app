const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    status: {
        type: String,
        enum: ['approved', 'denied', 'pending'],
        default: 'pending'
    },
    personalStatement: {
        type: String,
        required: true
    },
    commitPerWeek: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Application', applicationSchema);