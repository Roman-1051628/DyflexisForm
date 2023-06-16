//Imports and initialisation
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/User');
const homeRoutes = require('./routes/Home');
const surveyRoutes = require('./routes/Survey')
const questionRoutes = require("./routes/Questions");
const AnswerRoutes = require("./routes/Answers");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Connection to database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB and listening on port', process.env.PORT);
    });
})
.catch(() => {
    console.log("Connection failed");
})

//routes: user
app.use("/auth", userRoutes);

//routes: home
app.use("/home", homeRoutes);

//routes: survey
app.use("/survey", surveyRoutes);

//routes: questions
app.use("/questions", questionRoutes)

//routes: answers
app.use("/answers", AnswerRoutes)
