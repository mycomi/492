const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()


//import models
const Item = require('../models/itemModel')
const User = require('../models/userModel')
const auth = require('../MW/auth')

// MongoDB Atlas connection setting

const connStr = process.env.DATABASE_URL
                      .replace('<password>',process.env.DATABASE_PWD)
                      .replace('<database>',process.env.DATABASE_NAME)
// const connStr = "mongodb+srv://mycomi:gamecomy20th@domdam-cuod2.azure.mongodb.net/test"        

mongoose.connect(connStr, { useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false,
                            useCreateIndex: true })


let db = mongoose.connection
db.on('error', () => console.log('Database connection error'))
db.once('open', () => console.log('Database connected'))


//user

router.post('/users', async(req,res) => {
  try {
    const user = new User(req.body)

    await user.save()
    const token = await user.generateAuthToken() 

    // res.status(201).json({ msg: 'add user successful',user,token})

    res.redirect("http://localhost:5000")

    

  } catch (error) {
    res.status(400).json({ error: error.message})
  }

  
})

router.post('/users/login', async (req,res) => {
    

  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    const {email, password} = req.body
    const user = await User.findByCredentials(email,password)
    

    if (!user) {
      res.status(401).json({ error: 'Login failed'})
    }
    
    const token = await user.generateAuthToken()
    const name = await user.name
    
    res.status(200).json({token,name})
    
    
    // localStorage.setItem('token',token)
    
    // res.redirect("/api/users/me").send(user)
    // .send(token)    
    // .then(res => {
    //   return token
    // })


  } catch (error) {
    res.status(400).json({ error: error.message})
  }
})

router.get('/users/me', auth, (req,res) => {
  const user = req.user
  res.status(201).json(user)
 
})

router.post('/users/logout', auth, async (req,res) => {
  const user = req.user
  const current_token = req.token

  try {
    user.tokens = user.tokens.filter( items =>{
      return items.token !== current_token
    })
    await user.save()
    res.status(201).json({ msg: 'logout successful'})
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

router.post('/users/logoutall', auth, async (req,res) => {
  const user = req.user
  try {
    user.tokens.splice(0,user.tokens.length)
    await user.save()
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

//

router.get('/items',auth, async (req,res,next) => {
  const user = req.user
  try {
    const items = await Item.find({ _uid: user._id})
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json( {error: error.message})
  }
})

router.get('/itemsAll', async (req,res,next) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
    
  } catch (error) {
    res.status(500).json( {error: error.message})
  }
})

router.get('/items/:id',auth, async (req,res,next) => {
  const user = req.user
  try {
    const t = await Item.find({_id:req.params.id, _uid: user._id})
    if (!t) {
      res.status(404).json({ error:'transaction not found'})
    }
    res.status(200).json(t)
  } catch (error) {
    res.status(500).json( { error: 'GET::'+error.message})  
  }
})

router.post('/items',auth, async (req,res) => {
  const user = req.user
  const t = new Item(req.body) // { name: 'something', amount: 1000 }
  t._uid = user._id

  try {
    await t.save()
    res.status(200).json(t)
  } catch (error) {
    res.status(500).json( { error: error.message})
  }
})

router.put('/items/:id', auth, async (req,res) => { //update
  const update_t = {
    name: req.body.name,
    amount: Number(req.body.amount),
    updated: new Date()
  }
  try {
    const t = await Item.findByIdAndUpdate({_id:req.params.id, update_t}, { new: true })
    if (!t) {
      res.status(404).json( { error: 'UPDATE::transaction not found'} )
    } else {
      res.status(200).json(t)
    }
  } catch (error) {
    res.status(500).json ( { error: 'UPDATE::'+error.message})
  }
})

router.delete('/items/:id',auth, async (req,res) => {
  try {
    const t = await Item.findByIdAndDelete(req.params.id)
    if (!t) {
      res.status(404).json({ error:'transaction not found'})
    }
    res.status(200).json( { message: 'Item deleted!'})
  } catch (error) {
    res.status(404).json( { error: 'DELETE::transaction not found'}) 
  }
})

module.exports = router
