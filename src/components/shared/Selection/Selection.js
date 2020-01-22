import React from 'react';
import PropTypes from 'prop-types';

import './Selection.scss';

class Selection extends React.Component {
  static propTypes = {
    deleteSelection: PropTypes.func,
  }

  deleteSelectionEvent = (event) => {
    event.preventDefault();
    const { selection, deleteSelection } = this.props;
    deleteSelection(selection.id);
  }

  render() {
    const { selection, combination, wines } = this.props;

    const foundWine = wines.find((x) => x.id === combination.wineID);

    return (
      <div className="Selection col-3">
        <div className="card">
        <img src={foundWine.imageURL} className="card-img-top boardImg" alt={selection.name} />
          <div className="card-body">
            <h5 className="card-title">{foundWine.name}</h5>
            <p className="card-text">{foundWine.description}</p>
            <div className="d-flex justify-content-around">
              <button className="btn btn-light" onClick={this.deleteSelectionEvent}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Selection;
