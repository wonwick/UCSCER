// server/models/Article.js
const mongoose = require('mongoose')

let StudentSchema = new mongoose.Schema(
    {
        index_no: Number,
        name:String,
        year: Number,
        userName:String,
        password:String,
        type:Number,
        exams: [
            {   
                academic_year: Number,
                semester: Number,
                subject_code:String,
                year:Number
            }
        ]
    }
);
StudentSchema.methods.register = function (subjectObject) {
    this.exams.push(subjectObject)
    return this.save()
}
StudentSchema.methods.unRegister= function(index_no,subjectObject) {
    this.update({'index_no':index_no}, 
    {$pullAll: {exams:[{subjectObject}]}});
}
StudentSchema.methods.getStudent = function (index_no) {
    Student.find({ 'index_no': index_no }).then((Student) => {
        return student
    })
}
module.exports = mongoose.model('Student', StudentSchema)