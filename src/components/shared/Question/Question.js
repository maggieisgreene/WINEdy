import React from 'react';

import './Question.scss';

class Question extends React.Component {
  render() {
    const { question } = this.props;

    return (
      <div className="Question">
        <div className="each-question">
          <h2>{question.question}</h2>
        </div>
        <div className="answer-holder">
          Answer choices will go here once i am cool
        </div>
      </div>
    );
  }
}

export default Question;
