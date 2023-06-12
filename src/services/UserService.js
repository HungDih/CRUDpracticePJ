import axios from "../services/CustomizeAxios";

function fetchAllUser(page) {
  return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name, job) {
  return axios.post(`/api/users`, { name, job });
}

function putUpdateUser(name, job) {
  return axios.put(`/api/users/`, { name, job });
}

function deleteUser(id) {
  return axios.delete(`/api/users/${id}`);
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };
