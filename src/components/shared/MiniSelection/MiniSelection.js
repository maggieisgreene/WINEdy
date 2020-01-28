import React from 'react';

import './MiniSelection.scss';

class MiniSelection extends React.Component {
  render() {
    const { selection, combination, wines } = this.props;

    const foundWine = wines.find((x) => x.id === combination.wineId);

    return (
      <div className="MiniSelection col-6">
        <div className="card mini-card">
          <img src={foundWine.imageURL} className="card-img-top mini-image" alt={selection.name} />
          <div className="card-body">
            <h5 className="card-title">{foundWine.name}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniSelection;
