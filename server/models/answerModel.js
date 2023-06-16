const mongoose = require("mongoose")

const answerSchema = new mongoose.Schema({
    enquete_id: {
        type: String,
        required: true,
    },
    questions: [{
        type: String,
        required: true,
    }],
    answers: [{
        type: String,
        required: true,
    }],
    user_id: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    versionKey: false,
});

const answerModel = mongoose.model("answers", answerSchema)
module.exports = answerModel