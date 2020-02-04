import React from 'react';

import './MiniSelection.scss';

class MiniSelection extends React.Component {
  render() {
    const { selection, combination, wines } = this.props;

    const foundWine = wines.find((x) => x.id === combination.wineId);

    return (
      <div className="MiniSelection col-6">
        <div className="mini-card">
          <img src={foundWine.imageURL} className="mini-image" alt={selection.name} />
          <div className="">
            <h5 className="">{foundWine.name}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniSelection;
