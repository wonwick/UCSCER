// server/routes/article.js
const studentController = require('./../controllers/student.ctrl')
const subjectController = require('./../controllers/subjects.ctrl')
const SimpleSubjectController=require('./../controllers/simpleSubjects.ctrl')



module.exports = (router) => {
    router
        .route('/Student')
        .post(studentController.getStudent)

    router
        .route('/subjects')
        .post(subjectController.getSubjects)

    router
        .route('/registerExam')
        .post(studentController.register)

    router
        .route('/RegisterSubject')
        .post(SimpleSubjectController.registerSubjects)

}