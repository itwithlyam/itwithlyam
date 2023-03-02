import React, {useState} from 'react'
import { useParams } from "react-router-dom";

import './dashboard/dashboard.css'

export default function UserLocation() {
    const params = useParams()
    const [loc, setLoc] = useState({})
    const [mem, setMem] = useState({})
    const [buttonstate, changeButton] = useState(0)
    

    console.log("hmmm") 
    fetch("http://77.68.127.58:8080/api/"+params.id).then(data => data.json()).then(payload => {
        if (!loc[0]) return setLoc(payload)
        if (loc[0]._id != payload[0]._id) setLoc(payload)
    })
    fetch("http://77.68.127.58:8080/api/"+params.id+"/memberships").then(data => data.json()).then(payload => {
        if (!mem[0]) return setMem(payload)
        if (mem[mem.length-1]._id != payload[mem.length-1]._id) setMem(payload)
    })

    const member = () => {
        fetch("http://77.68.127.58:8080/api/"+params.id+"/memberships", {
            method: "POST",
            body: JSON.stringify({user: localStorage.getItem("uname")}),
            headers: {"Content-Type": "application/json"}
        }).then(data => data.json()).then(payload => {
            if (payload.error) {
                alert("Already a member!")
                changeButton(1)
            }
            setLoc(payload)
        })
    }

    console.log(loc)
    if (!loc[0]) return <p>Loading...</p>

    return (
        <div>
            <h1 className="loc-head">{loc[0].name}</h1>
            <h3 className="loc-2">Members: {mem.length}</h3>
            <div className="loc-but-div"><button className="loc-but" onClick={member}>Become a Member</button></div>
            <br />
        </div>
    )
}