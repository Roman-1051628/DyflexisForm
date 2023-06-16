const answerModel = require("../models/answerModel");
const surveyModel = require("../models/surveyModel");
const userModel = require("../models/userModel");

//get all answers where completed is true and replace the user_id by the user's name
const getCompletedAnswers = async (req, res) => {
    try {
        const enquete_id = req.params.id;
        const answers = await answerModel.find({ enquete_id: enquete_id, completed: true });
        const users = await userModel.find();

        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (answers[i].user_id == users[j]._id) {
                    answers[i].user_id = users[j].name;
                }
            }
        }

        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//check if the survey is anonymous
const isAnonymous = async (req, res) => {
    try {
        const enquete_id = req.params.id;
        const survey = await surveyModel.findOne({ _id: enquete_id });

        res.status(200).json(survey.anonymous);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get the number of answers for a survey
const getNumberOfAnswers = async (req, res) => {
    try {
        const enquete_id = req.params.id;
        const answers = await answerModel.find({ enquete_id: enquete_id, completed: true });

        res.status(200).json(answers.length);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//export functions

module.exports = {
    getCompletedAnswers,
    isAnonymous,
    getNumberOfAnswers
};
