import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserSurvey = () => {
    const { id } = useParams();
    const { index } = useParams();
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [checkedAnswer, setCheckedAnswer] = useState("");
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [length, setLength] = useState(0);
    const [answerArray, setAnswerArray] = useState([]);

    // this will get the users id from user located in the local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get(`http://localhost:3000/survey/getanswers/${id}/${user.id}`)
            .then((res) => {setAnswerArray(res.data)
        })
            .catch(err => console.log(err));
    }, [id]);

    //this will get the question by index located in the url
    useEffect(() => {
        axios.get(`http://localhost:3000/survey/questions/${id}/${index}`)
            .then(res => setQuestion(res.data))
            .catch(err => console.log(err));	
    }, [id, index]);

    //this will check if the question is multiple choice
    useEffect(() => {
        axios.get(`http://localhost:3000/survey/multipleChoice/${id}/${index}`)
            .then(res => setMultipleChoice(res.data))
            .catch(err => console.log(err));
    }, [id, index]);

    //this will get the possible answers for the multiple choice question
    useEffect(() => {
        axios.get(`http://localhost:3000/survey/answers/${id}/${index}`)
            .then(res => setAnswers(res.data))
            .catch(err => console.log(err));
    }, [id, index]);

    //this will get the length of the questions array for a given survey
    useEffect(() => {
        axios.get(`http://localhost:3000/survey/length/${id}`)
            .then(res => setLength(res.data))
            .catch(err => console.log(err));
    }, [id]);

    //this will handle the change of the radio button
    const handleChange = (e) => {
        setCheckedAnswer(e.target.value);
    }

    //this will handle the redirect to the previous question
    const handlePrevious = () => {
        window.location.href = `http://localhost:4000/survey/${id}/${parseInt(index) - 1}`;
    }

    //this will handle the redirect to de survey start page 
    const handleStart = () => {
        window.location.href = `http://localhost:4000/survey/${id}`;
    }

    //this will log the checked answer to the console and then post the answer to the database, it will make the checked answer an empty string if no answer is selected
    const handleNext = (e) => {
        e.preventDefault();
        if (checkedAnswer === null) {
            setCheckedAnswer("")
        }
        const newArray = answerArray
        newArray[index] = checkedAnswer
        setAnswerArray(newArray)
        const user = JSON.parse(localStorage.getItem("user"));
        axios.put(`http://localhost:3000/survey/updateanswer/${id}/${user.id}`, {answers: answerArray})
        .then(window.location.href = `http://localhost:4000/survey/${id}/${parseInt(index) + 1}`)
        .catch(err => console.log(err));
    }

    //this will log the checked answer to the console and then post the answer to the database, it will make the checked answer an empty string if no answer is selected, then it will redirect to the end of the survey
    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkedAnswer === null) {
            setCheckedAnswer("")
        }
        const newArray = answerArray
        newArray[index] = checkedAnswer
        setAnswerArray(newArray)
        const user = JSON.parse(localStorage.getItem("user"));
        axios.put(`http://localhost:3000/survey/updateanswer/${id}/${user.id}`, {answers: answerArray, completed: true})
        .then(window.location.href = `http://localhost:4000/survey/${id}/end`)
        .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <div className="user-survey">
                <h1>Question {parseInt(index) + 1}</h1>
                <h3>{question}</h3>
                <div className="user-survey-details">
                <form>
                    {multipleChoice ? answers.map((answer, i) => {
                        return (
                            <div key={i} className="user-survey-answer">
                                <input type="radio" name="answer" value={answer} onChange={(e) => handleChange(e)} />
                                <label>{answer}</label>
                            </div>
                        )
                    }) : <input type="text" name="answer" onChange={(e) => setCheckedAnswer(e.target.value)} />}
                </form>
                </div>
            </div>
            <footer>
            <div className="survey-container">
                <div className="footer-survey-bar">
                        <p className="question_progress">Vraag <strong>{parseInt(index) + 1}</strong> van <strong>{length}</strong></p>
                        <div className="survey-buttons">
                            {index > 0 ? <button onClick={handlePrevious} className="btn user-survey-previous">Vorige</button> : <button onClick={handleStart} className="btn user-survey-previous">Terug</button>}
                            {index < length - 1 ? <button onClick={handleNext} className="btn user-survey-next">Volgende</button> : <button disabled className="btn-disabled user-survey-next-disabled">Volgende</button>}
                            {index < length - 1 ? <button disabled className="btn-disabled-submit user-survey-submit-disabled">Verzend</button> : <button className="btn-submit user-survey-submit" onClick={handleSubmit}>Verzend</button>}
                        </div>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default UserSurvey;