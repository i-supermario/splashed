const express = require("express")
const router = express.Router()
module.exports = router

const Model = require("../models/model")


// Post
router.post('/post', async (req,res)=>{
    console.log("POSTING")
    console.log(req.body)
    const data = new Model({
        label: req.body.label,
        url: req.body.url
    })

    try{
        const dataToSave = await data.save()
        res.status(200).send(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error})        

    }
})


router.get("/",(req,res)=>{
    res.send("Working API")
})

router.delete('/delete/:id',async (req,res)=>{
    try{
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.label} is deleted`)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get("/getAll",async (req,res)=>{
    try{
        const data = await Model.find()
        res.json(data)
    }
    catch(error){
        console.log(error.message)
    }
})

router.patch("/update/:id",async (req,res)=>{
    try{
        const id = req.params.id
        const updatedData = req.body
        const options = {new: true}
        const result = await Model.findByIdAndUpdate(id,updatedData,options)
        res.send(result)
    }
    catch(error){
        console.log(error.message)
    }
})

router.get("/get/:id",async (req,res)=>{
    try{
        const data = await Model.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        console.log(error.message)
    }
})

module.exports = router