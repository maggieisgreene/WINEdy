import React from 'react';

import Selection from '../../shared/Selection/Selection';

import authData from '../../../helpers/data/authData';
import combinationData from '../../../helpers/data/combinationData';
import selectionData from '../../../helpers/data/selectionData';
import wineData from '../../../helpers/data/wineData';

import './Selections.scss';

class Selections extends React.Component {
  state = {
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
                this.setState({ selections, combinations, wines }); // set state for all once
              });
          });
      })
      .catch((ERR) => console.error('Error from get selections or combos or wines yee!', ERR));
  }

  componentDidMount() {
    this.getWinesBySelections();
  }

  deleteSelection = (selectionID) => {
    selectionData.deleteSelection(selectionID)
      .then(() => this.getWinesBySelections())
      .catch((ERR) => console.error('Error from delete selection!', ERR));
  }

  render() {
    const { combinations, wines } = this.state;

    return (
      <div className="Selections">
        <div className="selections-header">
          <h2>Your Selections</h2>
          <button className="btn btn-light">Take Quiz</button>
        </div>
        <div className="boards d-flex flex-wrap">
          {this.state.selections.map((selection) => <Selection key={selection.id} combination={combinations.find((x) => x.id === selection.combinationID)}
            selection={selection} wines={wines} deleteSelection={this.deleteSelection} />)}
        </div>
      </div>
    );
  }
}

export default Selections;
