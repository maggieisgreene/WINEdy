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
        <h1>Welcome To WINDEDY</h1>
        <button className="btn btn-light" onClick={this.loginEvent}>Login With Google</button>
      </div>
    );
  }
}

export default Auth;
