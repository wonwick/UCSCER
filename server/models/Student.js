// server/models/Article.js
const mongoose = require('mongoose')

let StudentSchema = new mongoose.Schema(
    {
        index_no: Number,
        name: String,
        year: Number,
        userName: String,
        password: String,
        type: Number,
        exams: [
            {
                academic_year: Number,
                semester: Number,
                subject_code: String,
                subject_name:String,
                year: Number
            }
        ]
    }
);
module.exports = mongoose.model('Student', StudentSchema)