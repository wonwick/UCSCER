import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { loadFeed } from './../redux/actions/actions'
import { setFeed } from './../redux/actions/actions'

import DatePicker from 'react-datepicker';


import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
  return {
    feedPosts: state.feed.feedPosts,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    profile: state.auth.profile,
  }
}

class SetExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSet: true,

      u_academic_year: 2000,
      u_end: moment(),
      u_isVisible: true,
      u_semester: 1,
      u_start: moment(),

      p_academic_year: 2000,
      p_end: moment(),
      p_isVisible: true,
      p_semester: 1,
      p_start: moment(),

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    this.props.loadFeed({ "data": {} })
  }


  setCurrentDetails() {
    var i = ""
    var j = ""
    if (this.props.feedPosts[0].type == 1) {
      i = 0
      j = 1
    }
    if (this.props.feedPosts[1].type == 1) {
      i = 1
      j = 0
    }
    this.setState({
      "u_academic_year": this.props.feedPosts[i].academic_year,
      "u_semester": this.props.feedPosts[i].semester,
      "u_start": moment(this.props.feedPosts[i].start),
      "u_end": moment(this.props.feedPosts[i].end),
      "u_isVisible": this.props.feedPosts[i].isVisible,

      "p_academic_year": this.props.feedPosts[j].academic_year,
      "p_semester": this.props.feedPosts[j].semester,
      "p_start": moment(this.props.feedPosts[j].start),
      "p_end": moment(this.props.feedPosts[j].end),
      "p_isVisible": this.props.feedPosts[j].isVisible,

      "isSet": false
    }
    )

  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }

  handleSelectChange(evt) {
    //console.log(evt.target.selectedIndex)
    this.setState({ [evt.target.id]: evt.target[evt.target.selectedIndex].value });
  }

  loadVisibilityIcon(visibility, type) {
    if (visibility) {
      if (type) {
        return (<i class="fa fa-eye fa-5x" onClick={() => { this.state.u_isVisible = !this.state.u_isVisible; this.forceUpdate() }}></i>)
      }
      else {
        return (<i class="fa fa-eye fa-5x" onClick={() => { this.state.p_isVisible = !this.state.p_isVisible; this.forceUpdate() }}></i>)
      }

    }
    else {
      if (type) {
        return (<i class="fa fa-eye-slash fa-5x" onClick={() => { this.state.u_isVisible = !this.state.u_isVisible; this.forceUpdate() }}></i>)
      }
      else {
        return (<i class="fa fa-eye-slash fa-5x" onClick={() => { this.state.p_isVisible = !this.state.p_isVisible; this.forceUpdate() }}></i>)
      }
    }
    this.forceUpdate()
  }

  submitUnderGradExam() {
    console.log("click Submit undergrad")
    var feedAndType = {
      "token": this.props.token,
      "data": {
        "type": 1,
        "newFeed": {
          "academic_year": this.state.u_academic_year,
          "end": this.state.u_end,
          "isVisible": this.state.u_isVisible,
          "semester": this.state.u_semester,
          "start": this.state.u_start
        }
      }
    }
    this.props.setFeed(feedAndType)
    this.props.history.push("/")


  }
  submitPostGradExam() {
    console.log("click Submit postgrad")
    var feedAndType = {
      "token": this.props.token,
      "data": {
        "type": 11,
        "newFeed": {
          "academic_year": this.state.p_academic_year,
          "end": this.state.p_end,
          "isVisible": this.state.p_isVisible,
          "semester": this.state.p_semester,
          "start": this.state.p_start
        }
      }
    }
    this.props.setFeed(feedAndType)
    this.props.history.push("/")

  }

  loadFeedEditor() {


    if (typeof this.props.feedPosts !== 'undefined' && this.props.feedPosts.length > 0) {
      if (this.state.isSet) {
        this.setCurrentDetails()
      }


      return (
        <div className="card-deck p-5">

          <div className="card col-sm-6">
            <div className="card-header text-center">
              <strong className="card-text ">Undergraduate</strong>
            </div>
            <div className="card-body ">

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="u_academic_year" >Academic Year :</label>
                  <input type="Number" className="form-control" id="u_academic_year" value={this.state.u_academic_year} onChange={this.handleChange} ></input>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="u_semester" >Semester :</label>
                  <select className="form-control" id="u_semester" value={this.state.u_semester} onChange={this.handleSelectChange} >
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group  ">
                    <label >Registration start :</label>
                    <DatePicker
                      selected={this.state.u_start}
                      onChange={(date) => this.setState({ u_start: date })}
                    />
                  </div>

                  <div className="form-group  ">
                    <label >Registration End :</label>
                    <DatePicker
                      selected={this.state.u_end}
                      onChange={(date) => this.setState({ u_end: date })}
                    />
                  </div>
                </div>
                <div className="col-md-6 text-center my-3">
                  {this.loadVisibilityIcon(this.state.u_isVisible, true)}
                  <p className="text-info">click on icon to change visibility</p>
                </div>
              </div>
              <div className="form-group ">
                <p className="text-danger"> {this.state.vailidity}</p>
                <button type="buttonlogi" className="btn btn-success float-right" onClick={
                  this.submitUnderGradExam.bind(this)
                } >Set Exam</button>
              </div>

            </div>
          </div>

          <div className="card col-sm-6">
            <div className="card-header text-center">
              <strong className="card-text ">Postgraduate</strong>
            </div>
            <div className="card-body ">

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="p_academic_year" >Academic Year :</label>
                  <input type="Number" className="form-control" id="p_academic_year" value={this.state.p_academic_year} onChange={this.handleChange} ></input>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="p_semester" >Semester :</label>
                  <select className="form-control" id="p_semester" value={this.state.p_semester} onChange={this.handleSelectChange} >
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group  ">
                    <label >Registration start :</label>
                    <DatePicker
                      selected={this.state.p_start}
                      onChange={(date) => this.setState({ p_start: date })}
                    />
                  </div>

                  <div className="form-group  ">
                    <label >Registration End :</label>
                    <DatePicker
                      selected={this.state.p_end}
                      onChange={(date) => this.setState({ p_end: date })}
                    />
                  </div>
                </div>
                <div className="col-md-6 text-center my-3">
                  {this.loadVisibilityIcon(this.state.p_isVisible, false)}
                  <p className="text-info">click on icon to change visibility</p>
                </div>
              </div>

              <div className="form-group ">
                <p className="text-danger"> {this.state.vailidity}</p>
                <button type="buttonlogi" className="btn btn-success float-right" onClick={
                  this.submitPostGradExam.bind(this)
                } >Set Exam</button>
              </div>



            </div>
          </div>

        </div>)
    }
  }
  render() {
    console.log("feedPost=>")
    console.log(this.props.feedPosts)
    console.log("<=feedPost")

    return (
      <div className="pmyx-0">

        <Header />

        <div className="container ">
          {this.loadFeedEditor()}
        </div>

        <Footer />
      </div >
    );
  }
}
export default connect(mapStateToProps, { loadFeed, setFeed })(SetExam);



