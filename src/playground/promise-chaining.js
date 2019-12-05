require ('../db/mongoose');
const User = require('../models/user')

User.findByIdAndUpdate('5de6d9203faaa048e07dbd90',{ age :1 }).then((user)=>{
            console.log(user)
            return User.countDocuments({age: 28})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})