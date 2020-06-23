import axios from 'axios';
export default {
    xhr(config) {
        config = this.buildConfig(config);
        if (!config) return ;
        const $axios = axios.create({
            baseURL: "http://127.0.0.1:6789"
        });
        $axios.interceptors.request.use(
            config => {
                console.log(config);
            },
            err => {
                console.log(err);
                return Promise.reject(err);
            }
        )
        $axios.interceptors.response.use(
            res => {
                console.log(res);
                return res;
            },
            err => {
                console.log(err);
                return Promise.reject(err);
            }
        );
        return $axios.request(config).then(res => {config.success(res)}).catch(err => {config.failure(err)});
    },
    getMethod(method) {
        let $method = method.replace(/\s*/g,"").toLocaleUpperCase();
        let methodType = ["GET", "DELETE", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "LINK", "UNLINK"];
        if (!method) {
            console.error("METHOD CAN'T NOT BE EMPTY");
            return false;
        }
        if (!methodType.includes($method)) {
            console.error("METHOD:[GET|DELETE|HEAD|OPTIONS|POST|PUT|PATCH|LINK|UNLINK]");
            return false;
        }
        return $method;
    },
    buildGetConfig(config) {
        if (config.data) {
            config.params = config.data;
            config.data = null;
        } else {
            config.params = {};
        }
        config.params.token = "token";
        return config;
    },
    buildPostConfig(config) {
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.Authorization = "Authorization";
        return config;
    },
    buildConfig(config) {
        if (!config) {
            console.log("XHR CONFIG CAN'T NOT BE EMPTY");
            return false;
        }
        let $method = this.getMethod(config.method);
        if (!$method) return false;
        config.method = $method;
        switch (config.method) {
            case "GET": config = this.buildGetConfig(config);break;
            case "POST": config = this.buildPostConfig(config);break;
        }
        if (!config.success) {
            config.success = res => {
                console.log(res);
            };
        }
        if (!config.failure) {
            config.failure = err => {
                console.log(err);
            };
        }
        return config;
    }
}