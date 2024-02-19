<template>
  <v-col cols="12">
    <v-row v-if="routeUser.ROLE === UserRole.CLUB">
      <v-col cols="4" style="background-color: ;"></v-col>
        <!-- 貼文 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FANS.length}}</v-col>
          <v-col cols="12" style="padding: 0;">貼文</v-col>
        </v-row>
      </v-col>
      <!-- 活動 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FANS.length}}</v-col>
          <v-col cols="12" style="padding: 0;">活動</v-col>
        </v-row>
      </v-col>
      <!-- 粉絲 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FANS.length}}</v-col>
          <v-col cols="12" style="padding: 0;">粉絲</v-col>
        </v-row>
      </v-col>
      <!-- 追蹤 -->
      <v-col cols="2" style="background-color:;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FOLLOW.length}}</v-col>
          <v-col cols="12" style="padding: 0;">追蹤</v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="8" style="background-color: ;"></v-col>
      <!-- 粉絲 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FANS.length}}</v-col>
          <v-col cols="12" style="padding: 0;">粉絲</v-col>
        </v-row>
      </v-col>
      <!-- 追蹤 -->
      <v-col cols="2" style="background-color:;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.FOLLOW.length}}</v-col>
          <v-col cols="12" style="padding: 0;">追蹤</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
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
</script>

<style lang="sass" scoped>
</style>
