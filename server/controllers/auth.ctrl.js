const Student = require('./../models/Student')
const fs = require('fs')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config=require("../config")
module.exports = {
    authenticate:(req, res, next) => {
        let { userName,password } = req.body;
        console.warn(userName)
        Student.findOne({userName},(err, user) => {
            if (err){
                console.warn("Authenticating Error")
                res.send(err)
            }
            else if (!user){
                console.warn("UserName invalid")
                res.json({success:false,messege:"Authentication failed. User not found."})

            }
            else{
                console.log(user.password)
                if(user.password!=password){
                    console.warn("password invalid")
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }

                else{
                    const payload = {
                        type: user.type,
                        index_no:user.index_no,
                        name:user.name,
                        year:user.year,
                        type:user.type
                    }

                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: "1days" // expires in 24 hours
                    })

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    })
                }
            }
            
        })

        
    }

}