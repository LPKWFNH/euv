import axios from 'axios';
import uuid from 'uuid';
export default {
    xhr(config) {
        config = this.buildConfig(config);
        if (!config) return ;
        const $axios = axios.create({
            baseURL: "http://127.0.0.1:6789"
        });
        $axios.interceptors.request.use(
            config => {
                config.headers.Authorization = "Authorization";
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        )
        $axios.interceptors.response.use(
            res => {
                return res;
            },
            err => {
                return Promise.reject(err);
            }
        );
        return $axios.request(config)
            .then(res => {config.success(res)})
            .catch(err => {config.failure(err)});
    },
    getMethod(method) {
        let $method = method.replace(/\s*/g,"").toLocaleUpperCase();
        let methodType = ["GET", "DELETE", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "LINK", "UNLINK"];
        if (!methodType.includes($method)) {
            console.error("METHOD NOT MATCH [GET|DELETE|HEAD|OPTIONS|POST|PUT|PATCH|LINK|UNLINK]");
            return false;
        }
        return $method;
    },
    buildConfig(config) {
        if (!config) {console.error("XHR CONFIG CAN'T NOT BE NULL");return false;}
        if (!config.url) {console.error("URL CAN'T NOT BE NULL");return false;}
        if (!config.method) {console.error("URL CAN'T NOT BE NULL");return false;}
        let method = this.getMethod(config.method);
        if (!method) return false;
        if (method === "GET" && config.data) {
            config.param = config.data;
            delete config.data;
        }
        if (method=== "POST" && config.data) {
            let content = config.data;
            config.data = {
                header: {
                    time: new Date(),
                    uuid: uuid.v4(),
                },
                content
            }
        }
        if (!config.success) {config.success = res => {};}
        if (!config.failure) {config.failure = err => this.defaultFailure(err);}
        return config;
    },
    defaultFailure(err) {
        let errDesc = {code: null, desc: null}
        if (!err.response) {console.error("SERVICE EXCEPTION")}
        if (err.response.status && err.response.status !== 200) {
            errDesc.code = err.response.status;
            errDesc.desc = 'HTTP ERROR!STATUS CODE:' + errDesc.code;
        }
        if (err.response.data) {
            errDesc.code = err.response.data;
            errDesc.desc = err.response.data;
        }
        console.error(errDesc.desc);
    }
}