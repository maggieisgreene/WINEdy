import axios from 'axios';
import APIkeys from '../apiKeys.json';

const baseURL = APIkeys.firebaseKeys.databaseURL;

const getWines = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/wines.json`)
    .then((response) => {
      const winesOBJ = response.data;
      const wines = [];
      Object.keys(winesOBJ).forEach((wineID) => {
        winesOBJ[wineID].id = wineID;
        wines.push(winesOBJ[wineID]);
      });
      resolve(wines);
    })
    .catch((error) => reject(error));
});

export default { getWines };
