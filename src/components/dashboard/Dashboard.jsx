import React, {useState} from "react";
import Login from '../Login';
import useToken from './useToken';

import './dashboard.css'


function Dashboard() {
  const { token, setToken } = useToken();  

  const [locations, setLocations] = useState([])
  const [counter, count] = useState(0)
  if(!token) {
    return <Login setToken={setToken} />
  }
  console.log(locations)

  if (counter === 0) {
    console.log("hmmm") 
    fetch("http://77.68.127.58:8080/api/locations?user="+localStorage.getItem("uname")).then(data => data.json()).then(payload => {
      setLocations(payload)
      count(1)
    })
  } 
  return (
    <>
      <h1>Locations</h1>
      <ul className="dashboard">
        {locations.map(element => (
          <>
              <div className="dash-loc" key={element._id}>
                <button onClick={() => {window.location.href = '/dashboard/'+element._id}} className="dash-loc-but">
                  <p className="bold">{element.name}</p>
                  <p>ID: {element._id}</p>
                </button>
              </div>
            <br />
          </>
        ))}
        <div className="login-buttons">
          <button className="loc-but" onClick={() => {
                  let ans = prompt("Location name")
                  if (!ans) return
                  fetch("http://77.68.127.58:8080/api/locations", {
                    method: "POST",
                    body: JSON.stringify({ name: ans, user: localStorage.getItem("uname") }),
                    headers: {"Content-Type": "application/json"}
                  })
                  window.location.reload()
                }}>New</button>
          <button className="loc-but loc-logout" onClick={() => {
                  localStorage.removeItem("uname")
                  localStorage.removeItem("token")
                  window.location.reload()
                }}>Logout</button>
        </div>
      </ul>
    </>
  );
}

export default Dashboard;