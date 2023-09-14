require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const app = express()
const PORT = process.env.PORT
const userRoute = require('./routes/userRoutes')
const formRoute = require('./routes/formRoute')
const levelRoute = require('./routes/obesityLevelRoute')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
mongoose.connect(process.env.MONGO_URI).then((e)=> console.log("Mongo DB connected"))
.then((result)=> console.log('DB connected'))
.catch((err) => console.log('DB notconnected'))

app.get('/',(req,res)=>{
    return res.redirect("/user/signin")
})
app.listen(PORT,() => console.log(`Server started on port:${PORT}`))

app.use('/user',userRoute)
app.use('/form',formRoute)
app.use('/obesitylevel',levelRoute)

app.use((req,res) =>{
    res.send('ERROR 404 PAGE NOT FOUND');
  })
