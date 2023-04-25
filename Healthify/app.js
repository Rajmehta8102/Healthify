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
/*
app.get('/form',(req,res)=>{
    res.render('form');
})
app.get('/signup',(req,res)=>{
  res.render('signup');
})
app.post('/',(req,res) =>{
    const User = new user(req.body)
    User.save()
    .then((result) => {
        res.render('form')
      })
      .catch((err)=>{
        console.log(err);
      })
})
app.post('/signup',(req,res) =>{
  const User = new user(req.body)
  User.save()
  .then((result) => {
      res.render('form')
    })
    .catch((err)=>{
      console.log(err);
    })
})
app.post('/form',(req,res) =>{
    const Form = new form(req.body)
    Form.save()
    .then((result) => {
      const python = spawn('python', ['script2.py']);
      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
       if(dataToSend == 1){ 
          res.render('underweight');
       }
       else if(dataToSend == 2){
        res.render('normal');
       }
       else if(dataToSend == 3){
        res.render('overweight');
       }
       else{
        res.render('Obese');
       }
       });
       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        });
    })
    .catch((err)=>{
      console.log(err);
    })

})
*/
