const Subject = require('./../models/Subject')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addSubject: (req, res, next) => {
        let { academic_year, semester, year,subject_code,subject_name } = req.body;
        

        Subject.findOne({academic_year,semester,year},(err,results)=>{
            if(!results){
                new Subject({ academic_year, semester, year,"subjects":[] }).save((err, subject) => {
                    if (err)
                        res.send(err)   
                    else if (!subject)
                        res.send(400)
                    else {
                        return subject.insertSubject({subject_code,subject_name,count:0,repeat:0}).then(() => {
                            return res.json({msg: "Done"})
                        }).catch(next)  
                       
                    }
                })
            }
            else{ 
                if (results.subjects.some(e => e.subject_code === subject_code)) {
                    return res.json({msg: "Already exists"})
                    next()
                }
                else{
                    results.insertSubject({subject_code,subject_name,count:0,repeat:0}).then(() => {
                        return res.json({msg: "Done"})
                    }).catch(next)
                }
            }
        })
    },
    
    register: (req, res, next) => {
        Subject.findOne(req.body).then((subject)=> {
            return subject.register().then(()=>{
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },




    getSubjects: (req, res, next) => {
        Subject.find(req.body.quary,(err, subject) => {
                console.log(req.body.quary)
                if (err)
                    res.json(err)
                else if (!subject)
                    res.json(404)
                else
                    res.json(subject)
            })
    },

   




}