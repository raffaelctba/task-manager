const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                 throw new error('it is not a valida email')
            }
        }
    },
    password:{
              type: String,
              required: true,
              minlength: 7,
              trim: true,
              validate(value){
                  if(value.toLowerCase().includes('password'))
                  throw new Error('Password cannot contain "password"')
              }
    },
    age:{
        type: Number
    }
    
})




userSchema.pre('save', async function(next){
const user = this

if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
}

next()

})
const User = mongoose.model('User',userSchema)
  
  
  module.exports = User