// server/routes/article.js
const studentController = require('./../controllers/student.ctrl')
const subjectController = require('./../controllers/subjects.ctrl')

module.exports = (router) => {
    router
        .route('/AddUser')
        .post(studentController.addStudent)

    
    router
        .route('/students')
        .get(studentController.getStudents)


    router
        .route('/Student')
        .post(studentController.getStudent)


    router
        .route('/subjects')
        .get(subjectController.getSubjects)


    router
        .route('/subjects')
        .post(subjectController.addSubject)
        

    router
        .route('/subjects/register')
        .post(subjectController.register)

}