import React from 'react';
import { Link } from 'react-router-dom';

import MiniSelection from '../../shared/MiniSelection/MiniSelection';

import authData from '../../../helpers/data/authData';
import candyData from '../../../helpers/data/candyData';
import combinationData from '../../../helpers/data/combinationData';
import selectionData from '../../../helpers/data/selectionData';
import wineData from '../../../helpers/data/wineData';

import './Dashboard.scss';

class Dashboard extends React.Component {
  state = {
    candys: [],
    combinations: [],
    selections: [],
    wines: [],
  }

  getWinesBySelections = () => {
    selectionData.getSelectionsByUID(authData.getUID())
      .then((selections) => {
        combinationData.getCombinations()
          .then((combinations) => {
            wineData.getWines()
              .then((wines) => {
                candyData.getCandys()
                  .then((candys) => {
                    this.setState({
                      selections,
                      combinations,
                      wines,
                      candys,
                    });
                  });
              });
          });
      })
      .catch((ERR) => console.error('Error from get selections or combos or wines yee!', ERR));
  }

  componentDidMount() {
    this.getWinesBySelections();
  }

  render() {
    const {
      candys,
      combinations,
      selections,
      wines,
    } = this.state;

    const randomCombo = combinations[Math.floor(Math.random() * combinations.length)];


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
              <div>
                {/* { (randomCombo) && candys.find((x) => x.id === randomCombo.candyId) } */}
                { (randomCombo) && <p>{randomCombo.candyId}</p> }
                { (randomCombo) && randomCombo.wineId }
              </div>
            </div>
          </div>
          <div className="mini-selections col-6">
            <div className="minis-holder">
              <h4>Your Selections</h4>
              <div className="minis">
                { (!selections.length) && <h4>You need to take the quiz first!</h4>}
                { (selections.length === 1)
                  ? selections.slice(0, 1).map((selection) => <MiniSelection key={selection.id}
                  combination={combinations.find((x) => x.id === selection.combinationId)} selection={selection} wines={wines} />)
                  : selections.slice(0, 2).map((selection) => <MiniSelection key={selection.id}
                  combination={combinations.find((x) => x.id === selection.combinationId)} selection={selection} wines={wines} />)
                }
              </div>
              <Link className="btn btn-secondary" to="/selections">See All Selections</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
