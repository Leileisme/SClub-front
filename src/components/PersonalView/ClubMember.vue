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
import { computed, ref } from 'vue'
import UserRole from '@/enums/UserRole'

const clickCount = ref(0)

const clickCountValue = () => {
  clickCount.value++
}

const props = defineProps({
  routeUser: {
    type: Object,
    default: () => {
      return {
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
        MAKE_EVENTS_ID: ([])
      }
    }
  },
  routeEvent: {
    type: Array,
    default: () => []
  }
})

const changeText = computed(() => {
  return clickCount.value % 2 === 0 ? '幹部' : props.routeUser.IS_CORE_MEMBER[0].NICK_NAME + '  ' + props.routeUser.IS_CORE_MEMBER[0].CLUB_TH + 'th ' + props.routeUser.IS_CORE_MEMBER[0].ROLE
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

</style>
