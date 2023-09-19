import express, { response } from "express"
import { ads } from "./ads"

const server = express()

server.get("/", (req, res) => {
    res.send("Hello from Express server.")
})

// GET /ads
server.get('/ads', (req,res) => {
    res.json({ads})
})
// POST /ads
server.post('/ads', (req,res) => {
    res.send("Post is working")
})

const PORT = 4000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})