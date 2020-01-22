import React from 'react';

import './Dashboard.scss';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="dash-header">
          <h2>Dashboard</h2>
          <button className="btn btn-light">Take Quiz</button>
        </div>
        <div className="dash-container">
          <div className="wine-of-week col-6">
            <div className="weekly-holder">
              <h4>Random wine of the week will go here, hopefully!</h4>
            </div>
          </div>
          <div className="mini-selections col-6">
            <div className="minis-holder">
              <h4>A preview of the user's saved wines will go here!</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
