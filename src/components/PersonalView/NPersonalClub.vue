<template>
  <template v-if="isXs">
    <v-container >
      <v-row class="box" style="background-color: ;padding-top: 1rem;">
        <!-- 【左】大頭照 -->
            <v-col cols="4" class="d-flex justify-center" style="padding-top: 1.2rem;">
            <v-avatar size="100%"  >
              <v-img  :src="routeUser.IMAGE"></v-img>
            </v-avatar>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">
          <v-row>
            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; " >
                <span class="me-3" >{{ routeUser.NICK_NAME }}</span>
            </v-col>
            <!-- 學校 -->
            <SchoolName :routeUser="routeUser"></SchoolName>

            <!-- 幹部職位 / 畢業生 -->
            <ClubMember :routeUser="routeUser"></ClubMember>

            <!-- 簡介-->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <!-- 粉絲 -->
            <FollowNumber :routeUser="routeUser"></FollowNumber>
          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <StatusBtn :routeUser="routeUser"></StatusBtn>

        <!-- 限時動態 -->
        <TimePost :routeUser="routeUser"></TimePost>

        <!-- 分隔線 -->
        <BlankLine ></BlankLine>

        <!-- 活動紀錄 -->
        <PostEvent :routeUser="routeUser" :routeEvent="routeEvent"></PostEvent>

      </v-row>

    </v-container>
  </template>

  <!-- 電腦版 -->
  <template v-else>
    <div style="height: auto; border: #1BBCA9 0px solid; padding: 3rem; " >
        <v-container style="max-width: 800px;">
          <v-row class="box" style="background-color: ;padding-top: 1rem;">
          <!-- 【左】大頭照 -->
          <v-col cols="4" style="border: 0px solid ;" >
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <v-avatar size="100%" style="margin-top:0;" >
                  <v-img  :src="routeUser.IMAGE"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-col>

          <!-- 【右】個人資料 -->
          <v-col cols="8">
            <v-row>
              <!-- 使用者名稱 -->
              <v-col cols="12" style="font-size: 1.6rem; padding-bottom: 0;color: #25ECE0;"> {{routeUser.USER_NAME}}</v-col>
              <!-- 暱稱 -->
              <v-col cols="8" style="font-size: 1.1rem; padding-bottom: 0; " >
                  <span class="me-3" >{{ routeUser.NICK_NAME }} </span>
              </v-col>
                  <!-- 建立動態/設定 -->
                  <v-col cols="4" class="d-flex justify-end" >
                    <v-icon v-if="routeUser.USER_NAME === user.USER_NAME" class="me-3" style="cursor: pointer;" id="post">mdi-plus-box-outline</v-icon>
                    <v-menu v-if="routeUser.USER_NAME === user.USER_NAME" activator="#post" width="150" style="text-align: center;">
                      <v-list>
                        <AddMenu></AddMenu>
                      </v-list>
                    </v-menu>
                    <v-icon class="me-3" style="cursor: pointer;" id="setting">mdi-menu</v-icon>
                    <v-menu activator="#setting" width="150" style="text-align: center;" >
                      <v-list>
                        <SettingsMenu v-if="routeUser.USER_NAME === user.USER_NAME"></SettingsMenu>
                        <SettingsMenuOther v-else></SettingsMenuOther>
                      </v-list>
                    </v-menu>
                  </v-col>

              <!-- 學校 -->
              <SchoolName isNClubComputer :routeUser="routeUser"></SchoolName>

              <!-- 幹部職位 / 畢業生 -->
              <ClubMember :routeUser="routeUser"></ClubMember>
              <!-- 簡介 -->
              <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

              <!-- 粉絲 -->
              <FollowNumber :routeUser="routeUser"></FollowNumber>
            </v-row>
          </v-col>

          <!-- 編輯/分享/分數 狀態按鈕 -->
          <StatusBtn :routeUser="routeUser"></StatusBtn>

          <!-- 限時動態 -->
          <TimePost :routeUser="routeUser"></TimePost>

          <!-- 分隔線 -->
          <BlankLine></BlankLine>

          <!-- 活動紀錄 -->
          <PostEvent :routeUser="routeUser" :routeEvent="routeEvent"></PostEvent>
        </v-row>
      </v-container>
    </div>
  </template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, inject } from 'vue'
import { useUserStore } from '@/store/user'
import SettingsMenu from '@/components/PersonalView/SettingsMenu.vue'
import ClubMember from '@/components/PersonalView/ClubMember.vue'
import AddMenu from '@/components/AddMenu.vue'
import SettingsMenuOther from '@/components/PersonalView/SettingsMenuOther.vue'
import FollowNumber from '@/components/PersonalView/FollowNumber.vue'
import StatusBtn from '@/components/PersonalView/StatusBtn.vue'
import PostEvent from '@/components/PersonalView/PostEvent.vue'
import TimePost from '@/components/TimePost.vue'
import SchoolName from '@/components/PersonalView/SchoolName.vue'
import BlankLine from '@/components/BlankLine.vue'

const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

// 分享網址，但是樣式不好看先留著沒用
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Check out this website:',
      url: window.location.href
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
  } else {
    console.log('Web Share API is not supported in your browser.')
  }
}
const routeUser = inject('routeUser')
const routeEvent = inject('routeEvent')

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
//   },
//   routeEvent: {
//     type: Array,
//     default: () => []
//   }
// })


</script>

<style lang="sass" scoped>
</style>
