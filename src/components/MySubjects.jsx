import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadSelectedSubjects } from './../redux/actions/actions'
import { submitRegistration } from './../redux/actions/actions'
import { loadFeed } from './../redux/actions/actions'


import { browserHistory } from 'react-router';
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

class MySubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "isLoaded": false,
      "academic_year": "",
      "semester": "",
    };
  }

  componentWillMount() {
    this.props.loadSelectedSubjects({ "token": this.props.token, "index_no": this.props.profile.index_no })
    this.props.loadFeed({ "data": { "isVisible": "true" } })

  }

  clickOnSubmit() {
    console.log("clicked on Register")
    //this.props.submitRegistration({ "token": this.props.token, "data": { "profile": this.props.profile, "exams": this.props.selectedSubjects, "semesterData": { "academic_year": 2000, "semester": 1, "type": 1 } } })
    this.props.history.push("register")
  }
  makeQuery() {
    const type = this.props.profile.type
    console.log(this.props.feedPosts)
    if (this.props.feedPosts.length > 0) {
      for (var i = 0; i < this.props.feedPosts.length; i++) {
        if (this.props.feedPosts[i].type == type) {
          var releventFeed = this.props.feedPosts[i]

          this.setState({
            "academic_year": releventFeed.academic_year,
            "semester": releventFeed.semester,
            "type": releventFeed.type

          })
          this.state.isLoaded = true
        
        }
      }
    }

  }

  makeSubjectsView(asd, a, s) {
    if (typeof (asd) != 'undefined') {
      console.log(asd)
      var data = JSON.parse(asd)

      function sortbySubjectCode(s1, s2) {
        var x = s2.subject_code.toLowerCase();
        var y = s1.subject_code.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      }

      data = data.sort(sortbySubjectCode);

      return (
        data.map((subject) => {
          if (subject.academic_year == this.state.academic_year && subject.semester == this.state.semester) {
            console.log("in Available");
            if (subject.year < this.props.profile.year) {
              return <a className="list-group-item list-group-item-action list-group-item-warning " ><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}</a>
            }
            else {
              return <a className="list-group-item list-group-item-action list-group-item-success" ><strong>{(subject.subject_code).toUpperCase()} : </strong>{subject.subject_name}</a>
            }
          }
          return
        }
        )
      )
    }
    else return (<a href="#" className="list-group-item list-group-item-action">No Subjects Selected</a>)

  }
  render() {
    if (!this.state.isLoaded) {
      this.makeQuery()
    }
    console.log(this.props.feedPosts)
    return (
      <div className="pmyx-0">
        <Header />
        <div className="row justify-content-center p-5 ">
          <div className="card col-sm-6 p-5">
            <h1>Selected Subjects</h1>
            <div className="card-body">
              <div className="list-group">
                {this.makeSubjectsView(JSON.stringify(this.props.selectedSubjects), "2000", "1")}
              </div>
            </div>
            <div className="form-group ">
              <div className="text-center ">
                <p className="text-info">to change currently selected subjects go to " Register " agin.</p>
              </div>
              {/* <button type="buttonlogi" className="btn btn-success float-right" onClick={
                this.clickOnSubmit.bind(this)
              }>Change</button> */}
            </div>

          </div>

        </div>

        <Footer />
      </div >
    );
  }
}
export default connect(mapStateToProps, {
  loadSelectedSubjects, submitRegistration,loadFeed
})(MySubjects);



