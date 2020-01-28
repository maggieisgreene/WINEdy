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

const deleteSelection = (selectionID) => axios.delete(`${baseURL}/selections/${selectionID}.json`);

const saveSelection = (newSelection) => axios.post(`${baseURL}/selections.json`, newSelection);

export default { getSelectionsByUID, deleteSelection, saveSelection };
