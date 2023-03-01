const express=require('express')
const body_parser=require('body-parser')
const mongoose=require('mongoose')
const router=require('./routes/route.js')
const app=express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://rahat6713:1819rahat@cluster0.iee0y.mongodb.net/sumit?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
  .then(()=>console.log('mongodb is connected'))
  .catch((err)=>console.log(err))

app.use('/',router)

app.listen((process.env.port||3000),function(){
    console.log('express is running on port',(process.env.port||3000))
})