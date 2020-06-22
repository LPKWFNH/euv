import axios from 'axios';
export default {
    xhr(config) {
        if (config.method) {
            config.method = this.getMethodType(config.method);
            switch (config.method) {
                case "GET": this.handleGet();break;
                case "POST": this.handlePost();break;
                default: console.log("ERR:METHOD MISMATCH");return ;
            }
        } else {
            console.log("ERR:METHOD NULL");
            return ;
        }
        const $axios = axios.create({
            baseURL: "http://127.0.0.1:6789"
        });
        return $axios.request(config);
    },
    getMethodType(method) {
        let $method = method.replace(/\s*/g,"").toLocaleUpperCase();
        let methodType = ["GET", "DELETE", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "LINK", "UNLINK"];
        if (methodType.includes($method)) {
            return $method;
        } else {
            console.log("ERR:METHOD");
            return false;
        }
    },
    handleGet() {},
    handlePost() {},
}