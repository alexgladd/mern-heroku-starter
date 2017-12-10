import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import Header from '../components/Header';
import AuthHome from '../components/AuthHome';
import Login from '../components/Login';
import Profile from '../components/Profile';

const PublicHome = () => (
  <div>
    <h2>Unauthenticated Home</h2>
    <p>This is the public homepage that shows up for unauthenticated users</p>
  </div>
)

const appStyle = {
  margin: '5vw'
};

class App extends React.Component {
  render() {
    const { user, logout } = this.props;

    const availableRoutes = [<Route path="/login/:network?" component={Login} key="1" />];
    if (user) {
      availableRoutes.push(<Route path="/profile" render={props => (
          <Profile user={user} {...props} />
        )} key="2" />);
    }

    return (
      <Router basename="/app">
        <div style={appStyle}>
          <Header user={user} onLogout={logout} />

          <hr/>

          { // home route
            user ?
            <Route exact path="/" render={props => (<AuthHome user={user} {...props} />)} /> :
            <Route exact path="/" component={PublicHome} />
          }

          { // content routes
            availableRoutes
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  logout() { dispatch(logoutUser()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
