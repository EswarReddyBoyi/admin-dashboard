import axios from "axios";

const API = "http://localhost:5000/api/admin";

export class AdminService {
  getStats() {
    return axios.get(`${API}/stats`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
  }
}
