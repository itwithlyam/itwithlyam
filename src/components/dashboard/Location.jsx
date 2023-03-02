import React, {useState} from 'react'
import { useParams } from "react-router-dom";

export default function Location() {
    const params = useParams()

    const [location, setLocation] = useState({})
    const [members, setMembers] = useState({})
    const [counter, count] = useState(0)

    if (counter == 0) {
        console.log("hmmm") 
        fetch("http://77.68.127.58:8080/api/"+params.id).then(data => data.json()).then(payload => {
            setLocation(payload)
            count(1)
        })
    } else if (counter == 1) {
        console.log("hmmm") 
        fetch("http://77.68.127.58:8080/api/"+params.id+"/memberships").then(data => data.json()).then(payload => {
            setMembers(payload)
            count(2)
        })
    }
    if (!location[0] || !members) return <p>Loading location...</p>
    return (
        <div>
            <h1 className="loc-head">{location[0].name}</h1>
            <h3 className="loc-2">Owner: {location[0].user}</h3>
            <h3 className="loc-2">ID: {location[0]._id}</h3>
            <h3 className="loc-2">Memberships: {members.length}</h3>
            <div className="center-div"><button className="loc-but loc-logout" onClick={() => {
                  let ans = window.confirm("Are you sure you want to delete this location?")
                  if (!ans) return
                  fetch("http://77.68.127.58:8080/api/"+location[0]._id, { method: "DELETE" })
                  window.location.href = "/dashboard"
                }}>Delete</button></div>
        </div>
    )
}