const Subject = require('./../models/Subject')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addSubject: (req, res, next) => {
        let { academic_year, semester, year, subject_code, subject_name, type} = req.body.data;
        Subject.findOne({ academic_year, semester, year,type }, (err, results) => {
            if (!results) {
                new Subject({ academic_year, semester, type ,year, "subjects": [] }).save((err, subject) => {
                    if (err)
                        res.send(err)
                    else if (!subject)
                        res.send(400)
                    else {
                        return subject.insertSubject({ subject_code, subject_name, count: 0, repeat: 0 }).then((s) => {
                            return res.json(s)
                        }).catch(next)

                    }
                })
            }
            else {
                if (results.subjects.some(e => e.subject_code === subject_code)) {
                    return res.json(results)
                    next()
                }
                else {
                    results.insertSubject({ subject_code, subject_name, count: 0, repeat: 0 }).then((s) => {
                        return res.json(s)
                    }).catch(next)
                }
            }
        })
    },

    register: (req, res, next) => {
        Subject.findOne(req.body).then((subject) => {
            return subject.register().then(() => {
                return res.json({ msg: "Done" })
            })
        }).catch(next)
    },




    getSubjects: (req, res, next) => {
        Subject.find(req.body.quary, (err, subject) => {
            console.log(req.body.quary)
            if (err)
                res.json(err)
            else if (!subject)
                res.json(404)
            else
                res.json(subject)
        })
    },

    RegisterSubjects: (req, res, next) => {
        studentDetails = req.body.data.profile
        subjectDetails = req.body.data.exams

        for (var i = 0; i < subjectDetails.length; i++) {
            var targetSubject = {
                "academic_year": subjectDetails.academic_year,
                "subjects": [{ "subject_code": subjectDetails.subject_code }]
            }

            Subject.findOne(targetSubject, (err, subject) => {
                console.log(targetSubject)
                if (err)
                    res.json(err)
                else if (!subject)
                    res.json(404)
                else {
                    if (subjectDetails[i].year == studentDetails.year) {
                        subject.subjects.count.push(studentDetails.index_no)
                    }
                    else{
                        subject.subjects.repeat.push(studentDetails.index_no)
                    }
                    res.json(subject)
                }
            })


        }

    },






}