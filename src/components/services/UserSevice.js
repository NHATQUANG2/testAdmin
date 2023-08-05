import axios from "../services/axios";

const getUser = (page) => {
    return axios.get(`/test?page=${page}`)
}
const postAddNewUser = (name, email, password) => {
    return axios.post("/test", { name, email, password })
}
const putEditUser = (id, name) => {
    return axios.put(`/test/${id}`, { name })
}
const deleteUser = (id) => {
    return axios.delete(`/test/${id}`)
}
export { getUser, postAddNewUser, putEditUser, deleteUser }