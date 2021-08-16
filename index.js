'use strict';

const {db}=require('./models/index');
const server=require('./server');
db.sync().then(()=>{
    server.start(8080);
}).catch(console.error);