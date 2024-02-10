import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

export default {
  setup () {
    const router = useRouter()
    const user = useUserStore()
    const { createSnackbar } = useSnackbar()
    const { apiAuth } = useApi()

    //  登出
    const logout = async () => {
      try {
        await apiAuth.delete('/users/logout')
        user.logout()
        createSnackbar({
          text: '登出成功',
          showCloseButton: false,
          snackbarProps: {
            timeout: 2000,
            color: 'green',
            location: 'bottom'
          }
        })

        router.push('/')
      } catch (error) {
        console.log(error)
        const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
        createSnackbar({
          text,
          showCloseButton: false,
          snackbarProps: {
            timeout: 2000,
            color: 'red',
            location: 'bottom'
          }
        })
      }
    }

    return { logout }
  }
}
