import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSubjects } from './../redux/actions/actions'
import { addSubject } from './../redux/actions/actions'
import { remSub } from './../redux/actions/actions'
import { register } from './../redux/actions/actions'
import Simplert from 'react-simplert'//import FloatingSubjects from "./FloatingSubjects.jsx";

const mapStateToProps = state => {

    return {
        feedPosts: state.feed.feedPosts,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        profile: state.auth.profile,
        allSubjects: state.allSubjects.allSubjects


    }
}

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "1",
            academic_year: new Date().getFullYear(),
            semester: "1",
            year: "1",
            subject_code: "",
            subject_name: "",
            simplertShow: false,
            vailidity: "",
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.id]: evt.target.value });
    }
    
    handleSelectChange(evt) {
        //console.log(evt.target.selectedIndex)
        this.setState({ [evt.target.id]: evt.target[evt.target.selectedIndex].value });
    }

    componentWillReceiveProps(nextProps) {
    }


    validate() {
        if (this.state.subject_name != "" && this.state.subject_code != "") {
            this.state.vailidity = ""
            return true
        }
        else {
            this.state.vailidity = "please fill all the sections ! "
            return false
        }
    }

    submitSubject() {
        const theSubject = {
            type: this.state.type,
            academic_year: this.state.academic_year,
            semester: this.state.semester,
            year: this.state.year,
            subject_code: this.state.subject_code,
            subject_name: this.state.subject_name,
        }
        this.state.simplertShow = false
        // console.log("clicked confirm")
        this.props.addSubject({ "token": this.props.token, "data": theSubject })
        this.state.subject_code = ""
        this.state.subject_name = ""
        this.forceUpdate()

    }

    AddThisSubject(e) {
        e.preventDefault();
        // console.log(this.state)
        function type(t) {
            if (t == 1) {
                return ("Undergraduates")
            }
            if (t == 2) {
                return ("Postgraduates")
            }
        }

        var isValid = this.validate()
        if (isValid) {
            var message = (
                "Are you sure you want to add <strong>" +
                this.state.subject_code.toUpperCase() + " " + this.state.subject_name + "</strong> subject for <strong>" +
                this.state.year + " Year, " + this.state.semester +
                " Semester " + type(this.state.type) +
                "</strong>?"
            )
            this.state.message = message
            this.state.simplertShow = true
            // console.log({
            //     "token": this.props.token,
            //     "data": {
            //         type: this.state.type,
            //         academic_year: this.state.academic_year,
            //         semester: this.state.semester,
            //         year: this.state.year,
            //         subject_code: this.state.subject_code,
            //         subject_name: this.state.subject_name,
            //     }
            // })
        }
        else {
            // console.log('validation fail!')
        }
        this.forceUpdate()



    }

    closeSimpleAlert() {
        this.state.simplertShow = false;
    }

    makeSubjectsView(asd, t) {
        console.log("asd:" + asd)
        if (typeof (asd) != 'undefined') {
            var data = JSON.parse(asd)

            return (
                data.map((subject) => {
                    var cond = "false"
                    if ((cond == 'false') && t) {
                        console.log("in Available");
                        //console.log(subject.subject_code);
                        //this.props.addSub.bind(this,{"subject_code":subject.subject_code})
                        return <a className="list-group-item list-group-item-action list-group-item-success" ><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}<span className="fa fa-plus-circle float-right fa-lg"></span></a>
                    }
                    else if (!(cond == "false") && (!t)) {
                        console.log("in selected");
                        return <a className="list-group-item list-group-item-action list-group-item-danger" ><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}<span className="fa fa-minus-circle float-right fa-lg"></span></a>
                    }
                }
                )
            )
        }
        else return (<a href="#" className="list-group-item list-group-item-action">psudo subject</a>)

    }

    render() {
        // console.log("allSubjects=>")
        // console.log(this.props.allSubjects)
        // console.log("<=allSubjects")

        var simplertStatus = this.state.simplertShow

        var messege = this.state.message
        // console.log("simplertStatus : " + simplertStatus)

        const examsByYear = this.props.allSubjects.map((yearOfStudy) =>
            <div className="card">
                <div className="card-header">
                    <a className="card-link" data-toggle="collapse" >
                        {yearOfStudy.year} year exams
                    </a>
                </div>
                <div id={"collapseOne" + yearOfStudy.year} className="collapse show" data-parent="#accordion" visbility="false">
                    <div className="card-body">
                        <div className="list-group">
                            {
                                this.makeSubjectsView(JSON.stringify(yearOfStudy.subjects), true)
                            }
                        </div>
                    </div>
                </div>

            </div>
        )

        return (
            <div class Name="pmyx-0">
                <Simplert
                    showSimplert={simplertStatus}
                    type="info"
                    useConfirmBtn="true"
                    title="Adding Subject "
                    message={messege}
                    onClose={() => this.closeSimpleAlert()}
                    onConfirm={() => this.submitSubject()}
                />
                <Header />
                <div className="row justify-content-center ">
                    <div className="card col-md-5 p-5 bg-light m-5">
                        <h1>Add Subject     </h1>
                        <form>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="type" >Type :</label>
                                    <select className="form-control" id="type" value={this.state.userType} onChange={this.handleSelectChange} >
                                        <option value="1">Undergraduate</option>
                                        <option value="2">Postgraduate</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="academic_year" >Academic Year :</label>
                                    <input type="Number" className="form-control" id="academic_year" value={this.state.academic_year} onChange={this.handleChange} ></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="semester" >Semester :</label>
                                    <select className="form-control" id="semester" value={this.state.semester} onChange={this.handleSelectChange} >
                                        <option value="1">1st Semester</option>
                                        <option value="2">2nd Semester</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-6 ">
                                    <label htmlFor="year" >Year :</label>
                                    <select className="form-control" id="year" value={this.state.year} onChange={this.handleSelectChange} >
                                        <option value="1">1st year</option>
                                        <option value="2">2nd year</option>
                                        <option value="3">3rd year</option>
                                        <option value="4">4th year</option>
                                    </select>
                                </div>
                            </div>


                            <div className="form-group" >
                                <label htmlFor="subject_code">Subject Code :</label>
                                <input type="text" className="form-control" id="subject_code" value={this.state.subject_code} onChange={this.handleChange} ></input>
                            </div>

                            <div className="form-group" >
                                <label htmlFor="subject_name">Subject Name :</label>
                                <input type="text" className="form-control" id="subject_name" value={this.state.subject_name} onChange={this.handleChange} ></input>
                            </div>

                            <div className="form-group ">
                                <p className="text-danger"> {this.state.vailidity}</p>
                                <button type="buttonlogi" className="btn btn-success float-right" onClick={
                                    this.AddThisSubject.bind(this)
                                } >Add Student</button>
                            </div>
                        </form>
                    </div>

                    <div className="card col-md-5 p-5 m-5 bg-light">
                        <h1>Subject view</h1>
                        <p>here are the Subjects which you prviously added</p>
                        <div id="accordion">
                            {examsByYear}
                        </div>
                    </div>
                </div>

                <Footer />
            </div >
        );
    }
}
export default connect(mapStateToProps, { loadSubjects, addSubject, remSub, register })(AddSubject);



