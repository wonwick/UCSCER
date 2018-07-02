// server/models/Article.js
const mongoose = require('mongoose')

let SubjectSchema = new mongoose.Schema(
    {
        academic_year: Number,
        type:Number,
        semester: Number,
        year:Number,
        subjects: [
            {       
                subject_code: String,
                subject_name: String,
                count:[Number],
                repeat:[Number]
            }
        ]
    }
);
SubjectSchema.methods.register = function (academic_year,semester,subject_code,index_no,year) {
    if(year>this.year){
        this.update({'academic_year':academic_year,'semester':semester,'subjects':[{'subject_code':subject_code}]}, 
        {$push: {subjects:[{index_no}]}});
    }
    else if (year==this.year){
        this.update({'academic_year':academic_year,'semester':semester,'subjects':[{'subject_code':subject_code}]}, 
        {$push: {subjects:[{index_no}]}});
    }
    return this.save()
}

SubjectSchema.methods.Unregister = function  (academic_year,semester,subject_code,year) {
    if(year>this.year){
        this.repeat--
    }
    else if (year==this.year){
        this.count--
    }
    return this.save()
}


// SubjectSchema.methods.addSubject = function(semAndYear) {
//     this.update(
//         semAndYear, 
//         { $push: {subject_code,subject_name,count:0,repeat:0} },
//         done
//     );
// }
SubjectSchema.methods.insertSubject = function(c) {
    this.subjects.push(c)
    return this.save()
}



SubjectSchema.methods.getSubject = function (subject_code,academic_year,semester) {
    Subject.find({'academic_year':academic_year,'semester':semester,'subjects':[{'subject_code': subject_code}] }).then((subject) => {
        return subject
    })
}
SubjectSchema.methods.testMethod = function() {
    console.log(" !!! test Method Works !!! ")
}

module.exports = mongoose.model('Subject', SubjectSchema)