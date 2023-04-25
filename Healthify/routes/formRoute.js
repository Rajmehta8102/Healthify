const {Router} = require("express")
const form = require("../models/form")
const {spawn} = require('child_process')

const router = Router()

router.get('/filldata',async (req,res)=>{
    return res.render("form")
})

router.post('/filldata',async (req,res)=>{
    const Form = await new form(req.body)
    Form.save()
    .then((result) => {
        const python = spawn('python', ['detectionModel.py']);
        python.stdout.on('data', function (data) {
          console.log('Pipe data from python script ...');
          dataToSend = data.toString();
          console.log(dataToSend);
         if(dataToSend == 1){ 
            console.log("underweight")
         }
         else if(dataToSend == 2){
            console.log("normal")
         }
         else if(dataToSend == 3){
            console.log("overweight")
         }
         else{
            console.log("obese")
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
module.exports = router