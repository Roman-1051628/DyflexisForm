const express = require('express');

//controller functions
const {
    getCompletedAnswers,
    isAnonymous,
    getNumberOfAnswers
} = require('../controllers/AnswersController');


const router = express.Router();

//Get routes

//Route: get all the answers for a survey
router.get('/getAnswers/:id', getCompletedAnswers);

//Route: check if the survey is anonymous
router.get('/anonymous/:id', isAnonymous);

//Route: get the number of answers for a survey
router.get('/Length/:id', getNumberOfAnswers);

module.exports = router