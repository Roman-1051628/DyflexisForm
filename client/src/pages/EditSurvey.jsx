import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SurveyEdit = () => {
    // Initialising requirements
    const navigate = useNavigate();
    const param = useParams();


    //Assign questions to page
    let [Questions, setQuestions] = useState([]);
    let [surveyInfo, setSurvey] = useState([]);
    let [surveyQuestions, setSurveyQuestions] = useState([]);

    //Gets all questions in the survey on load
    useEffect(() => {
        const surID = param.id;
        axios.get("https://dyflexisquestionaire.onrender.com/survey/getQuestions/" + surID).then((response) => {
            setSurveyQuestions(response.data);
        })
    }, []);

    //Get surveys information
    useEffect(() => {
        const surID = param.id;
        const url = "https://dyflexisquestionaire.onrender.com/survey/" + surID
        axios.get(url).then((response) => {
            setSurvey(response.data);
        })
    }, [])
    
    //Get all questions that are not in the survey
    useEffect(() => {
        const url = "https://dyflexisquestionaire.onrender.com/survey/getAllQuestions"
        axios.get(url).then((response) => {
            let allquestions = response.data
            const surID = param.id;
            axios.get("https://dyflexisquestionaire.onrender.com/survey/getQuestions/" + surID).then((response) => {
                let ids = []
                let surquestions = response.data
                for (let i = 0; i < surquestions.length; i++) {
                    ids.push(surquestions[i].id)
                }
                for (let index = 0; index < allquestions.length; index++) {
                    if (ids.includes(allquestions[index]._id) === false) {
                        surquestions.push({id: allquestions[index]._id, question: allquestions[index].question})
                    }  
                }
                console.log(surquestions)
                setQuestions(surquestions)
        })
        })
    }, [])


    //Navigate to a surveys editpage
    const toHome = event => {
        navigate("/survey")
    }


    // Update an individual question
    const updateQuestion = event => {
        const updateID = event.currentTarget.id;
        navigate(`${updateID}`)
    }

    //Back to survey overview
    const backHome = event => {
        navigate('/Admin')
    }

    // Commit changes
    const commitChange = event => {
        // Base variables
        let isAnonymous = false
        let questionList = [];

        // Collect all checked boxes
        let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        for (let i = 0; i < checkedBoxes.length; i++) {
            questionList.push(checkedBoxes[i].id)
        }

        //Checks if survey should be anonymous
        if (questionList.includes("anonymous")) {
            questionList.splice("anonymous", 1);
            isAnonymous = true
        }

        //Get all remaining data: Name and UserID
        const nameInput = document.getElementById("nameInput").value

        //Push survey to database
        const updatedSurvey = {name: nameInput, questions: questionList, anonymous: isAnonymous};
        const url = "http://localhost:3000/survey/updateSurvey/" + param.id
        axios.put(url, updatedSurvey)
        
        backHome()
    }

    


    return (
        <div className="AddSurvey">
            <div className="questionForm">
                <p className="madeBy" name="user">Maker: {surveyInfo.creator_id}</p>
                <input type="text" defaultValue={surveyInfo.name} className="forminput" id="nameInput"/>
                <label htmlFor="anonymous">
                {surveyInfo.anonymous === true ?
                    <input id="anonymous" type="checkbox" defaultChecked></input>
                    : <input id="anonymous" type="checkbox"></input>
                    }
                    Anoniem?
                </label>
                <div className="formButtonHolder">
                    <button className="backButton" onClick={toHome}>Terug</button>
                    <button className="addButton" onClick={commitChange}>Save</button>
                </div>
            </div>
            <DragDropContext className="vragenTable" onDragEnd={(param) => {
                const srcIndex = param.source.index
                const desIndex = param.destination.index
                Questions.splice(desIndex, 0, Questions.splice(srcIndex, 1)[0])
                }}>
                <Droppable droppableId="SurveyDroppable">
                    {(provided, _) => (
                        <div className="questionDisplay" ref={provided.innerRef}>
                            {Questions.map((question, i) => {
                                return (
                                    <Draggable key={question.id} draggableId={"draggable-" + question.id} index={i} >
                                        {(provided, _) => (
                                            <div id={"question-" + question.id} className="checkItem" key={question} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <p key={question.question}>{question.question}</p>
                                                <button className="editButton" id={question.id} onClick={updateQuestion}>Wijzig</button>
                                                {surveyInfo.questions.includes(question.id) === true ?
                                                    (<input className="addCheckbox" type="checkbox" id={question.id} defaultChecked></input>)
                                                    : (<input className="addCheckbox" type="checkbox" id={question.id}></input>)
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                        
                </Droppable>    
            </DragDropContext>
        </div>
    )
}

export default SurveyEdit