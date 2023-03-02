import React, {useState} from "react";
import Login from './Login';
import useToken from './dashboard/useToken';

import './dashboard/dashboard.css'


function Locations() {
  const { token, setToken } = useToken();  

  const [locations, setLocations] = useState([])
  const [counter, count] = useState(0)
  console.log(locations)

  if(!token) {
    return <Login setToken={setToken} />
  }

  if (counter === 0) {
    console.log("hmmm") 
    fetch("http://77.68.127.58:8080/api/locations").then(data => data.json()).then(payload => {
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
                <button onClick={() => {window.location.href = '/location/'+element._id}} className="dash-loc-but">
                  <p className="bold">{element.name}</p>
                  <p>ID: {element._id}</p>
                  <p>Owner: {element.user}</p>
                </button>
              </div>
            <br />
          </>
        ))}
      </ul>
    </>
  );
}

export default Locations;