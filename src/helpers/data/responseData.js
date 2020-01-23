import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const saveResponse = (newResponse) => axios.post(`${baseURL}/responses.json`, newResponse);

export default { saveResponse };
