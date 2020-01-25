import React from 'react';

import './Recommendation.scss';

class Recommendation extends React.Component {
  render() {
    const { combination, wines } = this.props;

    const foundWine = wines.find((x) => x.id === combination.wineId);

    return (
       <div className="Recommendation col-3">
        <div className="card">
          <img src={foundWine.imageURL} className="card-img-top boardImg" alt={foundWine.name} />
            <div className="card-body">
              <h5 className="card-title">{foundWine.name}</h5>
              <p className="card-text">{foundWine.description}</p>
            <div className="d-flex justify-content-around">
              <button className="btn btn-light">Save</button>
            </div>
          </div>
        </div>
       </div>
    );
  }
}

export default Recommendation;
