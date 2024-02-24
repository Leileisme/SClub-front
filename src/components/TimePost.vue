<template>
  <v-col v-if="routeUser.USER_NAME === user.USER_NAME || routeUser.MAKE_EVENT.length !== 0" cols="12" >
    <v-row >
      <!-- 每一個小圖 -->
      <v-col :cols="cols"  class="text-center">
        <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
          <v-icon style="font-size: 3.8rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
        </v-btn>
        <div class="mt-3" style="color:#ccc;"  >新增</div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const cols = computed(() => {
  if (isXs.value) {
    return 3
  } else {
    return 2
  }
})

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
  }
})
</script>

<style lang="sass" scoped>
</style>
