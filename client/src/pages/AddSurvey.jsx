import { useEffect, useState } from "react"
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AddSurvey = () => {
    const navigate = useNavigate();

    //Sets all questions
    let [Questions, setAllQuestions] = useState([]);
    const [listOfQuestions, setListOfQuestions] = useState([]);


    //Sets UserId
    let [ UserId, setUserId ] = useState([]);
    const [choicesA, setchoicesA] = useState("")
    const [choicesB, setchoicesB] = useState("")
    const [choicesC, setchoicesC] = useState("")
    const [choicesD, setchoicesD] = useState("")
    const [checked, setChecked] = useState(false)
    const [question, setQuestion] = useState("");  




    //Get all questions from the database
    useEffect(() => {
        const url = "https://dyflexisquestionaire.onrender.com/survey/getAllQuestions"
        axios.get(url).then((response) => {
            setAllQuestions(response.data);
        })
    }, []);

    //this will get the users id from user located in the local storage and set it to the user_id variable
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        setUserId(user.name);
    }, []);

    // CHange the state of the checkbox 
    const checkboxChange = () => {
        setChecked(!checked)
    }

    //Back to survey overview
    const backHome = event => {
        navigate('/Admin')
    }

    //Back to survey overview
    const toHome = event => {
        navigate('/survey')
    }

    const createQuestion = () => {
        var questionFound = false;
        listOfQuestions.map((questionMapping) => {
            console.log(questionMapping)
            if(questionMapping.question === question){
                questionFound = true
            }        
        })
        if(questionFound){
            console.log("passing")
            alert("Vraag bestaat al!")
        } else {
            if(checked){
                axios.post("https://dyflexisquestionaire.onrender.com/questions/createquestion", 
                
                {question: question, multipleChoice: checked, choices: [choicesA, choicesB, choicesC, choicesD]}
                
                )
                .then(() => {
                    axios.get("https://dyflexisquestionaire.onrender.com/questions/getquestions").then((response) => {
                    console.log(response.data);
                    window.location.reload(false);
                    setListOfQuestions(response.data);
                })
                });
            } else{
            axios.post("https://dyflexisquestionaire.onrender.com/questions/createquestion", 
            {
            question
            }
            )
            .then(() => {
                axios.get("https://dyflexisquestionaire.onrender.com/questions/getquestions").then((response) => {
                console.log(response.data);
                window.location.reload(false);

                setListOfQuestions(response.data);
                
            })
            });
        }
        };
    }

    //Make a new survey based on userinput
    const createSurvey = event => {
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
        const creatorID = document.getElementsByName("user")[0].id

        console.log(`nameinput: ${nameInput}`, `nameinput: ${creatorID}` )

        //Push survey to database if values are filled in
        if (nameInput != "" && creatorID != undefined) {
            const newSurvey = {name: nameInput, creator_id: creatorID, questions: questionList, anonymous: isAnonymous};
            const url = "https://dyflexisquestionaire.onrender.com/survey/createSurvey"
            axios.post(url, newSurvey)
        } else {
            alert("Vul alle velden in!")
        }

        //Back to survey overview
        toHome()
        
    }

    return(
        <div className="AddSurvey">
            <div className="questionForm">
                <input id="nameInput" className="forminput" placeholder="Vul hier de naam voor de enquete in..."></input>
                <p className="madeBy" name="user" id={UserId}>Maak enquete als: {UserId}</p>
                <label>
                    <input id="anonymous" type="checkbox"/>
                    Anoniem?
                </label>
                <div className="formButtonHolder">
                    <button className="cancelButton2" onClick={backHome}>Annuleer</button>
                    <button className="addButton" onClick={createSurvey}>Maak</button>
                </div>
            </div>
            {/* <div className="questionForm">
                <input className="forminput" type="text" placeholder="Question..." onChange={(event) => {setQuestion(event.target.value)}} /> 
                <label>
                    <input className="checkbox" type="checkbox" checked={checked} onChange={() => {checkboxChange()}} />
                    Multiple Choice?
                </label>    
                { checked &&(
                <div className="multiChoice">
                    <input type="text" placeholder="A" onChange={(event) => {setchoicesA(event.target.value)}}></input>
                    <input type="text" placeholder="B" onChange={(event) => {setchoicesB(event.target.value)}}></input>
                    <input type="text" placeholder="C" onChange={(event) => {setchoicesC(event.target.value)}}></input>
                    <input type="text" placeholder="D" onChange={(event) => {setchoicesD(event.target.value)}}></input>
                </div>)
                }
                <div className="formButtonHolder">
                    <button className="backButton" onClick={toHome}>Terug</button>
                    <button className="addButton" onClick={createQuestion}> Add Question </button>
                </div>
            </div> */}
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
                                    <Draggable key={question._id} draggableId={"draggable-" + question._id} index={i} >
                                        {(provided, _) => (
                                            <div id={"question-" + question._id} className="checkItem" key={question} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <p key={question.question}>{question.question}</p>
                                                <input className="addCheckbox" type="checkbox" id={question._id}></input>
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

export default AddSurvey