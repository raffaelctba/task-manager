const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')



const port = process.env.PORT || 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
console.log('listening on port '+port)
})