// server/routes/article.js
const subjectController = require('./../controllers/subjects.ctrl')


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
        .route('/subjects')
        .post(subjectController.addSubject)

    /**
     * clap on an article
     */
    router
        .route('/subjects/register')
        .post(subjectController.register)
}