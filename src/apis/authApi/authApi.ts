import axios from 'axios';

const authApi = axios.create({
  baseURL: '34.64.63.137:3002',
  withCredentials: true,
});

export default authApi;
