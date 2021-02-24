import axios from 'axios';
const instance = axios.create({
  baseURL:"https://create-my-burger-6828d.firebaseio.com/"
});

export default instance;