<template>
  <template v-if="isXs">

    <v-container >
      <v-row class="box" style="background-color: ">
        <!-- 【左】大頭照 -->
        <v-col cols="4" style="border: 0px solid ;" >
          <v-row>
            <v-col cols="12" ></v-col>
            <v-col cols="12" class="d-flex justify-center">
            <v-avatar size="100%" style="margin-top: 12px" >
              <v-img  :src="user.IMAGE"></v-img>
            </v-avatar>
          </v-col>
          </v-row>
        </v-col>

        <!-- 【右】個人資料 -->
        <v-col cols="8">
          <v-row>
            <!-- 學校名字/地區 -->
            <v-col cols="12"  style="padding-top:0px; font-size: 0.95rem;"  class="d-flex flex-row-reverse">
              <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ user.SCHOOL_NAME }}</span>
                <span>{{ user.SCHOOL_CITY }}</span>
              </span>
            </v-col>
          </v-row>

          <v-row>

            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-bottom: 0; " >
                <!-- 社團名稱/屆數/成員 -->
                <span class="me-3" >{{ user.NICK_NAME }}</span>
                <span class="me-3" style="font-size: 1.05rem;">第{{ user.CLUB_TH }}屆</span>
                <span>
                  <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                </span>

            </v-col>
            <!-- 新增社團 - 按鈕 -->
            <v-col cols="12" style="padding-top:1px ;padding-bottom: 0;">
              <!-- <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增社團</v-btn> -->
            </v-col>

            <!-- 這邊要做迴圈 -->
            <v-col cols="12">　</v-col>

            <v-col cols="12" v-if="user.ROLE === UserRole.CLUB">
              <v-row>
                <v-col cols="4" style="background-color: ;"></v-col>

                  <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">貼文</v-col>
                  </v-row>
                </v-col>

                <!-- 活動 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">活動</v-col>
                  </v-row>
                </v-col>

                <!-- 粉絲 -->
                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">粉絲</v-col>
                  </v-row>
                </v-col>

                <!-- 追蹤 -->
                <v-col cols="2" style="background-color:;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FOLLOW.length}}</v-col>
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
              <v-btn color="#444" style="font-weight: 900; width: 100%;">編輯社團檔案</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn  color="#444" style="font-weight: 900; width: 100%;">分享社團檔案</v-btn>
            </v-col>
            <v-col cols="4" style="padding-left: 4px; padding-right:4px ;">
              <v-btn color="#FF9900" style="color: #fff; font-weight: 900;width: 100%;">活躍狀態 {{user.SCORES}} 分</v-btn>
            </v-col>

          </v-row>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <!-- 活動 -->
        <v-col cols="12" style="color: #25ECE0; padding-bottom: 5px;">活動</v-col>
        <v-col cols="12" style="padding-top: 0;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增活動</v-btn>
        </v-col>

        <!-- 分隔線 -->
        <v-col cols="12">
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <v-col cols="12" style="padding-top: 0px;">
          <v-btn icon  size="large" text  color="rgba(0,0,0,0)">
            <v-icon style="font-size: 2.6rem; border: 1px solid #ccc; border-radius: 50%;" color="#ccc ">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </template>

  <template v-else>
      個人頁
  </template>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import UserRole from '@/enums/UserRole'

const { api } = useApi()
const router = useRouter()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const TopNavItems = computed(() => {
  return [
    { to: '', text: '新增', icon: 'mdi-plus-box-outline', click: '' },
    { to: '', text: '選單', icon: 'mdi-menu', click: '' }
  ]
})

console.log(user.FANS)

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  // padding: 24px !important

</style>
