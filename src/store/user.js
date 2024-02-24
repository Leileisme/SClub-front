/* eslint-disable vue/no-ref-as-operand */
// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

// 原本 app.js 預設是 元件，改為 setup
export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()

  const TOKEN = ref('')
  const EMAIL = ref('')
  const ROLE = ref('')
  const SCHOOL_NAME = ref('')
  const SCHOOL_CITY = ref('')
  const REAL_NAME = ref('')
  const USER_NAME = ref('')
  const NICK_NAME = ref('')
  const CLUB_TH = ref('')
  const CLUB_CATEGORY = ref('')
  const IMAGE = ref('')
  const TICKET_CART = ref([])
  const SCORES = ref('')
  const NOTIFY = ref([])
  const KEEP_POST = ref([])
  const KEEP_EVENT = ref([])
  const FANS = ref([])
  const FOLLOW = ref([])
  const IS_STUDENT = ref('')
  const IS_ABLE = ref('')
  const IS_ADMIN = ref('')
  const DESCRIBE = ref('')
  const CLUB_CORE_MEMBER = ref([])
  const _id = ref('')
  const MAKE_EVENTS_ID = ref([])

  const login = (data) => {
    if (data.TOKEN) {
      TOKEN.value = data.TOKEN
    }

    EMAIL.value = data.EMAIL
    ROLE.value = data.ROLE
    SCHOOL_NAME.value = data.SCHOOL_NAME
    SCHOOL_CITY.value = data.SCHOOL_CITY
    REAL_NAME.value = data.REAL_NAME
    USER_NAME.value = data.USER_NAME
    NICK_NAME.value = data.NICK_NAME
    CLUB_TH.value = data.CLUB_TH
    CLUB_CATEGORY.value = data.CLUB_CATEGORY
    IMAGE.value = data.IMAGE
    TICKET_CART.value = data.TICKET_CART
    SCORES.value = data.SCORES
    NOTIFY.value = data.NOTIFY
    KEEP_POST.value = data.KEEP_POST
    KEEP_EVENT.value = data.KEEP_EVENT
    FANS.value = data.FANS
    FOLLOW.value = data.FOLLOW
    IS_STUDENT.value = data.IS_STUDENT
    IS_ABLE.value = data.IS_ABLE
    IS_ADMIN.value = data.IS_ADMIN
    DESCRIBE.value = data.DESCRIBE
    CLUB_CORE_MEMBER.value = data.CLUB_CORE_MEMBER
    _id.value = data._id
    MAKE_EVENTS_ID.value = data.MAKE_EVENTS_ID
  }

  const isLogin = computed(() => {
    return TOKEN.value.length > 0
  })

  const isAdmin = computed(() => {
    return IS_ADMIN.value
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

  const logout = () => {
    TOKEN.value = ''
    EMAIL.value = ''
    ROLE.value = ''
    SCHOOL_NAME.value = ''
    SCHOOL_CITY.value = ''
    REAL_NAME.value = ''
    USER_NAME.value = ''
    NICK_NAME.value = ''
    CLUB_TH.value = ''
    CLUB_CATEGORY.value = ''
    IMAGE.value = ''
    TICKET_CART.value = ''
    SCORES.value = ''
    NOTIFY.value = ''
    KEEP_POST.value = ''
    KEEP_EVENT.value = ''
    FANS.value = ''
    FOLLOW.value = ''
    IS_STUDENT.value = ''
    IS_ABLE.value = ''
    IS_ADMIN.value = ''
    DESCRIBE.value = ''
    CLUB_CORE_MEMBER.value = ''
    _id.value = ''
    MAKE_EVENTS_ID.value = ''
  }

  return {
    TOKEN,
    EMAIL,
    ROLE,
    SCHOOL_NAME,
    SCHOOL_CITY,
    REAL_NAME,
    USER_NAME,
    NICK_NAME,
    CLUB_TH,
    CLUB_CATEGORY,
    IMAGE,
    TICKET_CART,
    SCORES,
    NOTIFY,
    KEEP_POST,
    KEEP_EVENT,
    FANS,
    FOLLOW,
    IS_STUDENT,
    IS_ABLE,
    IS_ADMIN,
    DESCRIBE,
    CLUB_CORE_MEMBER,
    _id,
    MAKE_EVENTS_ID,
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
