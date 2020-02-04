import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginEvent = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1 className="auth-main">WINEDY</h1>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <button className="btn btn-light" onClick={this.loginEvent}>Login with Google</button>
            </ul>
          </div>
        </nav>
      <div className="auth-display">
        <div className="auth-header">
          <h1>Welcome to WINEDY</h1>
        </div>
        <p>Sign in to get wine recommendations based on your favorite candies!</p>
      </div>
      </div>
    );
  }
}

export default Auth;
