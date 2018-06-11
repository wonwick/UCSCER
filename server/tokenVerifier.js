const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file
const admin = require('./routes/admin')
const student = require('./routes/student')
const staff = require('./routes/staff')


module.exports = (router) => {
    router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          var type=req.decoded.type
          if(type==-1){
            console.warn("adminLevelAccess")
            admin(router)
          }
          if(type==0){
            console.warn("StaffLevelAccess")
            staff(router)
          }
          if(type==1 || type==2 ||type==3){
            console.warn("studentLevelAccess")
            student(router)
          }
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
  
  // route to show a random message (GET http://localhost:8080/api/)
  
  
  // route to return all users (GET http://localhost:8080/api/users)
}