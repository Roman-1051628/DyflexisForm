const surveyModel = require("../models/surveyModel");
const questionModel = require("../models/questionModel");
const answerModel = require("../models/answerModel");

// get the survey by id

const getSurveyById = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);

        res.status(200).json(survey);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get the survey name by id

const getSurveyNameById = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);

        res.status(200).json(survey.name);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get ids for all questions in a survey

const getQuestionIds = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);

        res.status(200).json(survey.questions);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get all text for survey questions for a survey

const getAllSurveyQuestions = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);

        for (let i = 0; i < survey.questions.length; i++) {
            const question = await questionModel.findById(survey.questions[i]);
            survey.questions[i] = question.question;
        }

        res.status(200).json(survey.questions);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get the text for a single question by index

const getQuestionByIndex = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        const question = await questionModel.findById(survey.questions[req.params.index]);
        
        if (req.params.index >= survey.questions.length) {
            console.log(survey.questions.length);
            throw new Error("Index out of bounds");
        } else if (req.params.index < 0) {
            console.log(survey.questions.length);
            throw new Error("Index cannot be negative");
        }

        res.status(200).json(question.question);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

const getSurveys = async (req, res) => {
    try {
        const surveys = await surveyModel.find({});
        
        res.status(200).json(surveys);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// get the id for a single question by index

const getQuestionIdByIndex = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        const question = await questionModel.findById(survey.questions[req.params.index]);
        
        if (req.params.index >= survey.questions.length) {
            console.log(survey.questions.length);
            throw new Error("Index out of bounds");
        } else if (req.params.index < 0) {
            console.log(survey.questions.length);
            throw new Error("Index cannot be negative");
        }

        res.status(200).json(question._id);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get all possible answers for a question

const getAllAnswersForQuestion = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        const question = await questionModel.findById(survey.questions[req.params.index]);
        const choices = question.choices;

        if (question.multipleChoice) {
            res.status(200).json(choices);
        } else {
            res.status(200).json("This is a free response question");
        }
    } catch (e) {
        if (e.message === "Cannot read properties of n ull (reading 'choices')") {
            res.status(200).json("This question does not exist");
        }
    }
}

//this will check if the questiobn is a multiple choice question or a free response question

const checkIfMultipleChoice = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        const question = await questionModel.findById(survey.questions[req.params.index]);

        res.status(200).json(question.multipleChoice);
    } catch (e) {
        if (e.message === "Cannot read properties of null (reading 'multipleChoice')") {
            res.status(200).json("This question does not exist");
        }
    }
}

// this will give the length of the questions array for a given survey

const getLengthOfQuestionsArray = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);

        res.status(200).json(survey.questions.length);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// this will post the question with the answer to the corresponding arrays in the answer model

const postAnswer = async (req, res) => {
    try {
        const answer = await answerModel.create(req.body);

        res.status(200).json(answer);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//this will update the answer for a given question in a given survey for a given user

const updateAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        await answerModel.findOneAndUpdate({enquete_id: id, user_id: req.params.userid}, req.body, {new: true});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// Delete specific Survey
const deleteSurveyById = async (req, res) => {
    try {
        const id = req.params.id;
        await surveyModel.findByIdAndDelete(id);

        res.json({message: "Survey deleted"});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

//get the answers array for given survey with given id

const getAnswersForSurvey = async (req, res) => {
    try {
        const id = req.params.id
        const user = await answerModel.findOne({enquete_id: id, user_id: req.params.userid})
        res.status(200).json(user.answers);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//this will check if a document exists in the answer model with the given survey id and user id

const checkIfAnswerExists = async (req, res) => {
    try {
        const enquete_id = req.params.id
        const user_id = req.params.userid
        const user = await answerModel.findOne({enquete_id: enquete_id, user_id: user_id})
        if (user) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//this will post an empty answer document to the answer model with the given survey id and user id

const postEmptyAnswer = async (req, res) => {
    try {
        const questions = await surveyModel.findById(req.params.id);
        const questions_array = questions.questions;

        const answer = await answerModel.create(
            {
                enquete_id: req.params.id,
                user_id: req.params.userid,
                questions: questions_array,
                answers: [],
                completed: false
            }
        );

        res.status(200).json(answer);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

//get all survey questions for a survey
const getAllQuestionIDs = async (req, res) => {
    try {
        const survey = await surveyModel.findById(req.params.id);
        exportable = [];

        for (let i = 0; i < survey.questions.length; i++) {
            const question = await questionModel.findById(survey.questions[i]);
            // survey.questions[i] = question.question;
            exportable.push({id: survey.questions[i], question: question.question});
        }
        res.status(200).json(exportable);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// Alter survey question array
const updateSurveyQuestions = async (req, res) => {
    try{ 
        const id = req.params.id;
        const newQuestions = req.body;
        const updatedSurvey = await surveyModel.findByIdAndUpdate(id, {questions: newQuestions}, {new: true});

        res.status(200).json(updatedSurvey);
    } 
    catch (e)  {
        res.status(400).json({error: e.message});
    }
}

// Get question and their id
const getQuestionByID = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionModel.findById(id);
        
        res.status(200).json(question)
    } catch (e) {
        res.status(400).json({error: e.message}); 
    }
}

//Updates a survey's questions
const updateQuestion = async (req, res) => {
    try {
        const id = req.params.ques_id;
        const newQuestion = req.body;
        const updated = await questionModel.findByIdAndUpdate(id, {question: newQuestion.name, choices: newQuestion.options});

        res.status(200).json(updated);
    } catch (e) {
        console.log("Failed to Update!")
        res.status(400).json({error: e.message});
    }
}

// Get all questions

const getAllQuestions = async (req, res) => {
    try {
        const allQuestions = await questionModel.find({})
        
        res.status(200).json(allQuestions)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//Create a new Survey
const createSurvey = async (req, res) => {
    try {
        const newSurvey = surveyModel.create(req.body)

        res.status(200).json(newSurvey)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// Update a Survey by it's id
const updateSurvey = async (req, res) => {
    try {
        const id = req.params.id
        const updatedSurvey = await surveyModel.findByIdAndUpdate(id, req.body);  

        res.status(200).json(updatedSurvey)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

module.exports = { 
    getSurveyById,
    getSurveyNameById,
    getAllSurveyQuestions,
    getQuestionByIndex,
    getAllAnswersForQuestion,
    checkIfMultipleChoice,
    getLengthOfQuestionsArray,
    getQuestionIdByIndex,
    postAnswer,
    updateAnswer,
    getAnswersForSurvey,
    checkIfAnswerExists,
    postEmptyAnswer,
    getQuestionIds,
    getSurveys,
    deleteSurveyById,
    getAllQuestionIDs,
    updateSurveyQuestions,
    getQuestionByID,
    updateQuestion,
    getAllQuestions,
    createSurvey,
    updateSurvey
};