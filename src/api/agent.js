import axios from 'axios'
import {toast} from "react-toastify"
import {STORAGE_KEY} from "../pages/account/accountSlice"

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))
axios.defaults.baseURL = process.env.REACT_APP_API_URL

const responseBody = (response) => response.data

axios.interceptors.request.use(config => {
    const token = localStorage.getItem(STORAGE_KEY)
    if (token && token !== '') config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep()
    return response
}, error => {
    const {data, status} = error.response
    switch (status) {
        case 400:
            toast.error(data.message)
            break
        case 401:
            toast.warn(data.message)
            break
        case 403:
            // toast.error("You are not authorized to perform this action")
            break
        case 500:
            // history.push('/server-error', data)
            break
        default:
            break
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url, params) => axios.get(url, {params}).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
}

const Account = {
    signin: (values) => requests.post('/auth/signin', values),
    signup: (values) => requests.post('/auth/signup', values),
    activate: (values) => requests.post('/auth/activate', values),
    changePassword: (values) => requests.post('/auth/password', values)
}

const User = {
    current: () => requests.get('/users/current'),
    findUser: (value) => requests.get(`/users?email=${value}`),
}

const Verification = {
    verify: () => requests.get('/verifications/link'),
    resetCode: (values) => requests.post('/verifications/code', values),
    validateCode: (values) => requests.post('/verifications/validate', values)
}

const agent = {
    Account, User, Verification
}

export default agent
