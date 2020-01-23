import React from 'react';

import authData from '../../../helpers/data/authData';
import questionData from '../../../helpers/data/questionData';
import responseData from '../../../helpers/data/responseData';

import './Question.scss';

class Quiz extends React.Component {
  state = {
    question: [],
    answer: '',
  }

  getQuestions = (questionId) => {
    questionData.getSingleQuestionByID(questionId)
      .then((question) => this.setState({ question }))
      .catch((ERR) => console.error('Error from get questions', ERR));
  }

  nextQuestion = () => {
    this.saveResponse();
    const { questionId } = this.props.match.params;
    const nextQuestionId = `question${questionId.split('question')[1] * 1 + 1}`;
    this.props.history.push(`/quiz/question/${nextQuestionId}`);
  }

  finishQuiz = () => {
    this.saveResponse();
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

  onAnswerChange = (event) => {
    this.setState({ answer: event.target.value });
  }

  saveResponse = () => {
    const { answer } = this.state;
    const { questionId } = this.props.match.params;

    const newResponse = {
      questionId,
      response: answer.split('-')[1],
      UID: authData.getUID(),
    };

    responseData.saveResponse(newResponse)
      .then()
      .catch((err) => console.error('Error from save response', err));
  }

  render() {
    const { question } = this.state;
    const { questionId } = this.props.match.params;

    return (
      <div className="Question">
        <div className="question-holder">
          <h2>{question.question}</h2>
        </div>
        <div className="answer-holder">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button className="btn btn-light btn-lg" type="radio" name="optionone" onClick={this.onAnswerChange} value={question.candyOneId} checked={this.state.answer === question.candyOneId}>
              {question.candyOneId}
            </button>
            <button className="btn btn-light btn-lg" type="radio" name="optiontwo" onClick={this.onAnswerChange} value={question.candyTwoId} checked={this.state.answer === question.candyTwoId}>
              {question.candyTwoId}
            </button>
            <button className="btn btn-light btn-lg" type="radio" name="optionthree" onClick={this.onAnswerChange} value={question.candyThreeId} checked={this.state.answer === question.candyThreeId}>
              {question.candyThreeId}
            </button>
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
