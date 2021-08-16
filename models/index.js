'use strict';

require('dotenv').config();
const user_schema=require('./User.schema');
console.log("USER SCHEMA ##########" , user_schema)
const POSTGRES_URL="postgres://localhost:5432/basicdatabase";

const {Sequelize ,  DataTypes}=require('sequelize');
let sql=new Sequelize(POSTGRES_URL , {});

module.exports={
    users:user_schema(sql ,  DataTypes),
    db:sql
}