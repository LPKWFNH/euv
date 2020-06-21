import axios from 'axios';

const request = (config) => {
    const axiosInstance = axios.create({
        baseURL: null,
    });
    axiosInstance(config.baseConfig)
        .then(res => config.success(res))
        .catch(err => config.failure(err))
}
request({
    baseConfig: {},
    success: (res) => {},
    failure: (err) => {}
});

const requestLv2 = (config) => {
    return new Promise((resolve, reject) => {
        const axiosInstance = axios.create({
            baseURL: null,
        });
        axiosInstance(config.baseConfig)
            .then(res => resolve(res))
            .catch(err => reject(err));
    })
}
requestLv2({
    baseConfig: {},
}).then(res => {}).catch(err => {});

const requestLv3 = (config) => {
    const axiosInstance = axios.create({
        baseURL: null,
    });
    return axiosInstance(config.baseConfig);
}

const requestPro = (config) => {
    const axiosInstance = axios.create({
        baseURL: null,
    });

    axiosInstance.interceptors.request.use(
        config => {
            console.log(config);
            /*token*/
            return config;
        },
        err => {
            console.log(err);
        },
    );

    axiosInstance.interceptors.response.use(
        res => {
            console.log(res.data);
            /*错误码处理*/
            return res.data;
        },
        err => {
            console.log(err);
        },
    )

    return axiosInstance(config.baseConfig);
}