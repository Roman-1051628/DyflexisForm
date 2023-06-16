import axios from 'axios';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";

const AdminHome = () => {
    const navigate = useNavigate()

    const [Surveys, setSurveys] = useState([
        { id:"1234567890", questions: [1,3,6,2,9]}
    ]);

    // Get all surveys from the database
    useEffect(() => {
        axios.get("http://localhost:3000/survey/getSurveys").then((response) => {
            setSurveys(response.data);
        })
    }, []);

    // Delete a single survey
    const deleteSurvey = event => {
        let id = event.currentTarget.id
        axios.delete("http://localhost:3000/survey/deleteSurvey/" + id)
        window.location.reload(false);
    }

    // Navigate to edit survey page
    const editSurvey = event => {
        let id = event.currentTarget.id
        navigate(`/survey/${id}/edit`)
    }

    // Navigate to new survey page
    const addSurvey = event => {
        navigate("/survey/new/")
    }

    //Navigate to a homepage
    const toHome = event => {
        navigate("/Admin")
    }

    // Alert when copied
    const Alertcopied = () => {
        alert("Link gekopieerd!")
    }


    return (
        <div className="AddSurvey">
            <div className="questionForm">
                <p className="madeBy">Vragenlijst pagina voor administrators</p>
                <div className="formButtonHolder">
                    <button className="backButton" onClick={toHome}>Terug</button>
                    <button className="addButton" onClick={addSurvey}>Maak nieuwe vragenlijst</button>
                </div>    
            </div>
            <div className="questionDisplay">
                {Surveys.map((survey) => {
                    return (
                        <div className="homeQuestions">
                                <div className="stylingDiv">
                                    <div>
                                        <p>Naam: {survey.name}</p>
                                        <p>Maker: {survey.creator_id}</p>
                                        <p>Aantal vragen: {survey.questions.length}</p>
                                    </div>
                                    <CopyToClipboard text={`http://localhost:4000/survey/${survey._id}`}>
                                        <button onClick={Alertcopied} className="copyButton">Kopieer link</button>
                                    </CopyToClipboard>
                                </div>
                                <div className="homeButton">
                                    <button className="editButton" id={survey._id} onClick={editSurvey}>Wijzig</button>
                                    <button className="deleteButton" id={survey._id} onClick={deleteSurvey}>Verwijder</button>
                                </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AdminHome