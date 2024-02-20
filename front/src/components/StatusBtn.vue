<template>
  <v-col cols="12" >
    <v-row>
        <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
          <template v-if="user.USER_NAME === routeUser.USER_NAME">
            <!-- 元件傳出一個觸發事件，並在這裡執行get的function -->
            <EditClub v-if="routeUser.ROLE === UserRole.CLUB"  @update-user="get"></EditClub>
            <v-btn  v-else color="#444" style="font-weight: 900; width: 100%;">編輯個人檔案</v-btn>
          </template>
          <v-btn v-else color="#1BBCA9" style="font-weight: 900; width: 100%;">追蹤</v-btn>
        </v-col>
        <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
          <v-btn v-if="user.USER_NAME === routeUser.USER_NAME" color="#444" style="font-weight: 900; width: 100%;"> {{ shearText }} </v-btn>
          <v-btn v-else color="#444" style="font-weight: 900; width: 100%;">發送訊息</v-btn>
        </v-col>
        <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
          <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">榮譽分數 {{routeUser.SCORES}} 分</v-btn>
        </v-col>
    </v-row>
  </v-col>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import UserRole from '@/enums/UserRole'
import EditClub from '@/components/EditClub.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const user = useUserStore()

const shearText = computed(() => {
  if (useRoute.ROLE === UserRole.CLUB) {
    return '分享社團檔案'
  } else {
    return '分享個人檔案'
  }
})

const routeUser = ref({
  EMAIL: (''),
  ROLE: (''),
  SCHOOL_NAME: (''),
  SCHOOL_CITY: (''),
  USER_NAME: (''),
  NICK_NAME: (''),
  CLUB_TH: (''),
  CLUB_CATEGORY: (''),
  IMAGE: (''),
  TICKET_CART: ([]),
  SCORES: (''),
  NOTIFY: ([]),
  KEEP_POST: ([]),
  KEEP_EVENT: ([]),
  FANS: ([]),
  FOLLOW: ([]),
  IS_STUDENT: (''),
  IS_ABLE: (''),
  IS_ADMIN: (''),
  DESCRIBE: (''),
  MAKE_EVENT: ([]),
  MAKE_POST: ([]),
  MAKE_TIME_POST: ([]),
  GO_EVENT: ([]),
  BE_MARK: ([]),
  IS_CORE_MEMBER: ([]),
  EVENTS_ID: ([])
})

const get = async () => {
  try {
    const { data } = await apiAuth.get('/users/' + route.params.USER_NAME)
    routeUser.value.EMAIL = data.result.EMAIL
    routeUser.value.ROLE = data.result.ROLE
    routeUser.value.SCHOOL_NAME = data.result.SCHOOL_NAME
    routeUser.value.SCHOOL_CITY = data.result.SCHOOL_CITY
    routeUser.value.USER_NAME = data.result.USER_NAME
    routeUser.value.NICK_NAME = data.result.NICK_NAME
    routeUser.value.CLUB_TH = data.result.CLUB_TH
    routeUser.value.CLUB_CATEGORY = data.result.CLUB_CATEGORY
    routeUser.value.IMAGE = data.result.IMAGE
    routeUser.value.TICKET_CART = data.result.TICKET_CART
    routeUser.value.SCORES = data.result.SCORES
    routeUser.value.NOTIFY = data.result.NOTIFY
    routeUser.value.KEEP_POST = data.result.KEEP_POST
    routeUser.value.KEEP_EVENT = data.result.KEEP_EVENT
    routeUser.value.FANS = data.result.FANS
    routeUser.value.FOLLOW = data.result.FOLLOW
    routeUser.value.IS_STUDENT = data.result.IS_STUDENT
    routeUser.value.IS_ABLE = data.result.IS_ABLE
    routeUser.value.IS_ADMIN = data.result.IS_ADMIN
    routeUser.value.DESCRIBE = data.result.DESCRIBE
    routeUser.value.MAKE_EVENT = data.result.MAKE_EVENT
    routeUser.value.MAKE_POST = data.result.MAKE_POST
    routeUser.value.MAKE_TIME_POST = data.result.MAKE_TIME_POST
    routeUser.value.GO_EVENT = data.result.GO_EVENT
    routeUser.value.BE_MARK = data.result.BE_MARK
    routeUser.value.IS_CORE_MEMBER = data.result.IS_CORE_MEMBER
    routeUser.value.EVENTS_ID = data.result.EVENTS_ID

    document.title = `學生社團 | ${routeUser.value.NICK_NAME}（${routeUser.value.USER_NAME}）`
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
    router.push('/')
  }
}

onMounted(
  () => { get() }
)
</script>

<style lang="sass" scoped>
</style>
