import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // Register
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  // Login
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  // Show results
  const [loginStatus, setLoginStatus] = useState("");


  const register = () => {
    axios.post("http://localhost:420/register/", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      // If theres any error, show me in the console
      console.log(response.data);
    });
  };

  const login = () => {
    axios.post("http://localhost:420/login/", {
      // pass the keys that we create in the server for the Login URI
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {

      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          className="inputs"
          type="text"
          onChange={(element) => {
            setUsernameReg(element.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="inputs"
          type="text"
          onChange={(element) => {
            setPasswordReg(element.target.value);
          }}
        />
        <button className="btn btn-primary mt-2" onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input className="inputs" type="text" placeholder="Username..." onChange={(element) => {
            setUsernameLog(element.target.value);
          }}/>
        <input className="inputs" type="password" placeholder="Password..." onChange={(element) => {
            setPasswordLog(element.target.value);
          }}/>
        <button className="btn btn-primary mt-2" onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
