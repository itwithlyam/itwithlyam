import express from 'express';
import cors from 'cors';
const app = express();
import { uid } from "uid/secure";
import { JsonDB, Config } from 'node-json-db';
import crypto from 'node:crypto'

import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()

app.use(cors());
app.use(bodyParser.json())

const myLogger = function (req, res, next) {
  console.log('LOGGING: '+req.method+" "+req.originalUrl)
  next()
}

app.use(myLogger)

// Login
app.post('/api/users/login', async (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("login")
    let user = await cl.findOne({user: req.body.username})
    if (!user) return res.status(400).send({ message: "user" })
    let hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`); 

    if (hash !== user.pass) {
      return res.status(400).send({
        message: "password"
      });
    }

    return res.status(200).send({
      token: user.token
    })
  })
});

// Users
app.post('/api/users', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("login")
    let token = uid(20)

    let user = await cl.findOne({user: req.body.username})
    if (user) return res.status(400).send({ message: "alreadyuser" })

    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`); 

    cl.insertOne({user: req.body.username, pass: hash, token: token, salt: salt});

    return res.status(200).send({
      token: token
    })
  })
});
app.patch('/api/users', (req, res) => {

});

// Locations
app.get('/api/locations', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let byId = await cl.find({_id: ObjectId(req.query.id)}).toArray()
    let byUser = await cl.find({user: req.query.user}).toArray()
    let byAll = await cl.find({}).toArray()
    if (req.query.id) return res.send(byId)
    if (req.query.user) return res.send(byUser)
    else return res.send(byAll)
  })
})
app.get('/api/:location', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let data = {}
    data = await cl.find({_id: ObjectId(req.params.location)}).toArray()
    return res.send(data)
  })
})
app.post('/api/locations', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    cl.insertOne({user: req.body.user, name: req.body.name})
  
    return res.send()
  })
})
app.delete('/api/:location', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("locations")
    let del = await cl.deleteOne({_id: ObjectId(req.params.location)})
    if (del.deletedCount != 1) res.status(400)
    else res.status(204)

    return res.send()
  })
})

// Memberships
app.get('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let data = await cl.find({location: ObjectId(req.params.location)}).toArray()
    return res.send(data)
  })
})
app.post('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let exist = await cl.findOne({user: req.body.user, location: ObjectId(req.params.location)})
    if (exist) return res.send({error: "already"})
    console.log(req.body.user)
    cl.insertOne({user: req.body.user, location: ObjectId(req.params.location)})
  
    return res.send({})
  })
})
app.delete('/api/:location/memberships', (req, res) => {
  MongoClient.connect(process.env.URI, async (err, db) => {
    if (err) throw err
    db = db.db("gr8t")
    let cl = db.collection("memberships")
    let del = await cl.deleteOne({user: req.body.user, location: ObjectId(req.params.location)})
    if (del.deletedCount != 1) res.status(400)
    else res.status(204)

    return res.send()
  })
})


app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));