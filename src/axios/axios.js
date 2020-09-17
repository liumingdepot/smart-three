import axios from 'axios';
import {baseURL, baseURL2} from './config';
import {Loading,Message} from 'element-ui';
let load;
export default function $axios(options) {
    const url = options.type ? baseURL2 : baseURL
    return new Promise((resolve, reject) => {
        if(options.load){
            console.log(options.load)
        }else{
            load = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        //初始化
        const instance = axios.create({
            baseURL: url,
            timeout: 1000000,
            withCredentials: true,
            responseType: 'json'
        })

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                return config
            },

            error => {
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        )

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                return response.data
            },
            err => {
                return Promise.reject(err)
            }
        )

        // 请求处理
        instance(options).then(res => {
            resolve(res)
            if(load){
                load.close();
            }
            return false
        }).catch(error => {
            if(load){
                load.close();
            }
            Message.error('服务器错误')
            reject(error)
        })
    })
}
