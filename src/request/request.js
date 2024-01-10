import axios from "axios";
import qs from "qs";
import {ElMessage} from "element-plus";

axios.defaults.baseURL = '/api/'  //测试

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
//允许跨域携带cookie信息
axios.defaults.withCredentials = true;
//设置超时
axios.defaults.timeout = 20000;

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        console.log(response)
        if (response.status === 200) {
            return Promise.resolve(response);
        }
    },
    error => {
        ElMessage.error('错误信息，请稍后再试试！')
    }
);
export default {
    /**
     * @param {String} url
     * @param {Object} data
     * @returns Promise
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: qs.stringify(data),
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};