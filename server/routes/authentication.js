// server/routes/article.js
const authController = require('./../controllers/auth.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    router
        .route('/Authenticate')
        .post(authController.authenticate)
    

    
}