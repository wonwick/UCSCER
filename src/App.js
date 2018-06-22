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



class App extends Component {
    render() {
        return ( 
            <div>
                <Switch>                
                    <Route exact path="/" component={Feed} />   
                    <Route path="/Login" component={Login} />

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