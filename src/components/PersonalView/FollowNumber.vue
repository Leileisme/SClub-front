<template>
  <v-col cols="12">
    <v-row v-if="routeUser.ROLE === UserRole.CLUB">
      <v-col cols="4" style="background-color: ;"></v-col>
        <!-- 貼文 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.MAKE_POST.length}}</v-col>
          <v-col cols="12" style="padding: 0;">貼文</v-col>
        </v-row>
      </v-col>
      <!-- 活動 -->
      <v-col cols="2" style="background: ;">
        <v-row class="text-center">
          <v-col cols="12" style="padding: 0;">{{routeUser.MAKE_EVENTS_ID.length}}</v-col>
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
import UserRole from '@/enums/UserRole'

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
