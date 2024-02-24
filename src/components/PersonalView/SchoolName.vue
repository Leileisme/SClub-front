<template>
  <v-col cols="12"  style=" font-size: 0.9rem;" :style="styles" >
    <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
      <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ routeUser.SCHOOL_NAME }}</span>
      <span>{{ routeUser.SCHOOL_CITY }}</span>
    </span>
  </v-col>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isNClubComputer: {
    type: Boolean,
    default: false,
    required: false
  },
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
  }
})

const styles = computed(() => {
  if (props.isNClubComputer) {
    return {
      'padding-top': '0rem'
    }
  } else {
    return {
      'padding-top': '0.6rem'
    }
  }
})

</script>

<style lang="sass" scoped>
</style>
