const express = require('express');


//controller functions
const {
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
} = require('../controllers/SurveyController');


const router = express.Router();

//Get requests
router.get("/getSurveys", getSurveys)

router.get("/getQuestionByID/:id", getQuestionByID)

router.get("/getQuestions/:id", getAllQuestionIDs)

router.get("/getAllQuestions", getAllQuestions)

//Route: Update a Survey
router.put("/updateSurvey/:id", updateSurvey)

//Route: Create a new survey
router.post("/createSurvey", createSurvey)

//Route: update a survey's questions
router.put("/updateSurveyQuestions/:id", updateSurveyQuestions)

//Route: Update a question by it's id
router.put("/updateQuestion/:ques_id", updateQuestion)

//Route: delete specific durvey
router.delete("/deleteSurvey/:id", deleteSurveyById)

//Route: get specific survey by it's id
router.get('/:id', getSurveyById);

//Route: get survey question ids
router.get('/questionIds/:id', getQuestionIds);

//Route: get all survey questions
router.get('/questions/:id', getAllSurveyQuestions);

//Route: get the corresponding text from the question model for a given question id from the survey model
router.get('/questions/:id/:index', getQuestionByIndex);

//Route: get the question id for a given question index
router.get('/questionId/:id/:index', getQuestionIdByIndex);

//Route: get all possible answers for a question
router.get('/answers/:id/:index', getAllAnswersForQuestion);

//Route: check if the question is multiple choice
router.get('/multipleChoice/:id/:index', checkIfMultipleChoice);

//Route: get the length of the questions array for a given survey
router.get('/length/:id', getLengthOfQuestionsArray);

//Route: post the answer to the corresponding arrays in the answer model
router.post('/answer/:id/:index', postAnswer);

//Route: update the answer to the corresponding arrays in the answer model
router.put('/updateanswer/:id/:userid', updateAnswer);

//Route: get answers for a given survey
router.get('/getanswers/:id/:userid', getAnswersForSurvey);

//Route: check if an answer exists for a given survey and user
router.get('/checkifanswered/:id/:userid', checkIfAnswerExists);

//Route: get the survey name for a given survey id
router.get('/surveyname/:id', getSurveyNameById);

//Route: post an empty answer document to the answer model with the given survey id and user id
router.post('/postemptyanswer/:id/:userid', postEmptyAnswer);

module.exports = router