const mongoose = require('mongoose')

 //mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
mongoose.connect('mongodb+srv://super:super@testapp-tqnmv.mongodb.net/task-manager?retryWrites=true&w=majority',{
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true 
})



