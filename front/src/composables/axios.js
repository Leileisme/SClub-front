import axios from 'axios'
import { useUserStore } from '@/store/user'
import { date } from 'yup'

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
  config.headers.Authorization = 'Bearer ' + user.TOKEN
  return config
})

// 回應後的攔截器設定
// apiAuth.interceptors.response.use(成功時執行, 失敗時執行)
apiAuth.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response) {
    if (error.response.data.message === 'JWT 過期' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 更新 pinia 保存的 token
          // console.log(data.result)
          user.TOKEN = data.result
          error.config.headers.Authorization = 'Bearer ' + user.TOKEN
          // 重新傳送原請求
          // 會回傳一個包含錯誤資訊的 error 物件。這個 error 物件中的 config 屬性包含了原始請求的配置資訊。
          // 這種重試機制應該要有一個限制，以避免無限循環。(可研究2/5)
          return axios(error.config)
        })
        .catch(() => {
          user.logout()
          return Promise.reject(error)
        })
    }
  }
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
