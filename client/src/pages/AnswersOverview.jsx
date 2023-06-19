import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from "react-csv";


function QuestionOverview() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [SurveyName, setSurveyName] = useState('');
    const [Answers, setAnswers] = useState([]);
    const [Anonymous, setAnonymous] = useState(false);
    const [Length, setLength] = useState(0);  
    const [CSV, setCSV] = useState([])  
    const [Headers, setHeaders] = useState(["Naam"])

    useEffect(() => {
        axios.get(`https://dyflexisquestionaire.onrender.com/answers/getanswers/${id}`)
        .then(res => {
            setAnswers(res.data);
            res.data[0].questions.map((id) => {
                axios.get(`https://dyflexisquestionaire.onrender.com/questions/getquestion/${id}`) 
                .then(res => {setHeaders(Headers => [...Headers, res.data.question])})
                .catch(err => console.log(err))
            })
        }
        )
        .catch(err => console.log(err));
    }, [id]);

    //get survey name
    useEffect(() => {
        axios.get(`https://dyflexisquestionaire.onrender.com/survey/surveyname/${id}`)
        .then(res => {
            setSurveyName(res.data);
        }
        )
        .catch(err => console.log(err));
    }, [id]);

    //get survey anonymous
    useEffect(() => {
        axios.get(`https://dyflexisquestionaire.onrender.com/answers/anonymous/${id}`)
        .then(res => {
            setAnonymous(res.data);
        }
        )
        .catch(err => console.log(err));
    }, [id]);

    //get answer amount for a survey
    useEffect(() => {
        axios.get(`https://dyflexisquestionaire.onrender.com/answers/length/${id}`)
        .then(res => {
            setLength(res.data);
        }
        )
        .catch(err => console.log(err));
    }, [id]);

    const csvFile = event =>{
        var csvData = []
        csvData.push(Headers)
        console.log(Headers)
        Answers.map((answer) => {
            var tempData = []
            tempData.push(answer.user_id)
            answer.answers.map((testing) => {
                tempData.push(testing)
            })
            csvData.push(tempData)
        })
        console.log(csvData)
        setCSV(csvData)
    }
     
    const backToAnswers = event =>{
        navigate(`/answers`)
    }
    
    return (
        <div className="answerUpperContainer">
            <div className="questionForm">
                <p className="answerPageText">Antwoorden voor: {SurveyName}</p>
                <p className="answerPageText">Totaal aantal antwoorden: {Length}</p>
                <div className="formButtonHolder">
                    <button className="backButton" onClick={backToAnswers}>Terug</button>
                    <CSVLink className="csvButton" data={CSV} onClick={csvFile}>
                    Get CSV
                    </CSVLink>
                </div>
            </div>
            <div className="answers">
            {Answers.map((answer) => {
                return (
                    <div className="answerContainer" key={answer.user_id}>
                        <p className="naamText">Naam: {Anonymous === true ? <strong>Anoniem</strong> : <strong>{answer.user_id}</strong>}</p>
                        <p>Antwoorden:
                            <ol key={answer._id}>
                                {answer.answers.map((answer) => {
                                    return (
                                            <li key={answer._id}>
                                                <p>{answer}</p>
                                            </li>
                                    )
                                })}
                            </ol>
                        </p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default QuestionOverview;