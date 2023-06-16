import { useEffect, useState } from "react"


const UserHome = () => {
    // Initialise requirements
    const [ UserId, setUserId ] = useState([]);
    const [ survey, setSurvey ] = useState([]);

    //this will get the users id from user located in the local storage and set it to the user_id variable
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        setUserId(user.name);
    }, []);

    //this will handle the submit of the form
    const HandleSubmit = (e) => {
        e.preventDefault();

        window.location.replace(survey);
    }


    return (
        <div className="questionForm">
            <p className="welcomePageText">Welkom, {UserId}</p>
            <p className="formText answerPageText">Vul hieronder de link in van de vragenlijst die je wilt invullen:</p>
            <input className="forminput" type="text" placeholder="Vragenlijst link" onChange={(e) => setSurvey(e.target.value)} />
            <button className="addButton" onClick={HandleSubmit}>Ga naar vragenlijst</button>
        </div>
    )
}

export default UserHome