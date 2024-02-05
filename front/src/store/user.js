// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'

// 原本 app.js 預設是 元件，改為 setup
export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()

  const TOKEN = ref('')
  const EMAIL = ref('')
  const ROLE = ref('')

  console.log('TOKEN at startup:', TOKEN.value)

  const login = (data) => {
    console.log(data)

    if (data.TOKEN) {
      TOKEN.value = data.TOKEN
    }

    EMAIL.value = data.EMAIL
    ROLE.value = data.ROLE
  }

  const logout = () => {
    TOKEN.value = ''
    EMAIL.value = ''
    ROLE.value = ''
  }

  const isLogin = computed(() => {
    console.log(TOKEN.value.length)

    return TOKEN.value.length > 0
  })

  const isAdmin = computed(() => {
    return ROLE.value === UserRole.ADMIN
  })

  const getProfile = async () => {
    if (TOKEN.value.length === 0) return

    try {
      const { data } = await apiAuth.get('/users/profile')
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  return {
    TOKEN,
    EMAIL,
    ROLE,
    login,
    logout,
    isLogin,
    isAdmin,
    getProfile
  }
}, {
  // 儲存的設定
  persist: {
    // 本地儲存的 key
    key: 'projectWeb',
    // 應用程式關閉或瀏覽器刷新後，就不會自動登出
    paths: ['TOKEN']
  }
})
