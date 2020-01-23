import React from 'react';

import questionData from '../../../helpers/data/questionData';

// import Question from '../../shared/Question/Question';

import './Quiz.scss';

class Quiz extends React.Component {
  state = {
    questions: [],
  }

  getQuestions = (questionId) => {
    questionData.getSingleQuestionByID(questionId)
      .then((questions) => this.setState({ questions }))
      .catch((ERR) => console.error('Error from get questions', ERR));
  }

  nextQuestion = () => {
    // save results - post to response
    const { questionId } = this.props.match.params;
    const nextQuestionId = `question${questionId.split('question')[1] * 1 + 1}`;
    this.props.history.push(`/quiz/question/${nextQuestionId}`);
  }

  finishQuiz = () => {
    // save results - post to response
    this.props.history.push('/selections');
  }

  componentDidMount() {
    const { questionId } = this.props.match.params;

    this.getQuestions(questionId);
  }

  render() {
    // const { questions } = this.state;
    const { questionId } = this.props.match.params;

    return (
      <div className="Quiz">
        {
          questionId === 'question4'
            ? <button className="btn btn-light" onClick={this.finishQuiz}>Done</button>
            : <button className="btn btn-light" onClick={this.nextQuestion}>Next</button>
        }
      </div>
    );
  }
}

export default Quiz;
