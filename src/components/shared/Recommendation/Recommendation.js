import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../../helpers/data/authData';

import './Recommendation.scss';

class Recommendation extends React.Component {
  static propTypes = {
    saveRecommendation: PropTypes.func,
  }

  saveRecommendationEvent = (event) => {
    event.preventDefault();
    const { combination, saveRecommendation } = this.props;

    const newRecommendation = {
      UID: authData.getUID(),
      combinationId: combination.id,
    };
    saveRecommendation(newRecommendation);
  }

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
              <button className="btn btn-light" onClick={this.saveRecommendationEvent}>Save</button>
            </div>
          </div>
        </div>
       </div>
    );
  }
}

export default Recommendation;
