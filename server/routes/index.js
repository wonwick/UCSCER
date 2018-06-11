// server/routes/index.js
const subject = require('./subject')
const student = require('./student')
const authentication=require('./authentication')


module.exports = (router) => {
    subject(router)
    student(router)

}