import React from 'react'

    //this will handle the redirect to de survey start page 
    const handleHome = () => {
        window.location.href = `http://localhost:4000/`;
    }

const UserSurveyEnd = () => {
    return (
        <div className="home">
            <h1>Bedankt voor het invullen van de survey!</h1>

            <p>Je kan nu dit tabblad sluiten of terug naar de home pagina gaan.</p>

        <footer>
        <div className="survey-container">
            <div className="footer-survey-bar">
                <div className="survey-buttons">
                <button className="user-survey-start-button" onClick={handleHome}>Home</button>
                </div>
            </div>
        </div>
        </footer>
        </div>
    )
}

export default UserSurveyEnd