const {Router} = require("express")

const router = Router()

router.get('/underweight',async(req,res) =>{
    res.render("underweight")
})

router.get('/normalweight',async(req,res) =>{
    res.render("normal")
})

router.get('/overweight',(req,res)=>{
    res.render("overweight")
})

router.get('/obese',(req,res)=>{
    res.render("obese")
})

module.exports = router
