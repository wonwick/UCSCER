import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(){
    this.state={
        isAuth: false,
        token:"",
        message:"not authenticated",
        profile:{
            type: "",
            index_no:"",
            name:"",    
            year:"",
                }
    }
  }

  componentDidMount(){
    fetch("api/Authenticate")

  }

  render() {
    return (
      <div>
        <h2>Subjects</h2>
      </div>
    );
  }
}

 export default subjects; 