import axios from "../services/CustomizeAxios";

function fetchAllUser(page) {
  return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name, job) {
  return axios.post(`/api/users`, { name, job });
}

export { fetchAllUser, postCreateUser };
