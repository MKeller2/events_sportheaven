import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Events from "./components/Events";

function App() {
  const history = useHistory();
  const [isConnected, setIsConnected] = useState(localStorage.getItem("token"));
  const [userName, setUsername] = useState(localStorage.getItem("username") || "username");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setIsConnected(localStorage.getItem("token"));
  }, []);
    
  function disconnect() {
    console.log("test");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsConnected(null);
  }

  function connected() {
    return isConnected ? <div style={{display: 'flex', flexDirection: "row"}}>
      <span className="nav-link">{userName}</span>
      <button className="nav-link" onClick={() => {disconnect()}}>Se déconnecter</button>
    </div>: <div style={{display: 'flex', flexDirection: "row"}}><li className="nav-item">
    <Link className="nav-link" to="/sign-in" >Connexion</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/sign-up">Inscription</Link>
    </li></div>;
  }
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
        <div className="container">
          <Link className="navbar-brand" to="/">Sport'Heaven</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/events">Evenements</Link>
              </li>
              {connected()}
            </ul>
          </div>
        </div>
      </nav>

      <div >
        <div >
          <Switch>
            <Route exact path='/' component={Events} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/events" component={Events} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
