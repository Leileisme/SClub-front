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
            <ClubMember></ClubMember>

            <!-- 簡介-->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <!-- 粉絲 -->
            <FollowNumber></FollowNumber>
          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <StatusBtn :routeUser="routeUser"></StatusBtn>

        <!-- 限時動態 -->
        <TimePost :routeUser="routeUser"></TimePost>

        <!-- 分隔線 -->
        <PersonalLine></PersonalLine>

        <!-- 活動紀錄 -->
        <PostEvent :routeUser="routeUser" :routeEvent="props.routeEvent"></PostEvent>

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
              <ClubMember></ClubMember>
              <!-- 簡介 -->
              <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

              <!-- 粉絲 -->
              <FollowNumber></FollowNumber>
            </v-row>
          </v-col>

          <!-- 編輯/分享/分數 狀態按鈕 -->
          <StatusBtn :routeUser="routeUser"></StatusBtn>

          <!-- 限時動態 -->
          <TimePost :routeUser="routeUser"></TimePost>

          <!-- 分隔線 -->
          <PersonalLine></PersonalLine>

          <!-- 活動紀錄 -->
          <PostEvent :routeUser="routeUser" :routeEvent="props.routeEvent"></PostEvent>
        </v-row>
      </v-container>
    </div>
  </template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import UserRole from '@/enums/UserRole'
import SettingsMenu from '@/components/SettingsMenu.vue'
import ClubMember from '@/components/ClubMember.vue'
import AddMenu from '@/components/AddMenu.vue'
import SettingsMenuOther from '@/components/SettingsMenuOther.vue'
import FollowNumber from '@/components/FollowNumber.vue'
import StatusBtn from '@/components/StatusBtn.vue'
import PostEvent from '@/components/PostEvent.vue'
import TimePost from '@/components/TimePost.vue'
import SchoolName from '@/components/SchoolName.vue'
import PersonalLine from '@/components/PersonalLine.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
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

const emit = defineEmits(['updateUser'])
const get = () => {
  emit('updateUser')
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
        EVENTS_ID: ([])
      }
    }
  },
  routeEvent: {
    type: Array,
    default: () => []
  }
})

</script>

<style lang="sass" scoped>
</style>
