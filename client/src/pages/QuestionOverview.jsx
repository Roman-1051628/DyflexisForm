import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestionOverview() {
    const navigate = useNavigate();
    const [listOfQuestions, setListOfQuestions] = useState([]);
    const [question, setQuestion] = useState("");  
    //const [editQuestion, seteditQuestion] = useState("")
    const [checked, setChecked] = useState(false)
  //  const [checked2, setChecked2] = useState(false)
    const [choicesA, setchoicesA] = useState("")
    const [choicesB, setchoicesB] = useState("")
    const [choicesC, setchoicesC] = useState("")
    const [choicesD, setchoicesD] = useState("")
    // const [choicesA2, setchoicesA2] = useState("")
    // const [choicesB2, setchoicesB2] = useState("")
    // const [choicesC2, setchoicesC2] = useState("")
    // const [choicesD2, setchoicesD2] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/questions/getquestions").then((response) => {
                
            setListOfQuestions(response.data);
        })
        }, []);
      
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
                axios.post("http://localhost:3000/questions/createquestion", 
                
                {question: question, multipleChoice: checked, choices: [choicesA, choicesB, choicesC, choicesD]}
                
                )
                .then(() => {
                    axios.get("http://localhost:3000/questions/getquestions").then((response) => {
                    console.log(response.data);
                    setListOfQuestions(response.data);
                })
                });
            } else{
            axios.post("http://localhost:3000/questions/createquestion", 
            {
            question
            }
            )
            .then(() => {
                axios.get("http://localhost:3000/questions/getquestions").then((response) => {
                console.log(response.data);
                setListOfQuestions(response.data);
            })
            });
        }
        };
    }

    const deleteQuestion = (id) => {
        axios.delete(`http://localhost:3000/questions/deletequestion/${id}`)
        .then(() => {
            axios.get("http://localhost:3000/questions/getquestions").then((response) => {
            console.log(response.data);
            setListOfQuestions(response.data);
        })
        })
    }
    // const updateQuestion = (id) => {      
    //     axios.put(`http://localhost:3000/questions/updatequestion/${id}`, {question: editQuestion, choices: [choicesA2, choicesB2, choicesC2, choicesD2]})
    //     .then(() => {
    //         axios.get("http://localhost:3000/questions/getquestions").then((response) => {
    //         setListOfQuestions(response.data);
    //     })
    //     })
    // }
    const checkboxChange = () => {
        setChecked(!checked)
    }

    const updateQuestion = event => {
        const updateID = event.currentTarget.id;
        navigate(`/questions/${updateID}`)
    }
    const toHome = event => {
        navigate("/Admin")
    }


    return (
        <div className="questionDiv">
            <div className="questionForm">
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
            </div>
            <div className="questionDisplay">
            {listOfQuestions.map((questionItem) => {
                return (
                <div className="questions" key={questionItem._id}>
                    <div className="multiquestion">
                        <p>{questionItem.question}</p>
                        {/* <input id="questionInput" type="text"  defaultValue={questionItem.question} onChange={(event) => {seteditQuestion(event.target.value)}}/> */}
                        { questionItem.multipleChoice &&(
                        <div className="multiChoice">
                            <p>{questionItem.choices[0]}</p>
                            <p>{questionItem.choices[1]}</p>
                            <p>{questionItem.choices[2]}</p>
                            <p>{questionItem.choices[3]}</p>
                            {/* <input type="text" defaultValue={questionItem.choices ? questionItem.choices[0] : "No choices"} onChange={(event) => {setchoicesA2(event.target.value)}}></input>
                            <input type="text" defaultValue={questionItem.choices ? questionItem.choices[1] : "No choices"} onChange={(event) => {setchoicesB2(event.target.value)}}></input>
                            <input type="text" defaultValue={questionItem.choices ? questionItem.choices[2] : "No choices"} onChange={(event) => {setchoicesC2(event.target.value)}}></input>
                            <input type="text" defaultValue={questionItem.choices ? questionItem.choices[3] : "No choices"} onChange={(event) => {setchoicesD2(event.target.value)}}></input> */}
                        </div>
                        )}
                    </div>
                    <button className="editButton" id={questionItem._id} onClick={updateQuestion}>Wijzig</button>
                    <button className="deleteButton" onClick={()=>deleteQuestion(questionItem._id)}>Verwijder</button>              
                </div>
                );
            })}
            </div>
        </div>
    )
}

export default QuestionOverview