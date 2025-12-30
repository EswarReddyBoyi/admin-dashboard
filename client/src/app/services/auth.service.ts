import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export class AuthService {

  login(data: any) {
    return axios.post(`${API}/login`, data);
  }

  register(data: any) {
    return axios.post(`${API}/register`, data);
  }
}
