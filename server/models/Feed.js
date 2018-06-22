// server/models/Article.js
const mongoose = require('mongoose')

let FeedSchema = new mongoose.Schema(
    {   
        academic_year: Number,
        type:Number,
        semester: Number,
        year:Number,
        start:Date,
        end:Date,
        isVisible:Boolean
    }
);


FeedSchema.methods.setVisibility = function (feedObject,visibility) {
    this.update(feedObject, 
    {$set: {isVisible:visibility}});
}

FeedSchema.methods.testMethod = function() {
    console.log(" !!! test Method Works !!! ")
}
module.exports = mongoose.model('Feed', FeedSchema)