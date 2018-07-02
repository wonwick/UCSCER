import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSubjects } from './../redux/actions/actions'
import { addSub } from './../redux/actions/actions'
import { remSub } from './../redux/actions/actions'
import { register } from './../redux/actions/actions'
import { submitRegistration } from './../redux/actions/actions'
import { loadFeed } from './../redux/actions/actions'


//import FloatingSubjects from "./FloatingSubjects.jsx";

const mapStateToProps = state => {

    return {
        feedPosts: state.feed.feedPosts,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        profile: state.auth.profile,
        selectedSubjects: state.subjects.selectedSubjects,
        restSubjects: state.subjects.restSubjects,
    }
}

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            end: "",
            start: ""
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {

        this.props.loadFeed({ "data": { "isVisible": "true" } })




    }


    makeQuery() {
        const type = this.props.profile.type
        console.log(this.props.feedPosts)
        if (this.props.feedPosts.length > 0) {
            for (var i = 0; i < this.props.feedPosts.length; i++) {
                if (this.props.feedPosts[i].type == type) {
                    var releventFeed = this.props.feedPosts[i]

                    this.setState({
                        "start": releventFeed.start,
                        "end": releventFeed.end

                    })
                    const quary = {
                        "academic_year": releventFeed.academic_year,
                        "semester": releventFeed.semester,
                        "type": releventFeed.type
                    }
                    console.log(quary)
                    this.state.isLoaded = true
                    return (quary)
                }
            }
            return ({ "nothing": 0 })


        }
        else {
            return ({ "nothing": 0 })
        }
    }


    clickOnSubject(subject_code) {
        //e.preventDefault();
        console.log("clicked subject: " + subject_code)
        //this.props.SignInUser({"password":this.state.password,"userName":this.state.userName})
        this.props.addSub({ "subject_code": subject_code })
    }

    clickOnAddedSubject(subject_code) {
        //e.preventDefault();
        console.log("clicked subject: " + subject_code)
        //this.props.SignInUser({"password":this.state.password,"userName":this.state.userName})
        this.props.remSub({ "subject_code": subject_code })
    }

    clickOnRegister() {
        console.log("clicked on Register")
        var studentWithSubjects = {
            "index_no": this.props.profile.index_no,
            "name": this.props.profile.name,
            "academic_year": 2000,
            "semester": 1,
            "subjects": this.props.selectedSubjects,
        }
        this.props.register({ "token": this.props.token, "data": studentWithSubjects })
        this.props.submitRegistration({ "token": this.props.token, "data": { "profile": this.props.profile, "exams": this.props.selectedSubjects, "semesterData": { "academic_year": 2000, "semester": 1, "type": 1 } } })
        this.props.history.push("MySubjects")
    }

    makeSubjectsView(asd, t) {
        if (typeof (asd) != 'undefined') {
            var data = JSON.parse(asd)

            return (
                data.map((subject) => {
                    var cond = subject.isSelected
                    if ((cond == 'false') && t) {
                        console.log("in Available");
                        //console.log(subject.subject_code);
                        //this.props.addSub.bind(this,{"subject_code":subject.subject_code})
                        return <a className="list-group-item list-group-item-action list-group-item-success" onClick={this.clickOnSubject.bind(this, subject.subject_code)}><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}<span className="fa fa-plus-circle float-right fa-lg"></span></a>
                    }
                    else if (!(cond == "false") && (!t)) {
                        console.log("in selected");
                        return <a className="list-group-item list-group-item-action list-group-item-danger" onClick={this.clickOnAddedSubject.bind(this, subject.subject_code)}><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}<span className="fa fa-minus-circle float-right fa-lg"></span></a>
                    }
                }
                )
            )
        }
        else return (<a href="#" className="list-group-item list-group-item-action">psudo subject</a>)

    }
    makeButton() {
        if (this.state.start !== "" && this.state.end !== "") {
            console.log(this.state.start)
            console.log(this.state.end)

            if (new Date(this.state.start) > new Date()) {
                return (
                    <div className="form-group py-4">
                        <button type="buttonlogi" className="btn btn-info float-right" onClick={()=>this.props.history.push("/")}>Too early for Registration</button>
                    </div>)
            }


            else if (new Date (this.state.end) < new Date()) {
                return (
                    <div className="form-group py-4">
                        <button type="buttonlogi" className="btn btn-danger float-right" onClick={()=>this.props.history.push("/")}>Registration Overdue</button>
                    </div>)
            }


            else {
                return (
                    <div className="form-group py-4">
                        <button type="buttonlogi" className="btn btn-success float-right" onClick={
                            this.clickOnRegister.bind(this)}>Register</button>
                    </div>)
            }
        }

        else {
            return
        }
    }


    render() {
        if (this.props.restSubjects.length == 0) {
            return (
                <div className="pmyx-0">
                    <Header />
                    <div className="container p-5">
                        <div className="card text-center p-5">
                            <h1>No Registration Available</h1>
                        </div>
                    </div>




                    <Footer />
                </div >

            )
        }
        console.log("selectedSubjects=>")
        console.log(this.props.restSubjects)
        console.log("<=END of selectedSubjects")
        if (!this.state.isLoaded) {
            this.props.loadSubjects({ "token": this.props.token, "quary": this.makeQuery() })
        }

        const examsByYear = this.props.restSubjects.map((yearOfStudy) => {
            if (yearOfStudy.year <= this.props.profile.year) {
                return (<div className="card">
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

                </div>)
            }
        }
        )
        const chosenExams = this.props.restSubjects.map((chosenYearOfStudy) =>
            <div className="card">
                <div className="card-header">
                    <a className="card-link" data-toggle="collapse">
                        {chosenYearOfStudy.year} year exams
                    </a>
                </div>
                <div id={"collapseOne" + chosenYearOfStudy.year} className="collapse show" data-parent="#accordion" visbility="false">
                    <div className="card-body">
                        <div className="list-group">
                            {
                                this.makeSubjectsView(JSON.stringify(chosenYearOfStudy.subjects), false)
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
        return (
            <div className="pmyx-0">
                <Header />
                <div className="row">
                    <div className="container col-md-5 p-5 bg-light">
                        <h1>Available Subjects</h1>
                        <div id="accordion">
                            {examsByYear}
                        </div>
                    </div>
                    <div className="container col-md-5 off-set-1 p-5 bg-light">
                        <h1>Selected Subjects</h1>
                        <div id="accordion">
                            {chosenExams}
                        </div>
                        {this.makeButton()}

                    </div>


                </div>

                <Footer />
            </div >
        );
    }
}
export default connect(mapStateToProps, { loadSubjects, addSub, remSub, register, submitRegistration, loadFeed })(Registration);



