import axios from 'axios';
import APIkeys from '../apiKeys.json';

const baseURL = APIkeys.firebaseKeys.databaseURL;

const getCandys = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/candys.json`)
    .then((response) => {
      const candysOBJ = response.data;
      const candys = [];
      Object.keys(candysOBJ).forEach((candyId) => {
        candysOBJ[candyId].id = candyId;
        candys.push(candysOBJ[candyId]);
      });
      resolve(candys);
    })
    .catch((error) => reject(error));
});

export default { getCandys };
