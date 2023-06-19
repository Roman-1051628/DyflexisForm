import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetUsers() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password] = useState("hoi");

    useEffect(() => {
        axios.get("https://dyflexisquestionaire.onrender.com/home/getUsers").then((response) => {
            console.log(response.data);
            setListOfUsers(response.data);
        })
        }, []);
        
    const createuser = () => {
        axios.post("https://dyflexisquestionaire.onrender.com/home/newUser", {
            name,
            email,
            password
        }).then(() => {
            setListOfUsers([...listOfUsers, {name, email, password}]);
        });
    };
    
    return (
        <div className="users">
            <div className="usersDisplay">
            {listOfUsers.map((user) => {
                return (
                <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>password: {user.password}</h1>
                    <h1>role: {user.role}</h1>
                </div>
                );
            })}
            </div>
            <div className="usersForm">
            <input type="text" placeholder="Name..." onChange={(event) => {setName(event.target.value)}} />
            <input type="email" placeholder="Email..." onChange={(event) => {setEmail(event.target.value)}} />
            <button onClick={createuser}> Create User </button>
            </div>
        </div>
    )
}

export default GetUsers