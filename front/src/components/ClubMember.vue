<template>

  <!-- 幹部職位 / 畢業生 -->
  <v-col cols="12" style="padding-top:1px ;"  v-if="routeUser.ROLE === UserRole.STUDENT ">
    <v-btn v-if="routeUser.IS_CORE_MEMBER" type="button" style="background-color:#FF9900; height: auto; padding-top: 3px; padding-bottom:3px;" @click="clickCountValue">{{ changeText }}</v-btn>
    <v-btn v-else type="button" style="background-color:#444; height: auto; padding-top: 3px; padding-bottom:3px;">無社團</v-btn>
  </v-col>

  <v-col cols="12" style="padding-top:1px ;"  v-if="routeUser.ROLE === UserRole.NOT_STUDENT ">
            <v-btn type="button" style="background-color:#444; height: auto; padding-top: 3px; padding-bottom:3px;" >畢業生</v-btn>
  </v-col>

    <!-- <v-col cols="12" style="padding-top:1px ;"  v-if="routeUser.ROLE === UserRole.STUDENT ">
    <v-btn v-if="routeUser.IS_CORE_MEMBER" type="button" style="background-color:#FF9900; height: auto; padding-top: 3px; padding-bottom:3px;">
      幹部
      <v-tooltip
        activator="parent"
        location="start"
        style="color: red;"
        class="custom-tooltip"
      >{{routeUser.IS_CORE_MEMBER[0].NICK_NAME}} {{ routeUser.IS_CORE_MEMBER[0].ROLE }}</v-tooltip>
    </v-btn>
    <v-btn v-else type="button" style="background-color:#444; height: auto; padding-top: 3px; padding-bottom:3px;">無社團</v-btn>
  </v-col> -->

</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import UserRole from '@/enums/UserRole'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()

const clickCount = ref(0)

const changeText = computed(() => {
  return clickCount.value % 2 === 0 ? '幹部' : routeUser.value.IS_CORE_MEMBER[0].NICK_NAME + '  ' + routeUser.value.IS_CORE_MEMBER[0].CLUB_TH + 'th ' + routeUser.value.IS_CORE_MEMBER[0].ROLE
})

const clickCountValue = () => {
  clickCount.value++
}

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
  IS_CORE_MEMBER: ([])
})

onMounted(async () => {
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
})

console.log(routeUser.value, 'routeUser.value.IS_CORE_MEMBER')

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

</style>
