const SimpleSubjects = require('./../models/SimpleSubjects')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    getAllSubjects: (req, res, next) => {
        var feedObject = req.body.data

        SimpleSubjects.find().then((feed) => {
            res.json(feed)
        })


    },


    registerSubjects: (req, res, next) => {
        const studentDetails = req.body.data.profile
        const subjectDetails = req.body.data.exams
        const unregisteringSemester=req.body.semesterData

        SimpleSubjects.updateMany(unregisteringSemester,
            {
                $pull: {
                    normal: studentDetails.index_no,
                    repeat: studentDetails.index_no
                }
            }
        ).exec();


        for (var i = 0; i < subjectDetails.length; i++) {
            function asd(i) {
                var cur = subjectDetails[i]
                console.log("this is cur =>")
                console.log(cur)
                console.log("<= this is cur")
                var targetSubject = {
                    "academic_year": cur.academic_year,
                    "subject_code": cur.subject_code
                }

                SimpleSubjects.findOne(targetSubject, (err, subject) => {
                    if (err) {
                        console.warn("simpleSubject finding sending Error")
                        res.send(err)
                    }
                    else if (!subject) {
                        console.warn("adding New Feed")
                        if (studentDetails.year == cur.year) {
                            new SimpleSubjects(
                                {
                                    academic_year: cur.academic_year,
                                    semester: cur.semester,
                                    subject_code: cur.subject_code,
                                    subject_name: cur.subject_name,
                                    year: cur.year,
                                    type: studentDetails.type,
                                    normal: [studentDetails.index_no],
                                    repeat: []
                                }
                            ).save((err, subject) => {
                                if (err) {
                                    console.log("errorAtaddStudentStudentctrl1")
                                    res.send(err)
                                }
                                else if (!subject) {
                                    cosole.log("errorAtaddStudentStudentctrl2")
                                    res.send(400)
                                }
                                else {
                                    console.warn("succesfully added")
                                }
                            })
                        }
                        else {
                            new SimpleSubjects(
                                {
                                    academic_year: cur.academic_year,
                                    semester: cur.semester,
                                    subject_code: cur.subject_code,
                                    subject_name: cur.subject_name,
                                    year: cur.year,
                                    type: studentDetails.type,
                                    normal: [],
                                    repeat: [studentDetails.index_no]
                                }
                            ).save((err, subject) => {
                                if (err) {
                                    console.log("errorAtaddStudentStudentctrl1")
                                    res.send(err)
                                }
                                else if (!subject) {
                                    cosole.log("errorAtaddStudentStudentctrl2")
                                    res.send(400)
                                }
                                else {
                                    console.warn("succesfully added")
                                }
                            })
                        }
                    }
                    else {
                        if (studentDetails.year == cur.year) {
                            if (subject.normal.indexOf(studentDetails.index_no)) {
                                subject.addNormal(studentDetails.index_no)
                            }
                        }
                        else {
                            if (subject.repeat.indexOf(studentDetails.index_no)) {
                                subject.addRepeat(studentDetails.index_no)
                            }
                        }
                    }


                })

            }
            asd(i)
        }
        SimpleSubjects.find().then((feed) => {
            res.json(feed)
        })
    },

    UnregisterSubjects: (req, res, next) => {
        studentDetails = req.body.data.profile
        unregisteringSemester = req.body.data.semster

        SimpleSubjects.update(unregisteringSemester,
            {
                $pullAll: {
                    normal: studentDetails.index_no,
                    repeat: studentDetails.index_no
                }
            }
        ).exec();

    },

    UnregisterSubjects: (req, res, next) => {
        studentDetails = req.body.data.profile
        semesterDetails = req.body.data.semesterData

        SimpleSubjects.update(semesterDetails, { $set: { text: 'changed' } }).exec();

        for (var i = 0; i < subjectDetails.length; i++) {
            var cur = subjectDetails[i]
            var targetSubject = {
                "academic_year": cur.academic_year,
                "subject_code": cur.subject_code
            }

            SimpleSubjects.findOne(targetSubject, (err, subject) => {
                if (err) {
                    console.warn("simpleSubject finding sending Error")
                    res.send(err)
                }
                else if (!subject) {
                    console.warn("SimpleSubject not found")
                }
                else {
                    if (studentDetails.year == cur.year) {
                        subject.normal = (subject.normal).filter(a => {
                            return (a !== studentDetails.index_no)
                        })
                    }
                    else {
                        subject.repeat = (subject.repeat).filter(a => {
                            return (a !== studentDetails.index_no)
                        })
                    }
                }
            })
        }
    }
}