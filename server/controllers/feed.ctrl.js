const Feed = require('./../models/Feed')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addFeed: (req, res, next) => {
        Feed.findOne(req.body.data, (err, feed) => {
            if (err) {
                console.warn("addFeed sending Error")
                res.send(err)
            }
            else if (!feed) {
                console.warn("adding New Feed")
                new Feed(req.body.data).save((err, localFeed) => {
                    if (err) {
                        console.log("errorAtaddStudentStudentctrl1")
                        res.send(err)
                    }
                    else if (!localFeed) {
                        cosole.log("errorAtaddStudentStudentctrl2")
                        res.send(400)
                    }
                    else {
                        console.warn("succesfully added")
                        localFeed["status"] = "successful"
                        res.send(localFeed)
                    }
                })
            }
            else {
                console.warn("already Feed exists")
                res.send({ "staus": "alreadyExists" })
                //res.send(student)
            }

        })


    },

    getFeed: (req, res, next) => {
        var feedObject = req.body.data
        if (Object.is(feedObject, {})) {
            Feed.find().then((feed) => {
                res.json(feed)
            })
        }
        else {
            Feed.find(feedObject).then((feed) => {
                res.json(feed)
            })
        }
    },

    testFeed: (req, res, next) => {
        var x = Feed.schema.methods.testMethod
        console.log(x)
        x()
        res.send({ "success": true })

    },

    updateFeed: (req, res, next) => {
        const type = req.body.data.type
        const newFeed = req.body.data.newFeed

        Feed.update({type:type},
            {
                $set: newFeed
            }
        ).exec();
        res.json({status:"update success"})

    },
}