import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    message: state.auth.message,
    profile: state.auth.profile
  }
}

class Header extends Component {
  render() {
    const profile = this.props.profile
    const token = this.props.token

    const isAuth = this.props.isAuth
    function logout(){
      localStorage.removeItem("isAuth")
      localStorage.removeItem("token")
      localStorage.removeItem("profile")
    }

    function loadLogin() {
      if (typeof (localStorage.isAuth) != 'undefined') {
        if (isAuth) {
          return (

            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">{profile.name}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={logout.bind(this)}>Logout <span className="fa fa-sign-out"></span></a>
              </li>
            </ul>
          )
        }
        else if (false) {
          return (
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="Login">Login<span className="fa fa-sign-in"></span></a>
              </li>
            </ul>
          )
        }
      }
      else {
        return (
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="Login">Login<span className="fa fa-sign-in"></span></a>
            </li>
          </ul>
        )
      }

    }

    function loadNavItems() {
      if (typeof (profile) != 'undefined') {
        if (profile.type == -1) {
          return (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Manage Student</a>
              </li>
            </ul>
          )
        }
        if (profile.type == 0) {
          return (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Add Exams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Report</a>
              </li>
            </ul>
          )
        }
        if (profile.type == 1) {
          return (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Register">Register</a>
              </li>
            </ul>
          )
        }
      }

      else {
        return (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>)
      }
    }

    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <a className="navbar-brand" href="#">UCSC Exam Registration</a>
        {loadNavItems()}
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            {loadLogin()}
          </li>
        </ul>
      </nav>
    );
  }
}


export default connect(mapStateToProps)(Header);
