<template>
  <template v-if="isXs">
    <v-container >
      <v-row class="box" style="background-color: ;padding-top: 1rem;">
        <!-- 【左】大頭照 -->
        <v-col cols="4" style="border: 0px solid ;" >
          <v-row>
            <!-- <v-col cols="12" ></v-col> -->
            <v-col cols="12" class="d-flex justify-center">
            <v-avatar size="100%" style="margin-top: 0.8rem;" >
              <v-img  :src="routeUser.IMAGE"></v-img>
            </v-avatar>
          </v-col>
          </v-row>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">

          <v-row>

            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; " >
                <span class="me-3" >{{ routeUser.NICK_NAME }}</span>
            </v-col>

            <!-- 學校 -->
            <v-col cols="12"  style=" font-size: 0.9rem; padding-top: 0.6rem;"  >
              <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ routeUser.SCHOOL_NAME }}</span>
                <span>{{ routeUser.SCHOOL_CITY }}</span>
              </span>
            </v-col>

            <!-- 新增社團按鈕 /  若有幹部則顯示幹部職位-->
            <v-col cols="12" style="padding-top:1px ;">
              <v-btn type="button" style="background-color:#444; height: auto; padding-top: 3px; padding-bottom:3px;" > 無社團</v-btn>
            </v-col>

            <!-- 簡介 (最多39字)-->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <v-col cols="12" >
              <v-row>
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

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <v-col cols="12" >
          <v-row>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn v-if="user.USER_NAME === routeUser.USER_NAME" color="#444" style="font-weight: 900; width: 100%;">編輯個人檔案</v-btn>
              <v-btn v-else color="#1BBCA9" style="font-weight: 900; width: 100%;">追蹤</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn v-if="user.USER_NAME === routeUser.USER_NAME" color="#444" style="font-weight: 900; width: 100%;">分享個人檔案</v-btn>
              <v-btn v-else color="#444" style="font-weight: 900; width: 100%;">發送訊息</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">榮譽分數 {{routeUser.SCORES}} 分</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <!-- 新增限時動態 -->
        <v-col cols="12" style=";" v-if="routeUser.USER_NAME === user.USER_NAME || routeUser.MAKE_EVENT.length !== 0">
          <v-row >
            <!-- 每一個小圖 -->
            <v-col cols="3" style="background:" class="text-center">
              <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
                <v-icon style="font-size: 3.8rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
              </v-btn>
              <div class="mt-3" style="color:#ccc">新增</div>
            </v-col>
          </v-row>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <v-col cols="12" style="background: ;">
            <v-row>

              <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px;padding-bottom: 0;">{{ new Date().getFullYear() }}</v-col>

              <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
              <span>{{ new Date().getMonth() }}</span>
              <span  style="font-size: 0.7rem; ">月</span>
              <span>{{  new Date().getDate()  }}</span>
              <span style="font-size: 0.7rem; ">日</span>

              </v-col>
              <v-col cols="7" style="background: ;"></v-col>

              <v-col cols="1" style="background-color: ;" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-camera</v-icon>
              </v-col>
              <v-col cols="1" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-dots-vertical</v-icon>
              </v-col>

            </v-row>
          </v-col>
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
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">建立動態</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                      <v-list-item style="font-size: 1rem;">建立限動</v-list-item>
                      <v-divider style="margin-top: 6px;margin-bottom: 6px;"></v-divider>
                    </v-list>
                  </v-menu>

                  <v-icon class="me-3" style="cursor: pointer;" id="setting">mdi-menu</v-icon>
                  <v-menu activator="#setting" width="150" style="text-align: center;" >
                    <v-list>
                      <SettingsMenu></SettingsMenu>
                    </v-list>
                  </v-menu>

                </v-col>

            <!-- 學校 -->
            <v-col cols="12"  style=" font-size: 0.9rem; padding-top: 0rem;"  >
              <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ routeUser.SCHOOL_NAME }}</span>
                <span>{{ routeUser.SCHOOL_CITY }}</span>
              </span>
            </v-col>

            <!-- 新增社團按鈕 /  若有幹部則顯示幹部職位-->
            <v-col cols="12" style="padding-top:1px ;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增社團</v-btn>
            </v-col>

            <!-- 簡介 (最多39字)-->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <v-col cols="12" >
              <v-row>
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

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <v-col cols="12" >
          <v-row>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn v-if="user.USER_NAME === routeUser.USER_NAME" color="#444" style="font-weight: 900; width: 100%;">編輯個人檔案</v-btn>
              <v-btn v-else color="#1BBCA9" style="font-weight: 900; width: 100%;">追蹤</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn v-if="user.USER_NAME === routeUser.USER_NAME" color="#444" style="font-weight: 900; width: 100%;">分享個人檔案</v-btn>
              <v-btn v-else color="#444" style="font-weight: 900; width: 100%;">發送訊息</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">榮譽分數 {{routeUser.SCORES}} 分</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <!-- 新增限時動態 -->
        <v-col cols="12" style=";">
          <v-row >
            <!-- 每一個小圖 -->
            <v-col  :cols="cols" style="background:" class="text-center">
              <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
                <v-icon style="font-size: 3.8rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
              </v-btn>
              <div class="mt-3" style="color:#ccc">新增</div>
            </v-col>
          </v-row>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <v-col cols="12" style="background: ;">
            <v-row>

              <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px;padding-bottom: 0;">{{ new Date().getFullYear() }}</v-col>

              <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
              <span>{{ new Date().getMonth() }}</span>
              <span  style="font-size: 0.7rem; ">月</span>
              <span>{{  new Date().getDate()  }}</span>
              <span style="font-size: 0.7rem; ">日</span>

              </v-col>
              <v-col cols="7" style="background: ;"></v-col>

              <v-col cols="1" style="background-color: ;" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-camera</v-icon>
              </v-col>
              <v-col cols="1" class="d-flex justify-center">
                <v-icon style=" " color="#fff ">mdi-dots-vertical</v-icon>
              </v-col>

            </v-row>
          </v-col>
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
import SettingsMenu from '@/components/SettingsMenu.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
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
  BE_MARK: ([])
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
.iconTop
  font-size: 1.4rem

</style>
