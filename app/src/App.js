import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/Login';
import './App.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Profile = () => (
  <div>
    <h2>Profile</h2>
  </div>
)

const Logout = () => (
  <div>
    <h2>Logout</h2>
  </div>
)

class App extends React.Component {
  render() {
    return (
      <Router basename="/app">
        <div className="App">
          <header>
            <div className="HeaderLeft">
              <Link to="/">MERN App Home</Link>
            </div>
            <div className="HeaderRight">
              <Link to="/profile">Profile</Link>
              &nbsp;&middot;&nbsp;
              <Link to="/login">Login</Link>
            </div>
          </header>

          <hr/>

          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/login/:network?" component={Login} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

export default App;
