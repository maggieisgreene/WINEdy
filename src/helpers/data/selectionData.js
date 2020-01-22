import axios from 'axios';
import APIkeys from '../apiKeys.json';

const baseURL = APIkeys.firebaseKeys.databaseURL;

const getSelectionsByUID = (UID) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/selections.json?orderBy="UID"&equalTo="${UID}"`)
    .then((response) => {
      const selectionsOBJ = response.data;
      const selections = [];
      Object.keys(selectionsOBJ).forEach((selectionId) => {
        selectionsOBJ[selectionId].id = selectionId;
        selections.push(selectionsOBJ[selectionId]);
      });
      resolve(selections);
    })
    .catch((error) => reject(error));
});

export default { getSelectionsByUID };
