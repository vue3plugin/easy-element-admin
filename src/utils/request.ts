
import { createAxios, type HowAxiosRequestConfig } from "howuse/axios"
import { AUTHORIZATION } from './const';
import router from "@/router";
import { PageEnum } from "@/enums/page";


export interface DefResult<T> {
  msg: string,
  data: T,
  code: 0 | 1
}

export const httpStatus: { [index: string]: string } = {
  400: "请求错误(400)",
  401: "未授权，请重新登录(401)",
  403: "拒绝访问(403)",
  404: "请求出错(404)",
  408: "请求超时(408)",
  500: "服务器错误(500)",
  501: "服务未实现(501)",
  502: "网络错误(502)",
  503: "服务不可用(503)",
  504: "网络超时(504)",
  505: "HTTP版本不受支持(505)",
};

export const { useAxiosRequest, useBlobDownload, server } = createAxios({
  baseURL: "/",
  timeout: 0
});

// 请求拦截器
server.interceptors.request.use(
  config => {
    const token = import.meta.env.DEV ? import.meta.env.VITE_APP_AUTH_TOEKN || sessionStorage.getItem(AUTHORIZATION) : sessionStorage.getItem(AUTHORIZATION)
    if (!token) {
      console.warn("token获取失败...")
    }
    if (config.headers) {
      config.headers[AUTHORIZATION] = `Bearer ${token}`
    }
  },
  (error) => {
    return Promise.reject(error);
  });

// 响应拦截器 适合做一些不影响数据结构的操作，例如token失效返回登录页面等
server.interceptors.response.use(
  (response) => {
    // return response.data
    // 网上许多示例将此处直接设置为 response.data ，一定程度上影响未来响应头的获取，一旦需要使用响应头时，变得异常困难
    // 正确的方式应该是将响应的server二次封装
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // 跳转到登录页面
      router.push(PageEnum.BASE_LOGIN)
    } else {
      ElMessage.error(httpStatus[error.response.status]);
    }
    return Promise.reject(error);
  }
)

export function useDefAxiosRequest<T>(config: HowAxiosRequestConfig) {
  return useAxiosRequest<DefResult<T>>(config)
}
