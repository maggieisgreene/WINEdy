import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const getResponseForAQuestionByUID = (UID, questionId) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/responses.json?orderBy="UID"&equalTo="${UID}"`)
    .then((response) => {
      const responsesOBJ = response.data;
      const responses = [];
      Object.keys(responsesOBJ).forEach((responseId) => {
        responsesOBJ[responseId].id = responseId;
        responses.push(responsesOBJ[responseId]);
      });
      const responseForQuestion = responses.find((x) => x.questionId === questionId);
      console.log(responseForQuestion, 'error from get stuff ');
      resolve(responseForQuestion);
    })
    .catch((error) => reject(error));
});

const saveResponse = (newResponse) => axios.post(`${baseURL}/responses.json`, newResponse);

const updateResponse = (responseId, updatedResponse) => axios.put(`${baseURL}/responses/${responseId}.json`, updatedResponse);

export default { getResponseForAQuestionByUID, saveResponse, updateResponse };
