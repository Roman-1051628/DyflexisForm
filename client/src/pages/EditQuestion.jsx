import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditQuestion = () => {
    const navigate = useNavigate();
    const param = useParams();

    let [Questions, setQuestions] = useState([]);

    useEffect(() => {
        var urlCheck = window.location.href;
        urlCheck = urlCheck.split("/")[3];
        const quesID_questions = param.id     //
        const quesID_survey = param.ques_id;
        if (urlCheck === "survey"){
            var url = "https://dyflexisquestionaire.onrender.com/survey/getQuestionByID/" + quesID_survey;    
        } else if (urlCheck === "questions"){
            var url = "https://dyflexisquestionaire.onrender.com/survey/getQuestionByID/" + quesID_questions;
        }   
        axios.get(url).then((response) => {
            setQuestions(response.data);
        })
    }, []);

    const backToSurvey = () => {
        var urlCheck = window.location.href;
        urlCheck = urlCheck.split("/")[3];
        if (urlCheck === "survey"){
            navigate(`/survey/${param.id}/edit`)
        } else if (urlCheck === "questions"){
            navigate(`/questions`)
        } else {
            navigate(`/questions`)
        }
        
    }


    const submitChanges = () => {
        const question = document.getElementById("name").value;

        const options = []
        const selection = document.querySelectorAll('[id^="question-"]')
        for (let i = 0; i < selection.length; i++){
            options.push(selection[i].value)
        }
        
        console.log(options)
        var urlCheck = window.location.href;
        urlCheck = urlCheck.split("/")[3];
        const quesID_questions = param.id     //
        const quesID_survey = param.ques_id;
        if (urlCheck === "survey"){
            var url = "https://dyflexisquestionaire.onrender.com/survey/updateQuestion/" + quesID_survey;    
        } else if (urlCheck === "questions"){
            var url = "https://dyflexisquestionaire.onrender.com/survey/updateQuestion/" + quesID_questions;
        }
        axios.put(url, {name: question, options: options})
        if (urlCheck === "survey"){
            navigate(`/survey/${param.id}/edit`)
        } else if (urlCheck === "questions"){
            navigate(`/questions`)
        } else {
            navigate(`/questions`)
        }   
    }

    const Choices=()=>{
        if (Questions.multipleChoice === true){
            return(
                <>
                <div className="multipleChoice">
                    {Questions.choices.map((choice, i) => (
                        <div className="choice">
                            <label for={i + 1}>{i + 1}.</label>
                            <input id={`question-${i + 1}`} name={i + 1} type="text" defaultValue={choice}></input>
                        </div>
                    ))}
                </div>
                <div className="formButtonHolder">
                    <button onClick={backToSurvey} className="backButton">Annuleer</button>
                    <button className="addButton" onClick={submitChanges}>Opslaan</button>
                </div>
                </>
            )
        } else {
            return(
                <div className="formButtonHolder">
                    <button onClick={backToSurvey} className="backButton">Annuleer</button>
                    <button className="addButton" onClick={submitChanges}>Opslaan</button>
                </div>
            )
        }
    }

    return(
        <div className="questionForm">
            <h1>Vraag aanpassen</h1>
            <input className="forminput" id="name" type="text" defaultValue={Questions.question}></input>
            <Choices />
        </div>
        
        
    )

}

export default EditQuestion