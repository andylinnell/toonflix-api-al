import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { getAllShows, addShow, updateShow, deleteShow } from "./src/shows.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/shows', getAllShows)
app.post('/shows', addShow)
app.patch('/shows/:showId', updateShow)
app.delete('/shows/:showId', deleteShow)


export const api = functions.https.onRequest(app)