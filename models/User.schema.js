'use strict';

const user_schema=(sql , dataTypes)=>{
   let newUser= sql.define('auth_user', {
        username: {
          type: dataTypes.STRING,
          allowNull: false,
          unique:true
        },
        password: {
          type: dataTypes.STRING,
          allowNull: false,
        }
       
      });

      return newUser;
}

module.exports=user_schema;