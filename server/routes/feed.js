// server/routes/article.js
const feedController = require('./../controllers/feed.ctrl')


module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/feed')
        .post(feedController.getFeed)

    router
        .route('/addFeed')
        .post(feedController.addFeed)
    
    router
        .route('/testFeed')
        .post(feedController.testFeed)
}