import React from 'react';

import authData from '../../../helpers/data/authData';
import questionData from '../../../helpers/data/questionData';
import responseData from '../../../helpers/data/responseData';

import './Question.scss';

class Question extends React.Component {
  state = {
    question: [],
    answer: {},
  }

  getQuestion = (questionId) => {
    questionData.getSingleQuestionByID(questionId)
      .then((question) => this.setState({ question }))
      .catch((ERR) => console.error('Error from get questions', ERR));
  }

  getExistingResponse = (questionId) => {
    responseData.getResponseForAQuestionByUID(authData.getUID(), questionId)
      .then((response) => {
        const initialState = { answer: { response: '' } };
        if (response) {
          initialState.answer = response;
        }
        this.setState(initialState);
      })
      .catch((ERR) => console.error('error from get responses', ERR));
  }

  nextQuestion = () => {
    if (this.state.answer.id) {
      this.updateResponse();
    } else {
      this.saveResponse();
    }
    const { questionId } = this.props.match.params;
    const nextQuestionId = `question${questionId.split('question')[1] * 1 + 1}`;
    this.props.history.push(`/quiz/question/${nextQuestionId}`);
  }

  finishQuiz = () => {
    if (this.state.answer.id) {
      this.updateResponse();
    } else {
      this.saveResponse();
    }
    this.props.history.push('/selections');
  }

  componentDidMount() {
    const { questionId } = this.props.match.params;

    this.getQuestion(questionId);
    this.getExistingResponse(questionId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.questionId !== prevProps.match.params.questionId) {
      this.getQuestion(this.props.match.params.questionId);
      this.getExistingResponse(this.props.match.params.questionId);
    }
  }

  onAnswerChange = (event) => {
    const { answer } = this.state;
    // const { questionId } = this.props.match.params;
    const updatedAnswer = { ...answer };
    updatedAnswer.response = event.target.value;
    this.setState({ answer: updatedAnswer });

    // if (answer !== undefined && answer.id) {

    //   this.setState({
    //     answer: {
    //       id: answer.id, questionId, UID: authData.getUID(), response: event.target.value,
    //     },
    //   });
    // } else {

    // }/
  }

  saveResponse = () => {
    const { answer } = this.state;
    const { questionId } = this.props.match.params;

    const newResponse = {
      questionId,
      response: answer.response,
      UID: authData.getUID(),
    };

    responseData.saveResponse(newResponse)
      .then()
      .catch((err) => console.error('Error from save response', err));
  }

  updateResponse = () => {
    // how do I precheck something
    const { answer } = this.state;

    const updatedResponse = {
      questionId: answer.questionId,
      response: answer.response,
      UID: answer.UID,
    };

    responseData.updateResponse(answer.id, updatedResponse)
      .then()
      .catch((err) => console.error('Error from update response', err));
  }

  render() {
    const { question } = this.state;
    const { questionId } = this.props.match.params;

    return (
      <div className="Question">
        <div className="question-holder">
          <h2>{question.question}</h2>
        </div>

        <div className="quiz-body">
          <div className="placeholder col-4">
          </div>
          <div className="answer-holder col-4">
            <div className="btn-group-toggle" data-toggle="buttons">
              <button className="btn btn-light my-btn" type="radio" name="option1" onClick={this.onAnswerChange} value={question.candyOneId} checked={this.state.answer === question.candyOneId}>
                {question.candyOneId}
              </button>
              <button className="btn btn-light my-btn" type="radio" name="option2" onClick={this.onAnswerChange} value={question.candyTwoId} checked={this.state.answer === question.candyTwoId}>
                {question.candyTwoId}
              </button>
              <button className="btn btn-light my-btn" type="radio" name="option3" onClick={this.onAnswerChange} value={question.candyThreeId} checked={this.state.answer === question.candyThreeId}>
                {question.candyThreeId}
              </button>
            </div>
          </div>
        </div>

        <div className="quiz-button">
            {
            (questionId === 'question4')
              ? <button className="btn btn-light" onClick={this.finishQuiz}>Done</button>
              : <button className="btn btn-light" onClick={this.nextQuestion}>Next</button>
            }
          </div>
      </div>
    );
  }
}

export default Question;
