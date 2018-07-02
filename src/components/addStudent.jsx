import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSubjects } from './../redux/actions/actions'
import { addUser } from './../redux/actions/actions'
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
        restSubjects: state.subjects.restSubjects,

    }
}

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "1",
            name: "",
            password: "",
            userName: "",
            year: "1",
            indexNo: "",


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
        return true
    }

    AddThisStudent(e) {
        e.preventDefault();
        console.log(this.state)
        var isValid = this.validate()
        if (isValid) {  
            this.props.addUser({
                "token":this.props.token,
                "data":{
                "index_no": this.state.indexNo,
                "name": this.state.name,
                "year": this.state.year,
                "userName": this.state.userName,
                "password": this.state.password,
                "type": this.state.userType}
            })

            this.setState({
                "index_no": "",
                "name": "",
                "userName": "",
                "password": "",
            })
        }
        else{
            console.log('validation fail!')
        }
    }
    LoadRestOfForm() {
        if (this.state.userType >= "1") {
            return (<div className="form-group">
                <label htmlFor="year">year:</label>
                <select className="form-control" id="year" value={this.state.year} onChange={this.handleSelectChange} >
                    <option value="1">1st year</option>
                    <option value="2">2nd year</option>
                    <option value="3">3rd year</option>
                    <option value="4">4th year</option>
                </select>
            </div>)
        }
        else {
                this.state.year = -1
        }
    }
    render() {
        return (
            <div className="pmyx-0">
                <Header />
                <div className="row justify-content-center p-5 ">
                    <div className="card col-md-8 p-5 bg-light">
                        <h1>Add User</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="userType" >Type :</label>
                                <select className="form-control" id="userType" value={this.state.userType} onChange={this.handleSelectChange} >
                                    <option value="1">Undergraduate</option>
                                    <option value="2">Postgraduate</option>
                                    <option value="0">Exam Department staff</option>
                                    <option value="-1">Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="indexNo" >Id No:</label>
                                <input type="Number" className="form-control" id="indexNo" value={this.state.indexNo} onChange={this.handleChange} ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" >Name:</label>
                                <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} ></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="userName" >Username:</label>
                                <input type="text" className="form-control" id="userName" value={this.state.userName} onChange={this.handleChange}></input>
                            </div>

                            <div className="form-group" >
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange} ></input>
                            </div>
                            {this.LoadRestOfForm()}
                            <div className="form-group ">
                                <button type="buttonlogi" className="btn btn-success float-right" onClick={
                                    this.AddThisStudent.bind(this)
                                } >Add User</button>
                            </div>
                        </form>
                    </div>


                </div>

                <Footer />
            </div >
        );
    }
}
export default connect(mapStateToProps, { loadSubjects, addUser, remSub, register })(AddStudent);



