import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
 return fetch('http://77.68.127.58:8080/api/users/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

async function signupUser(credentials) {
  return fetch('http://77.68.127.58:8080/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [signbutton, setButton] = useState(true);
  const [error, setError] = useState("");


  const handleSubmit = async e => {
    e.preventDefault();
    if (signbutton) {
      const token = await loginUser({
        username,
        password
      });
      if (token.message == "user") {
        setError("User not found")
      } else if (token.message == "password") {
        setError("Password incorrect")
      }
      console.log(token)
      localStorage.setItem('uname', username)
      setToken(token);
    } else {
      const token = await signupUser({
        username,
        password
      });
      localStorage.setItem('uname', username)
      setToken(token);
    }
  }

  const button = async () => {
    setButton(!signbutton)
  }

  return(
    <div className="login-wrapper">
      <h1>{signbutton ? "Log in" : "Sign up"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <p>{error}</p>
        <div className="login-buttons">
          <button type="submit">Submit</button><br />
          <button type="button" onClick={button}>{!signbutton ? "Log in" : "Sign up"}</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};