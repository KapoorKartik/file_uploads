const express = require('express');
const fs = require("fs")
const router = express.Router()

const User = require('../models/user.model')
const Gallary = require("../models/gallery.model")
const upload = require("../middlewares/upload")
/* upload.single("profile_pic"),  */

router.post('/', upload.single("profile_pic"), async (req, res) => {

  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path
    });

    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
})

router.patch("/:id", upload.single("profile_pic"), async (req, res) => {

      try {
      const user = await User.findById(req.params.id)
        fs.unlinkSync(user.profile_pic)
      console.log(`${user.profile_pic} is deleted`)
      
        const userUpdate = await User.findByIdAndUpdate(req.params.id, {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          profile_pic: req.file.path
        }).lean().exec()
        console.log("user",user)
        console.log("userUpdate",userUpdate)
        res.status(200).send(userUpdate);
      } catch (e) {
        res.status(500).json({
          message: e.message
        })
      }
    })
    
  
    
    router.delete('/:id', async (req, res) =>{
    try{
     const user = await User.findById(req.params.id)
   //   console.log(`${user.profile_pic} is deleted`)
      
    const gallery = await Gallary.find({user_id : req.params.id})
   const p = gallery[0].pictures.forEach(pic_path =>
 
     fs.unlinkSync(pic_path)
      )
        fs.unlinkSync(user.profile_pic)
    //  console.log("gallary",gallery[0]._id)
     const gallaryDelete = await Gallary.findByIdAndDelete(gallery[0]._id)
      
      const userDelete = await User.findByIdAndDelete(req.params.id)
     res.json({userDelete,gallaryDelete})
  //   res.send("working")
       }catch (e) {
        res.status(500).json({
          message: e.message
        })
      }
    
    })
    
    
      router.post("/gallary",upload.array("pics" , 5) ,async (req,res) =>{
        try {
       const files = req.files.map(file => file.path)
       
       
            const gallary = await Gallary.create({
            pictures : files,
            user_id : req.body.user_id
            })
            res.send(gallary)
        }catch (e) {
        res.status(500).json({
          message: e.message
        })
    }
    })
    
    
    
    router.get("/gallary", async (req,res) =>{
    try { 
        const gallary = await Gallary.find().populate("user_id").lean().exec()
        
        res.send(gallary)
    }catch (e) {
        res.status(500).json({
          message: e.message
        })
    }
   
    })

    router.get('/', async (req, res) => {
      try {
        const user = await User.find().lean().exec()
        res.status(201).send(user);
      } catch (e) {
        res.status(500).json({
          message: e.message
        })
      }
    })

    module.exports = router
