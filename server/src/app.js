const express = require('express')
const userRoute = require("./routes/user.router")
const cors = require('cors')
const app = express()

app.use(cors({
    origine: "http://localhost:5173/"
}))


app.use(express.json())


app.get("/", (req,res) => {
    res.status(200).json({
        message:"Welcome to Authentication API"
    })
})

app.use("/api", userRoute)

module.exports = app