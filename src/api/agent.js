import axios from 'axios'
import {store} from "../store/store"

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const responseBody = (response) => response.data

axios.interceptors.request.use(config => {
    const account = store.getState().account.user
    const token = account?.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep()
    return response
}, error => {
    const {data, status} = error.response
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors = []
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
            // toast.error(data.title)
            break
        case 401:
            // toast.warn(data.title)
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
    signin: (values) =>requests.post('/auth/signin', values),
    // signup: (values) =>requests.post('/', values),
}

const agent = {
    Account
}

export default agent
