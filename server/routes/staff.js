// server/routes/article.js
const subjectController = require('./../controllers/subjects.ctrl')
const studentController = require('./../controllers/student.ctrl')
const simpleSubjectController = require('./../controllers/simpleSubjects.ctrl')
const feedController = require('./../controllers/feed.ctrl')



module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/subjects')
        .get(subjectController.getSubjects)

    /**
     * add an article
     */
    router
        .route('/addSubject')
        .post(subjectController.addSubject)

    /**
     * clap on an article
     */
    router
        .route('/getAllSubjects')
        .post(simpleSubjectController.getAllSubjects)

    router
        .route('/setFeed')
        .post(feedController.updateFeed)
}