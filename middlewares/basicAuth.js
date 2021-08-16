'use strict';

const bcrypt=require('bcrypt');
const base64=require('base-64');
const{users}=require('../models/index');

const basicAuth= async (req, res, next)=> {
    // from the authorization header we need the username and password
    // to verify the login
    // Authorization header ----> Basic encoded(username:password)
    if (req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', encoded(username:password)]
        let encoded = basicHeaderParts.pop();
        let decoded = base64.decode(encoded); // username:password
        let [username, password] = decoded.split(":"); // rawan test@1234
        // finally we have both username and password !! 
        // find in DB
        // =3wSd#wwwqqQAdd123sWe 
        // One way encryption (hashing) cant convert it back
        // what to do then? I will hash the plain text and compare with DB
       try {
           const user = await users.findOne({ where: {username: username} });
           const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                // delete user.dataValues['password']; & return user
                res.status(200).json({username: username, id: user.id})
            } else {
                // res.status(500).send('Invalid UserName and Password')
                // throw new Error('Invalid UserName and Password');
                res.status(403).send("invalid username or password")
                next('Invalid UserName or Password , try again mother fucker or get the fuck out , thank you ')
            }
       } catch(e) {
        next(`error in signin ${e}` )
        // res.status(500).send('error in signin')
       }
    }
};

module.exports=basicAuth;