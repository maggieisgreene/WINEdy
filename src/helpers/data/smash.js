import questionData from './questionData';
import candyData from './candyData';

const getQuestionWithCandys = (questionId) => new Promise((resolve, reject) => {
  questionData.getSingleQuestionByID(questionId)
    .then((question) => {
      candyData.getCandys().then((candys) => {
        const newQuestion = { ...question };
        const foundCandys = [];
        const foundCandyOne = candys.find((x) => x.id === question.candyOneId);
        const foundCandyTwo = candys.find((x) => x.id === question.candyTwoId);
        const foundCandyThree = candys.find((x) => x.id === question.candyThreeId);

        foundCandys.push(foundCandyOne, foundCandyTwo, foundCandyThree);
        newQuestion.candys = foundCandys;
        resolve(newQuestion);
      });
    })
    .catch((error) => console.error('Error from smash', error));
});

export default { getQuestionWithCandys };
