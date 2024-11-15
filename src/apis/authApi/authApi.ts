import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://kdt-react-1-team01.elicecoding.com:3002',
  // withCredentials: true,
});

export default authApi;
