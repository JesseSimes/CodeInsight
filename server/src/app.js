const express = require('express')
const userRoute = require("./routes/user.router")
const app = express()


app.use(express.json())


app.get("/", (req,res) => {
    res.status(200).json({
        message:"Welcome to Authentication API"
    })
})

app.use("/api", userRoute)

module.exports = app