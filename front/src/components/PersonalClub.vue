<template>
  <template v-if="isXs">
    <v-container >
      <v-row class="box" style="background-color: ;padding-top: 1rem;">
        <!-- 【左】大頭照 -->
            <v-col cols="4" class="d-flex justify-center" style="padding-top:1.2rem">
            <v-avatar size="100%" style="margin-top: ;" >
              <v-img  :src="routeUser.IMAGE"></v-img>
            </v-avatar>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">
          <v-row>
            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; " >
                <!-- 社團名稱/屆數/成員 -->
                <span class="me-3" >{{ routeUser.NICK_NAME }}</span>
                <span class="me-3" style="font-size: 1.05rem;">第{{ routeUser.CLUB_TH }}屆</span>
                <span>
                  <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                </span>
            </v-col>

            <!-- 學校 -->
            <SchoolName></SchoolName>

            <!-- 簡介 -->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <!-- 粉絲 / 貼文 -->
            <FollowNumber ></FollowNumber>

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <StatusBtn></StatusBtn>

        <!-- 分隔線 -->
        <PersonalLine></PersonalLine>

        <!-- 限時動態 -->
        <TimePost></TimePost>

        <!-- 貼文 / 活動紀錄 -->
        <PostEvent></PostEvent>
      </v-row>
    </v-container>
  </template>

  <!-- 電腦版 -->
  <template v-else>
    <div style="height: auto; border: #1BBCA9 0px solid; padding: 3rem; " >
      <v-container style="max-width: 800px;">
        <v-row class="box" style="background-color: ">
          <!-- 【左】大頭照 -->
          <v-col cols="4" style="border: 0px solid ;" >
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
              <v-avatar size="100%"  >
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
              <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; padding-top: 0.5rem;" >
                <v-row>
                  <v-col cols="8">
                    <!-- 社團名稱/屆數/成員 -->
                    <span class="me-3" >{{ routeUser.NICK_NAME }}</span>
                    <span class="me-3" style="font-size: 1.05rem;">第{{ routeUser.CLUB_TH }}屆</span>
                    <span>
                      <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                    </span>
                  </v-col>
                  <!-- 建立動態/設定 -->
                  <v-col cols="4" class="d-flex justify-end" >
                    <v-icon  v-if="routeUser.USER_NAME === user.USER_NAME" class="me-3" style="cursor: pointer;" id="post">mdi-plus-box-outline</v-icon>
                    <v-menu  v-if="routeUser.USER_NAME === user.USER_NAME" activator="#post" width="150" style="text-align: center;">
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
                </v-row>
              </v-col>

              <!-- 學校 -->
              <SchoolName></SchoolName>

              <!-- 描述 -->
              <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>
              <!-- 粉絲 / 貼文 -->
              <FollowNumber></FollowNumber>
            </v-row>
          </v-col>

          <!-- 編輯/分享/分數 狀態按鈕 -->
            <StatusBtn></StatusBtn>

          <!-- 分隔線 -->
          <PersonalLine></PersonalLine>

          <!-- 限時動態 -->
        <TimePost></TimePost>

        <!-- 貼文 / 活動紀錄 -->
        <PostEvent></PostEvent>
        </v-row>
      </v-container>
    </div>
  </template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import UserRole from '@/enums/UserRole'
import SettingsMenu from '@/components/SettingsMenu.vue'
import AddEvent from '@/components/AddEvent.vue'
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
const tab = ref('')

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
