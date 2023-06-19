import axios from 'axios';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';



const AllQuestions = () => {
    // Initialise requirements 
    const navigate = useNavigate()

    // Assign surveys 
    const [Surveys, setSurveys] = useState([])

    // get all surveys 
    useEffect(() => {
        axios.get("https://dyflexisquestionaire.onrender.com/survey/getSurveys").then(async (response) => {
            let surveys = response.data
            for (let i = 0; i < surveys.length; i++) {
                let promise = await axios.get(`https://dyflexisquestionaire.onrender.com/answers/Length/${surveys[i]._id}`).then((response) => response.data)
                surveys[i] = {_id: surveys[i]._id, name: surveys[i].name, questions: surveys[i].questions, surLength: promise}
            }
            setSurveys(surveys);
        })
    }, []);


    //Navigate to a surveys editpage
    const toHome = event => {
        navigate("/Admin")
    }

    return (
        <div className="AddSurvey">
            <div className="questionForm">
                <p className="madeBy">Antwoordenpagina voor administrators</p>
                <div className="formButtonHolder">
                    <button className="backButton" onClick={toHome}>Terug</button>
                </div>    
            </div>
            <div className="questionDisplay">
                {Surveys.map((survey) => {
                    return (
                        <div className="homeQuestions">
                                <div className="stylingDiv">
                                    <div>
                                        <p>Naam: {survey.name}</p>
                                        <p>Aantal vragen: {survey.questions.length}</p>
                                        <p>Aantal keer ingevuld: {survey.surLength}</p>
                                    </div>
                                </div>
                                <div className="homeButton">
                                    <button className="editButton" id={survey._id} onClick={() => {navigate(`/answers/${survey._id}`)}}>Bekijk</button>
                                </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AllQuestions