const Student = require('./../models/Student')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addStudent: (req, res, next) => {
        let { index_no, name, year,userName,password,type } = req.body;
        Student.findOne({index_no},(err, student) => {
            if (err){
                console.warn("addStudent sending Error")
                res.send(err)
            }
            else if (!student){
                console.warn("adding New Student")
                new Student({ index_no, name, year,userName,password,type,"exams":[] }).save((err, localStudent) => {
                    if (err){
                        console.log("errorAtaddStudentStudentctrl1")
                        res.send(err) 
                    }
                    else if (!localStudent){
                        cosole.log("errorAtaddStudentStudentctrl2")
                        res.send(400)
                    }
                    else {
                        console.warn("succesfully added")
                        res.send(localStudent)
                    }
                })
            }
            else{
                console.warn("already Student exists")
                res.send({"staus":"alreadyExists"})
                //res.send(student)
            }
            
        })

        
    },

    getStudents: (req, res, next) => {
        let { index_no, name, year,userName,password,type } = req.body;
        console.log("index_no"+index_no)
        Student.find(req.index_no,(err, student) => {
                if (err)
                    res.send(err)
                else if (!student)
                    res.send(404)
                else
                    res.send(student)
            })
    },

    getStudent: (req, res, next) => {
        let { index_no, name, year,userName,password,type } = req.body;
        console.warn("getStudent"+index_no)
        Student.findOne({ index_no },(err, student) => {
                if (err){
                    console.warn("matching student not found")
                    res.send(err)
                }
                else if (!student){
                    console.warn("matching student not found")
                    res.send(404)
                }
                else
                    res.send(student)
            })
    }

}