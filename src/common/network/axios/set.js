import axios from 'axios';

axios.defaults.baseURL = null;
axios.defaults.transformRequest = data => {};
axios.defaults.transformResponse = data => {};
axios.defaults.headers = {'Content-Type': 'text/html; charset=utf-8'};

axios.defaults.method = "GET";
axios.defaults.params = {};

axios.defaults.method = "POST";
axios.defaults.data = {};

axios.defaults.paramsSerializer = params => {};
axios.defaults.timeout = 1000;
axios.defaults.withCredentials = false;
axios.defaults.adapter = () => {};
axios.defaults.auth = null;
axios.defaults.responseType = "json";

const axiosInstance = axios.create({
    baseURL: null,
    method: 'GET',
    params: {}
});
axiosInstance.defaults.timeout = 1000;
const axiosInstanceX = axios.create({
    baseURL: null,
    method: 'POST',
    data: {}
})
axiosInstance({
    url: null,
})
axiosInstanceX({
    url: null,
})