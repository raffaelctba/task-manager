const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


//get /tasks?completed-true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res)=>{
  const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
  
    try{
  
    await req.user.populate({
      path: 'tasks',
      match,
      option: {
        limit: parseInt(req.query.limit),
        skip:  parseInt(req.query.skip),
        sort: {
          createdAt: 1
        }
      }
    }).execPopulate()
         res.send(req.user.tasks)
      }catch(e){
  
         res.status(500).send(e)
     }
   })

router.get('/tasks/:id',auth, async (req,res)=>{
  const _id= req.params.id
    try{
  //const task = await Task.findById(req.params.id)
  const task = await Task.findOne({ _id, owner: req.user._id })

  if(!task){
          return   res.status(404).send()
    }
    res.status(200).send(task)
    }catch(e) {
      console.error(error)
        res.status(500).send(error)
    }
  
})



  router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id})

try{
  
    await task.save()
    res.status(201).send(task)
} catch(e){
    res.status(400).send(e)

}
})
  router.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
       return res.status(404).send({error: "update not allowed"})
    }
    try{
         const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

         if(!task){
          return res.status(404).send()
        }
       
        updates.forEach((update) => task[update] = req.body[update])

        await task.save() 
 
    res.status(200).send(task)
    } catch(e) {
       res.status(400).send(e)
    }
    })


router.delete('/tasks/:id', auth,async (req,res) => {
       try{ 
           const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.body._id })
           if(!task){
            return   res.status(404).send()
           }
            res.send(200).send(task)  

    } catch (e) {
      console.log(e)
           res.status(500).send()
       }
    })

    module.exports = router