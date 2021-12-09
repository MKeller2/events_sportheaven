import axios from "axios";
import React, { useState } from "react";
import { Router } from "react-router";
import { useHistory } from "react-router-dom";

export default function SignUp() {
    const history = useHistory();

    /*if (localStorage.getItem("token")) {
        history.push('/login');
        localStorage.removeItem("token");
    }*/

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [error, setError] = useState();
    let password_failed ="";

    async function register() {
        try {
            const value = await axios.post("https://sportheaven.herokuapp.com/register", {"email": email, "password": password, "pseudo": pseudo}, {headers: {"Accept": "application/json"}});
            console.log(value);
            setError(null);
            history.push('/login');
            localStorage.setItem("token", value.data.message.token);
        } catch (error) {
            setEmail('');
            setPassword('');
            setPseudo('');
            setError(error);
        }
    }
    return (
        <form>
            <h3>Register</h3>

            <div className="form-group">
                <label>Pseudo</label>
                <input type="text" className="form-control" placeholder="Pseudo" value={pseudo} onChange={(event) => {
                    setPseudo(event.target.value);
                }}/>
            </div>

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

            <div>
                {
                    error ? <span>Inscription échouée </span> : <span>Inscription réussie attendez la redirection</span>
                }
            </div>
            <button type="button" className="btn btn-dark btn-lg btn-block" onClick={async () => {await register()}}>Register</button>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">log in?</a>
            </p>
        </form>
    );
}
