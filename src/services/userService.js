
import axios from '../setup/axios';
const RegisterNewUser = (email, phone, username, password) => {
    return axios.post('/api/v1/register', {
        email, phone, username, password
    })
}
const LoginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}
const fetchAllUser = (currentPage, currentLimit) => {
    return axios.get(`/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`)
}
const DeleteUser = (id) => {
    return axios.delete('/api/v1/user/delete', { data: { id } })
}
const fetchGroup = () => {
    return axios.get('/api/v1/group/read')
}
const CreateNewUser = (data) => {
    console.log(data);
    return axios.post('/api/v1/user/create', { ...data })
}
const updateCurrentUser = (userData) => {
    return axios.put('/api/v1/user/update', { ...userData })
}
const getUserAccount = () => {
    return axios.get('/api/v1/account')
}
const logoutUser = () => {
    return axios.post('/api/v1/logout')
}

export {
    RegisterNewUser,
    LoginUser,
    fetchAllUser,
    DeleteUser,
    fetchGroup,
    CreateNewUser,
    updateCurrentUser,
    getUserAccount,
    logoutUser
}