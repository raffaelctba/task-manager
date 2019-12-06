const express = require('express')
require('./db/mongoose')
//const bodyParser = require('body-parser')
const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')



const port = process.env.PORT || 3000

app.use(express.json())




const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload',upload.single('upload'),(req,res)=>{
  res.send()
})
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
console.log('listening on port '+port)
})



