<template>
  <v-col cols="12" >
    <v-row>
        <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
          <template v-if="user.USER_NAME === routeUser.USER_NAME">
            <!-- 元件傳出一個觸發事件，並在這裡執行get的function -->
            <EditClub v-if="routeUser.ROLE === UserRole.CLUB" :routeUser="routeUser"></EditClub>
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
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

import UserRole from '@/enums/UserRole'
import EditClub from '@/components/PersonalView/EditClub.vue'

const user = useUserStore()

const shearText = computed(() => {
  if (useRoute.ROLE === UserRole.CLUB) {
    return '分享社團檔案'
  } else {
    return '分享個人檔案'
  }
})

// const props = defineProps({
//   routeUser: {
//     type: Object,
//     default: () => {
//       return {
//         EMAIL: (''),
//         ROLE: (''),
//         SCHOOL_NAME: (''),
//         SCHOOL_CITY: (''),
//         USER_NAME: (''),
//         NICK_NAME: (''),
//         CLUB_TH: (''),
//         CLUB_CATEGORY: (''),
//         IMAGE: (''),
//         TICKET_CART: ([]),
//         SCORES: (''),
//         NOTIFY: ([]),
//         KEEP_POST: ([]),
//         KEEP_EVENT: ([]),
//         FANS: ([]),
//         FOLLOW: ([]),
//         IS_STUDENT: (''),
//         IS_ABLE: (''),
//         IS_ADMIN: (''),
//         DESCRIBE: (''),
//         MAKE_EVENT: ([]),
//         MAKE_POST: ([]),
//         MAKE_TIME_POST: ([]),
//         GO_EVENT: ([]),
//         BE_MARK: ([]),
//         IS_CORE_MEMBER: ([]),
//         MAKE_EVENTS_ID: ([])
//       }
//     }
//   }
// })
const routeUser = inject('routeUser')
const routeEvent = inject('routeEvent')

</script>

<style lang="sass" scoped>
</style>
