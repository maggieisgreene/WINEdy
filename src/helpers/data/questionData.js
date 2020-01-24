import axios from 'axios';
import APIkeys from '../apiKeys.json';

const baseURL = APIkeys.firebaseKeys.databaseURL;

const getSingleQuestionByID = (questionId) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/questions/${questionId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

export default { getSingleQuestionByID };
