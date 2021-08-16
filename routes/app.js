'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const {users}=require('../models/index');
const basicAuth=require('../middlewares/basicAuth');
const router=express.Router();





// Create a Sequelize model


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup',signUp);

async function signUp(req , res){
  try{
   

        console.log("SERVER users **********",users)
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create({
          username:req.body.username,
          password:req.body.password
        });
        res.status(200).json(record);
    


  }catch(e){
    console.log('SERVER error creating user',e)
    res.status(403).send("Error Creating User");
    
  }
}


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin',basicAuth,signIn);

async function signIn(req , res){
  res.status(200).json(req.user);
}

// make sure our tables are created, start up the HTTP server.
module.exports=router;
