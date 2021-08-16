'use strict';

const express=require('express');
const logger=require('./middlewares/logger');
const users_route=require('./routes/app');
const app=express();
app.use(express.json());
app.use(users_route);
app.use(logger);

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

const start=(port)=>{
    app.listen(port , ()=>{
        console.log(`SERVER start listen at port ${port}`);
    });
};

module.exports={
    app:app,
    start:start
}