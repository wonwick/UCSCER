import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSubjects } from './../redux/actions/actions'
import { addSub } from './../redux/actions/actions'
import { remSub } from './../redux/actions/actions'
import { register } from './../redux/actions/actions'
//import FloatingSubjects from "./FloatingSubjects.jsx";

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


    render() {
        console.log("selectedSubjects=>")
        console.log( this.props.selectedSubjects)
        console.log("<=END of selectedSubjects")

        return (
            <div className="pmyx-0">
                <Header />
                <div className="row">
                    <div className="container col-md-5 p-5 bg-light">
                        <h1>Available Subjects</h1>
                        <div id="accordion">
                        </div>
                    </div>
                    <div className="container col-md-5 off-set-1 p-5 bg-light">
                        <h1>Selected Subjects</h1>
                        <div id="accordion">
                        </div>
                        <div className="form-group py-4">
                            <button type="buttonlogi" className="btn btn-success float-right">Register</button>
                        </div>
                   
                    </div>


                </div>

                <Footer />
            </div >
        );
    }
}
export default connect(mapStateToProps, { loadSubjects, addSub, remSub,register })(Registration);



