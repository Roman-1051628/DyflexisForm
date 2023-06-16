import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserSurveyStart = () => {
    const { id } = useParams();
    const [ UserId, setUserId ] = useState([]);
    const [ Name, setName ] = useState([]);
    const [ SurveyName, setSurveyName ] = useState([]);

    //this will get the users name from user located in the local storage and set it to the name variable
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setName(user.name);
    }, []);

    //this will get the users id from user located in the local storage and set it to the user_id variable
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserId(user.id);
    }, []);

    //this will get the survey name from the survey id located in the url and set it to the surveyname variable
    useEffect(() => {
        axios.get(`http://localhost:3000/survey/surveyname/${id}`)
            .then(res => setSurveyName(res.data))
            .catch(err => console.log(err));
    }, [id]);

    //this will check if the user has already answered the survey, if not it will create a new entry in the useranswers table
    const Checkifanswered = () => {
        axios.get(`http://localhost:3000/survey/checkifanswered/${id}/${UserId}`)
            .then(res => {
                if(res.data === true)
                {
                    window.location.href = `/survey/${id}/0`;
                }
                else
                {
                    axios.post(`http://localhost:3000/survey/postemptyanswer/${id}/${UserId}`)
                        .then(res => {
                            window.location.href = `/survey/${id}/0`;
                        }
                        )
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h3>Welkom, {Name}</h3>

            <p>Je start zo met de survey: <strong>{SurveyName}</strong></p>

            <p>Om de survey te starten, klik op 'Start Survey'</p>

            <footer>
            <div className="survey-container">
                <div className="footer-survey-bar">
                    <div className="survey-buttons">
                    <button className="user-survey-start-button" onClick={Checkifanswered}>Start Survey</button>
                    </div>
                </div>
            </div>
            </footer> 
        </div>
    );
};

export default UserSurveyStart;