require('../db/mongoose')

const Task = require('../models/task')


Task.findByIdAndDelete('').then(()=>{
    return Task.countDocuments({completed:false})
}).then((count)=>{
console.log(count)
}).catch((e)=>{
    console.log(e)
})