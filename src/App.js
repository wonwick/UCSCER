// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './css/bootstrap.min.css';
import Feed from './components/Feed.jsx'
import Login from './components/Login.jsx'
import Registration from './components/Registration.jsx';
import MySubjects from './components/MySubjects.jsx';
import ManageStudents from './components/manageStudents.jsx';
import AddStudent from './components/addStudent.jsx';
import Analytics from './components/analytics.jsx';
import AddSubject from './components/addSubject.jsx';
import SetExam from './components/SetExam.jsx';





class App extends Component {
    render() {
        return ( 
            <div>
                <Switch>                
                    <Route exact path="/" component={Feed} />   
                    <Route path="/Login" component={Login} />
                    <Route path="/Register" component={Registration} />
                    <Route path="/MySubjects" component={MySubjects} />
                    <Route path="/ManageStudents" component={ManageStudents} />
                    <Route path="/AddStudent" component={AddStudent} />
                    <Route path="/Analytics" component={Analytics} />
                    <Route path="/AddSubject" component={AddSubject} />
                    <Route path="/SetExam" component={SetExam} />



                    <Route path="**" component={Feed} />

                </Switch>
            </div>
        );
    }
}
export default App;

//<Route path="/profile/:id" component={Profile} />
//<Route path="/articleview/:id" component={ArticleView} />
//<Route path="/editor" component={Editor} />