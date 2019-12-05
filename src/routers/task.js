const express = require('express')
const router = express.Router()
const Task = require('../models/task')


router.get('/tasks/:id',async (req,res)=>{
    try{
  const task = await Task.findById(req.params.id)
  if(!task){
          return   res.status(404).send()
    }
    res.status(200).send(task)
    }catch(e) {
        res.send(error)
    }
  
})

router.get('/tasks',async (req,res)=>{
 try{
     await   Task.find({})
        res.send(tasks)
     }catch(e){
 
        res.send(error)
    }
  })

  router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
try{
    await task.save()
    res.send(task)
} catch(e){
    res.status(400).send()

}
})
  router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
       return res.status(404).send({error: "update not allowed"})
    }
    try{
       const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})
    res.status(200).send(task)
    } catch(e) {
       res.status(400).send(e)
    }
    })

router.delete('/tasks/:id', async (req,res) => {
       try{ 
           const task = await Task.findOneAndDelete(req.params.id)
           if(!task){
            return   res.status(404).send()
           }
            res.send(200).send(task)  

    } catch (e) {
           res.status(500).send()
       }
    })

    module.exports = router