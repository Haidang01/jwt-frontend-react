import axios from "axios";


const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}
const fetchAllRole = () => {
    return axios.get(`/api/v1/role/read`)
}
const DeleteRole = (id) => {
    return axios.delete('/api/v1/role/delete', { data: { id } })
}
export {
    createRoles, fetchAllRole, DeleteRole
}