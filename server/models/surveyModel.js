const mongoose = require("mongoose")

const surveySchema = new mongoose.Schema({
    creator_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    },
}, {
    versionKey: false,
});

const SurveyModel = mongoose.model("surveys", surveySchema)
module.exports = SurveyModel