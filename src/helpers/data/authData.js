import firebase from 'firebase/app';
import 'firebase/auth';

const getUID = () => firebase.auth().currentUser.uid;

export default { getUID };
