import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user';
import router from '@/router';

// 创建 axios 实例
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
});

// axios 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios 响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage.error({
    message: e.response.data.msg
  })

  // 401 状态码处理
  const userStore = useUserStore()

  if (e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login').then()
  }

  return Promise.reject(e)
})

export default httpInstance
