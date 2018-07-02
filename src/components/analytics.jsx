import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { getAllSubjects } from './../redux/actions/actions'
import { submitRegistration } from './../redux/actions/actions'
import { Collapse } from 'react-collapse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import { browserHistory } from 'react-router';
const mapStateToProps = state => {
  return {
    feedPosts: state.feed.feedPosts,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    profile: state.auth.profile,
    allSubjects: state.allSubjects.allSubjects

  }
}

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      academicYears: [],
      currentAcademicYear: 2018,
      currentSemester: 1,
      currentYear: 3,
      selectedSubjects: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  handleSelectChange(evt) {
    console.log(evt.target[evt.target.selectedIndex].value)
    this.setState({ [evt.target.id]: evt.target[evt.target.selectedIndex].value });
  }

  componentWillMount() {
    this.props.getAllSubjects({ "token": this.props.token })
  }

  clickOnSubmit() {
    console.log(this.state)
  }

  loadSelecter() {
    this.state.academicYears = [...new Set(this.props.allSubjects.map(item => item.academic_year))];
    const l = this.state.academicYears.length

    if (l > 0) {
      const academicYears = this.state.academicYears.map(subject => (<option value={subject}>{subject}</option>)
      )
      return (
        <div className="card col-md-5 bg-light mx-5 my-5 p-5">
          <h1>All Subjects</h1>
          <form>
            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="userType" >Academic Year :</label>
                <select className="form-control" id="currentAcademicYear" value={this.state.currentAcademicYear} onChange={this.handleSelectChange} >
                  {academicYears}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="userType" >Semester :</label>
                <select className="form-control" id="currentSemester" value={this.state.currentSemester} onChange={this.handleSelectChange} >
                  <option value="1">semester 1</option>
                  <option value="2">semester 2</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="userType" >year :</label>
                <select className="form-control" id="currentYear" value={this.state.currentYear} onChange={this.handleSelectChange} >
                  <option value="1">1st year</option>
                  <option value="2">2nd year</option>
                  <option value="3">3rd year</option>
                  <option value="4">4th year</option>
                </select>
              </div>
            </div>
          </form>
          {this.loadAllSubjects()}

          {console.log(this.state.selectedSubjects)}
        </div>

      )
    }
  }
  collpase(subject_code) {
    console.log("clicked on " + subject_code)

    const l = this.state.selectedSubjects.length
    for (var i = 0; i < l; i++) {
      console.log("clicked on " + subject_code)

      if (this.state.selectedSubjects[i].subject_code == subject_code) {
        console.log("visibility" + this.state.selectedSubjects[i].isVisible)
        this.state.selectedSubjects[i].isVisible = !this.state.selectedSubjects[i].isVisible
        break
      }
    }
    this.forceUpdate()
  }

  loadIndexnumbers(IndexNumberList) {
    console.log("loading indexnumbers" + IndexNumberList)

    const IndexNumbers = JSON.parse(IndexNumberList)
    console.log(IndexNumbers)
    return IndexNumbers.map(i => {
      console.log(i);
      return (<a className="list-group-item list-group-item-action list-group-item-light  " onClick={console.log("clickOnIndexNo")}>{i}</a>)
    })
  }


  loadAllSubjects() {

    var selectedSubjects = this.props.allSubjects.filter(
      subject => {
        console.log(subject)
        return (subject.academic_year == this.state.currentAcademicYear && subject.semester == this.state.currentSemester && subject.year == this.state.currentYear)
      })
    console.log("selectedSubjects.length:" + selectedSubjects.length)

    this.state.selectedSubjects = selectedSubjects
    var subjectView = ""
    if (selectedSubjects.length > 0) {

      subjectView = selectedSubjects.map(subject => {
        console.log("mapping")
        return (
          <div class="card" >
            <a className="list-group-item list-group-item-action list-group-item-success" onClick={this.collpase.bind(this, subject.subject_code)}><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}<span className="fa fa-plus-circle float-right fa-lg"></span></a>
            <Collapse isOpened={subject.isVisible}>
              <div id={"collapse" + subject.subject_code} class="row justify-content-center py-3" >
                <div class="card col-md-5 py-3">
                  <p> <strong>normals: </strong> {subject.count.normals}</p>
                  {this.loadIndexnumbers(JSON.stringify(subject.normal))}
                </div>
                <div class="card col-md-5 py-3" >
                  <p><strong>repeats: </strong>{subject.count.repeats}</p>
                  {this.loadIndexnumbers(JSON.stringify(subject.repeat))}
                </div>
              </div>
            </Collapse>
          </div>)
      })
    }
    console.log("subjectView:" + subjectView.toString())
    return subjectView

  }

  plotData() {
    const selectedSubjects = this.state.selectedSubjects
    var data = []
    for (var i = 0; i < selectedSubjects.length; i++) {
      console.log(selectedSubjects[i])
      var subject = {
        "name": selectedSubjects[i].subject_code.toUpperCase(),
        "normal": selectedSubjects[i].count.normals,
        "repeat": selectedSubjects[i].count.repeats
      }
      data.push(subject)
    }
    console.log(data)
    return (
      <BarChart
        width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="normal" fill="#8884d8" />
        <Bar dataKey="repeat" fill="#82ca9d" />
      </BarChart>
    )
  }


  render() {
    console.log("rendering")
    console.log(this.props.feedPosts)
    console.log("rendered")

    return (
      <div className="pmyx-0">
        <Header />
        <div className="row justify-content-center">
          {this.loadSelecter()}

          <div className="card col-md-5 bg-light mx-5 my-5 p-5">
            <h1>Graphical representation</h1>
            {this.plotData()}
          </div>
        </div>
        <div className="row justify-content-center">

          <div className="card col-md-5 bg-light mx-5 my-5">

          </div>
          <div className="card col-md-5  bg-light mx-5 my-5">
          </div>
        </div>

        <Footer />
      </div >
    );
  }
}
export default connect(mapStateToProps, {
  getAllSubjects
})(Analytics);



