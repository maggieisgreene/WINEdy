import React from 'react';

import Recommendation from '../../shared/Recommendation/Recommendation';

import authData from '../../../helpers/data/authData';
import responseData from '../../../helpers/data/responseData';
import combinationData from '../../../helpers/data/combinationData';
import wineData from '../../../helpers/data/wineData';
import selectionData from '../../../helpers/data/selectionData';

import './Recs.scss';

class Recs extends React.Component {
  state = {
    responses: [],
    combinations: [],
    wines: [],
  }

  getWinesFromResponses = () => {
    responseData.getResponsesByUID(authData.getUID())
      .then((responses) => {
        combinationData.getCombinations().then((combinations) => {
          wineData.getWines().then((wines) => {
            this.setState({ responses, combinations, wines });
          });
        });
      })
      .catch();
  }

  componentDidMount() {
    this.getWinesFromResponses();
  }

  saveRecommendationAsSelection = (newSelection) => {
    selectionData.saveSelection(newSelection)
      .then(() => this.getWinesFromResponses())
      .catch((err) => console.error('Error from save selection', err));
  }

  render() {
    const { responses, combinations, wines } = this.state;

    return (
      <div className="Recs">
        <div className="recs-header">
          <h2>Recommended For You</h2>
        </div>
        <div className="recs-container d-flex flex-wrap">
        { responses.map((response) => <Recommendation key={response.id} response={response} combination={combinations.find((x) => x.candyId === response.response)}
          wines={wines} saveRecommendation={this.saveRecommendationAsSelection} />)}
        </div>
      </div>
    );
  }
}

export default Recs;
