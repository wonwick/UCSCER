import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { SignInUser } from './../redux/actions/actions'
import { browserHistory } from 'react-router';
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    message: state.auth.message,
    profile: state.auth.profile
    }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:"",
      password:"",
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange (evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }
  submitLogin(e) {
    e.preventDefault();
    console.log(this.state.userName)
    this.props.SignInUser({"password":this.state.password,"userName":this.state.userName})
    
  }

  render() {

    

    if(this.props.isAuth){
      this.props.history.push('/')    
    }
    return (
      <div className="pmyx-0">
        <Header />
          <div className="row justify-content-center p-5 ">

          <div className="card col-sm-6 p-5">
            <div className="container text-center  ">
              <h1 >Login </h1>
              <p>UCSC Undergraduate / Postgraduate / Exam Department</p>
            </div>

            <div className="container ">
              <form>
                <div className="form-group">
                  <label htmlFor="usr">Name:</label>
                  <input type="text" className="form-control" id="userName" value={this.state.userName} onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Password:</label>
                  <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange} ></input>
                </div>
                <div className="form-group ">
                <p>{this.props.message}</p>
                <button type="buttonlogi" className="btn btn-success float-right" onClick={
                      this.submitLogin.bind(this)            
                }>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div >
    );
  }
}
export default connect(mapStateToProps, { SignInUser })(Login);



