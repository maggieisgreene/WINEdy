import axios from 'axios';
import APIkeys from '../apiKeys.json';

const baseURL = APIkeys.firebaseKeys.databaseURL;

const getCombinations = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/combinations.json`)
    .then((response) => {
      const combinationsOBJ = response.data;
      const combinations = [];
      Object.keys(combinationsOBJ).forEach((combinationID) => {
        combinationsOBJ[combinationID].id = combinationID;
        combinations.push(combinationsOBJ[combinationID]);
      });
      resolve(combinations);
    })
    .catch((error) => reject(error));
});

export default { getCombinations };
