import express from "express"

const server = express()

server.get("/", (req, res) => {
    res.send("Hello from HTTP server.")
})

server.listen(4000, () => {
    console.log("Server listening on port 4000")
})
