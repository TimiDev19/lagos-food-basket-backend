const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')


// COnnect DB
mongoose.connect(process.env.MONGO_URL).then(() => console.log("everywhere good :)"))
    .catch((err) => console.log(err))

//Middleware
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("API is running")
})

// Route
app.use('/user', require('./routes/user'))

app.listen(3000, () => console.log("Server is running"))
