<template>
  <template v-if="isXs">
    <v-container >
      <v-row class="box">
        <!-- 【左】大頭照 -->
            <v-col cols="4" class="d-flex justify-center" >
            <v-avatar size="115" style="margin-top: 15px;" >
              <v-img  :src="routeUser.IMAGE" cover></v-img>
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
                  <!-- <v-btn v-if="routeUser.CLUB_CORE_MEMBER.every(member => member.USER === null)" color="#444" style="min-width: 0; color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">幽靈社團</v-btn> -->
                  <v-btn color="#FF9900" style="min-width: 0; width: 42px;color: #fff; font-weight: 900;  height: auto; padding-top: 2px; padding-bottom:3px; "  class="align-center">成員</v-btn>
                </span>
            </v-col>

            <!-- 學校 -->
            <SchoolName :routeUser="routeUser" ></SchoolName>

            <!-- 簡介 -->
            <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

            <!-- 粉絲 / 貼文 -->
            <FollowNumber :routeUser="routeUser"></FollowNumber>

          </v-row>
        </v-col>

        <!-- 編輯/分享/分數 狀態按鈕 -->
        <StatusBtn :routeUser="routeUser" ></StatusBtn>

        <!-- 分隔線 -->
        <BlankLine v-if="routeUser.MAKE_EVENT.length !== 0"></BlankLine>

        <!-- 限時動態 -->
        <TimePost :routeUser="routeUser"></TimePost>

        <!-- 貼文 / 活動紀錄 -->
        <PostEvent :routeUser="routeUser" :routeEvent="routeEvent"></PostEvent>
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
              <v-col cols="12" class="d-flex justify-center align-center">
              <v-avatar :size="avatarSize"  >
                <v-img  :src="routeUser.IMAGE" cover></v-img>
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
              <SchoolName :routeUser="routeUser"></SchoolName>

              <!-- 描述 -->
              <v-col cols="12">{{routeUser.DESCRIBE}}</v-col>

              <!-- 粉絲 / 貼文 -->
              <FollowNumber :routeUser="routeUser"></FollowNumber>
            </v-row>
          </v-col>

          <!-- 編輯/分享/分數 狀態按鈕 -->
            <StatusBtn @update-user="get" :routeUser="routeUser"></StatusBtn>

          <!-- 分隔線 -->
          <BlankLine v-if="routeUser.MAKE_EVENT.length !== 0"></BlankLine>

          <!-- 限時動態 -->
        <TimePost :routeUser="routeUser"></TimePost>

        <!-- 貼文 / 活動紀錄 -->
        <PostEvent :routeUser="routeUser" :routeEvent="routeEvent"></PostEvent>
        </v-row>
      </v-container>
    </div>
  </template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, watch, inject } from 'vue'
import { useUserStore } from '@/store/user'
import SettingsMenu from '@/components/PersonalView/SettingsMenu.vue'
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
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

const emit = defineEmits(['updateUser'])
const get = () => {
  emit('updateUser')
}
const avatarSize = computed(() => {
  if (isSm.value) {
    return 150
  } else {
    return 180
  }
})

const routeUser = inject('routeUser')
const routeEvent = inject('routeEvent')

</script>

<style lang="sass" scoped>
</style>
