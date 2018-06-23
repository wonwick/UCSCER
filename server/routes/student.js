// server/routes/article.js
const studentController = require('./../controllers/student.ctrl')
const subjectController = require('./../controllers/subjects.ctrl')



module.exports = (router) => {
    router
        .route('/Student')
        .post(studentController.getStudent)

    router
        .route('/subjects')
        .post(subjectController.getSubjects)



}