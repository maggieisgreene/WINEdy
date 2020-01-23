import React from 'react';

import questionData from '../../../helpers/data/questionData';

import './Question.scss';

class Quiz extends React.Component {
  state = {
    question: [],
    optionOne: '',
    optionTwo: '',
    optionThree: '',
  }

  getQuestions = (questionId) => {
    questionData.getSingleQuestionByID(questionId)
      .then((question) => this.setState({ question }))
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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.questionId !== prevProps.match.params.questionId) {
      this.getQuestions(this.props.match.params.questionId);
    }
  }

  optionOneChange = (event) => {
    this.setState({ optionOne: event.target.value });
  }

  optionTwoChange = (event) => {
    this.setState({ optionTwo: event.target.value });
  }

  optionThreeChange = (event) => {
    this.setState({ optionThree: event.target.value });
  }

  render() {
    const { question } = this.state;
    const { questionId } = this.props.match.params;

    return (
      <div className="Quiz">
        <div className="question-holder">
          <h2>{question.question}</h2>
        </div>
        <div className="answer-holder">
          <button className="btn btn-light">{question.candyOneId}</button>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {/* <label className="btn btn-light active">
              <input type="radio" name="options" id="option1" onChange={this.optionOneChange} value={question.candyOneId} checked={this.state.optionOne === question.candyOneId}>Active</input>
            </label>
            <label className="btn btn-light">
              <input type="radio" name="options" id="option2" onChange={this.optionTwoChange} value={question.candyTwoId} checked={this.state.optionTwo === question.candyTwoId}>Radio</input>
            </label>
            <label className="btn btn-light">
              <input type="radio" name="options" id="option3" onChange={this.optionThreeChange} value={question.candyThreeId} checked={this.state.optionThree === question.candyThreeId}>Radio</input>
            </label> */}
          </div>
        </div>

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
