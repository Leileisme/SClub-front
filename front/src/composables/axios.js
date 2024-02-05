import axios from 'axios'
import { useUserStore } from '@/store/user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// 請求前的攔截器設定
// config 物件包含了請求的所有設定
// 將 JWT 加入到每一個請求的 Authorization 頭部，這樣就不需在每次發送請求時手動添加
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers = 'Bearer ' + user.TOKEN
  return config
})

export const useApi = () => {
  return { api, apiAuth }
}
