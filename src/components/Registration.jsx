import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSubjects } from './../redux/actions/actions'
import { addSub } from './../redux/actions/actions'
import { remSub } from './../redux/actions/actions'




const mapStateToProps = state => {

    return {
        feedPosts: state.feed.feedPosts,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        profile: state.auth.profile,
        selectedSubjects: state.subjects.selectedSubjects,
        restSubjects: state.subjects.restSubjects
    }
}

class Registration extends Component {
    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
        this.props.loadSubjects({ "token": this.props.token, "quary": { "academic_year": 2000 } })
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


    render() {
        const examsByYear = this.props.restSubjects.map((yearOfStudy) =>
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
                    </div>


                </div>

                <Footer />
            </div >
        );
    }
}
export default connect(mapStateToProps, { loadSubjects, addSub ,remSub })(Registration);



