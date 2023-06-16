const express = require('express');

//controller functions
const {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion
} = require('../controllers/QuestionController');

const router = express.Router();

//Route: getquestions
router.get('/getquestions', getAllQuestions);

//Route: getquestion
router.get('/getquestion/:id', getQuestion)

//Route: createquestion
router.post('/createquestion', createQuestion);

//Route: updatequestion
router.put('/updatequestion/:id', updateQuestion)

//Route: deletequestion
router.delete('/deletequestion/:id', deleteQuestion)



module.exports = router;