import axios from "axios";
import React, { useState } from "react";
import { Router } from "react-router";
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();

    if (localStorage.getItem("token")) {
        history.push('/');
        //localStorage.removeItem("token");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    
    async function getUser(id, token) {
        try {
            const value = await axios.post("https://sportheaven.herokuapp.com/getProfileSelf", {sessionId: id, refreshToken: token});
            console.log("value", value);
            localStorage.setItem("userName", value.data.message[0].pseudo);
        } catch (error) {
            console.log(error);
        }
    }

    async function login() {
        try {
            const value = await axios.post("https://sportheaven.herokuapp.com/login", {"email": email, "password": password}, {headers: {"Accept": "application/json"}});
            console.log(value);
            setError(null);
            localStorage.setItem("token", value.data.message.token);
            await getUser(value.data.message.id, value.data.message.token);
            history.push('/');
        } catch (error) {
            setEmail('');
            setPassword('');
            setError(error);
            console.log(error);
        }
    }

    return (
        <form >
            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            <div>
                {
                    error ? <span>Login Failed</span> : <span></span>
                }
            </div>
            <button type="button" className="btn btn-dark btn-lg btn-block" onClick={async () => {await login()}}>Sign in</button>
        </form>
    );
}