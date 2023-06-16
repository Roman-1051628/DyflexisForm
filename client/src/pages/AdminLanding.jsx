import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';


const AdminLanding =  () => {
    // Initialise requirements 
    const navigate = useNavigate()


    //Sets UserId
    let [ UserId, setUserId ] = useState([]);

    //this will get the users id from user located in the local storage and set it to the user_id variable
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        setUserId(user.name);
    }, []);

    // Button redirects 
    const toSurvey = event => {
        navigate("/survey")
    }

    const toQuestions = event => {
        navigate("/questions")
    }

    const toAnswers = event => {
        navigate("/answers")
    }


    return (
        <div className="AdminLanding">
            <div className="questionForm">
                <h1 className="landingTitle">Welkom, {UserId}</h1> 
                <h2 className="subTitle">Kies wat je wilt bekijken:</h2>
            </div>    
            <div className="landingButtons">
                <button className="LandingButton one" onClick={toSurvey}>Vragenlijsten</button>
                <button className="LandingButton two" onClick={toQuestions}>Vragen</button>
                <button className="LandingButton three" onClick={toAnswers}>Antwoorden</button>
            </div>
        </div>
    )
}

export default AdminLanding