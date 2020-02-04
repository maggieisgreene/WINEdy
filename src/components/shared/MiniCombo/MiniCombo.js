import React from 'react';
import { Link } from 'react-router-dom';

import './MiniCombo.scss';

class MiniCombo extends React.Component {
  render() {
    const { candy, combination, wine } = this.props;

    return (
      <div className="MiniCombo">
        <h4>If you prefer...</h4>
        <h5>{candy.name}</h5>
        <h4>We recommend this wine!</h4>
        <img src={wine.imageURL} className="mini-combo" alt={combination.name} />
        <h5>{wine.name}</h5>
        <p>Take the quiz to get your recommendations!</p>
        <Link className="btn btn-outline-secondary" to="/quiz/question/question1">Take Quiz</Link>
      </div>
    );
  }
}

export default MiniCombo;
