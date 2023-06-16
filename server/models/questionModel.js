const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique:true
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    multipleChoice: {
        type: Boolean,
        required: true,
        default: false
    },
    choices: {
        type: Array,
        required: false,
    },
}, {
    versionKey: false,
});

const questionModel = mongoose.model("questions", questionSchema)
module.exports = questionModel