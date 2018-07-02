// server/models/Article.js
const mongoose = require('mongoose')

let SimpleSubjectsSchema = new mongoose.Schema(
    {
        academic_year: Number,
        semester: Number,
        subject_code: String,
        subject_name: String,
        year: Number,
        type:Number,
        normal:[Number],
        repeat:[Number]

    }
);


SimpleSubjectsSchema.methods.addRepeat = function(c) {
    this.repeat.push(c)
    return this.save()
}
SimpleSubjectsSchema.methods.addNormal = function(c) {
    this.normal.push(c)
    return this.save()
}

module.exports = mongoose.model('SimpleSubject', SimpleSubjectsSchema)