require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const mongoString = process.env.DATABASE_URL;
const bodyParser = require("body-parser")

const routes = require("./api/routes")



mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json());
app.get("/",(req,res)=>{
    res.send({Message:"Working Vercel App"})
})
app.use("/api",routes)
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started at ${3000}`)
})
    

module.exports = app