import React from 'react';

import Selection from '../../shared/Selection/Selection';

import authData from '../../../helpers/data/authData';
import selectionData from '../../../helpers/data/selectionData';

import './Selections.scss';

class Selections extends React.Component {
  state = {
    selections: [],
  }

  getSelections = () => {
    selectionData.getSelectionsByUID(authData.getUID())
      .then((selections) => {
        this.setState({ selections });
      })
      .catch((ERR) => console.error('Error from get selections!', ERR));
  }

  componentDidMount() {
    this.getSelections();
  }

  render() {
    return (
      <div className="Selections">
        <h1>Selections</h1>
        <div className="boards d-flex flex-wrap">
          {this.state.selections.map((selection) => <Selection key={selection.id} board={selection} />)}
        </div>
      </div>
    );
  }
}

export default Selections;
