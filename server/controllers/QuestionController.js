const questionModel = require("../models/questionModel")

const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find().sort();
        
        res.status(200).json(questions);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

const getQuestion = async (req, res) => {
    try {
        const id = req.params.id
        const question = await questionModel.findOne({"_id":id})
        res.status(200).json(question)
    } catch (e){
        res.status(400).json({error: e.message})
    }
}

const createQuestion = async (req, res) => {
    try {
        const question = await questionModel.create(req.body);
        res.status(200).json(question);
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}

const updateQuestion = async (req, res) => {
    try {
        const id = req.params.id
        const editquestion = req.body
        await questionModel.findByIdAndUpdate(id, editquestion, { new: true })
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}
const deleteQuestion = async (req, res) => {
    try{
        const id = req.params.id
        await questionModel.findByIdAndDelete(id)
        res.json({message: `Question with ID ${id} is deleted!`})
    } catch (e){
        res.status(400).json({message: e.message})
    }
}

module.exports = {
    getAllQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
}