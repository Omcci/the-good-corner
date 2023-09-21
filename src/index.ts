import express, { response } from "express"
import { ads } from "./ads"

const server = express()
server.use(express.json()) 

server.get("/", (req, res) => {
    res.send("Hello from Express server.")
})

// GET /ads
server.get('/ads', (req,res) => {
    res.json({ads})
})
// POST /ads
server.post('/ads', (req,res) => {
    const ad = req.body
    ads.push(ad)
    
    res.status(201).json({ ad })
})

//GET /ads:id
server.get('/ads/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const ad = ads.find((ad) => ad.id === id)
    if (!ad) {
        res.sendStatus(404)
    }

    res.json({ ad })
})

// DELETE /ads/:id
//PUT /ads/:id

// const PORT = 4000
// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// })