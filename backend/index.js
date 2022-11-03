require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const mongoString = process.env.DATABASE_URL;
const bodyParser = require("body-parser")

const routes = require("./routes/routes")



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
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
    
app.get('/about', (req, res) => {
    res.send('This is my about route..... ')
})

module.exports = app

// const express = require('express')

// const app = express()
// const PORT = 4000

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `)
// })

// app.get('/', (req, res) => {
//   res.send('Hey this is my API running 🥳')
// })

// app.get('/about', (req, res) => {
//   res.send('This is my about route..... ')
// })

// // Export the Express API
// module.exports = app