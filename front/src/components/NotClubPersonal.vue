<template>
  <!-- 非社團 -->
  <v-container>
    <v-row>
        <!-- 學校名字/地區 -->
        <v-col cols="8" style=";">
          <v-row>
            <v-col cols="12"  style="padding:4px;"  class="d-flex flex-row-reverse">
              <span style="border: 1px solid #25ECE0; padding: 1px 12px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ user.SCHOOL_NAME }}</span>
                <span>{{ user.SCHOOL_CITY }}</span>
              </span>
            </v-col>
          </v-row>

          <v-row>
            <!-- 暱稱 -->
            <v-col cols="12" style="font-size: 1.1rem; padding-top:0 ;padding-bottom: 0;" >{{ user.NICK_NAME }}</v-col>
            <!-- 新增社團 - 按鈕 -->
            <v-col cols="12" style="padding-top:1px ;padding-bottom: 0;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="margin-left: -3px;">mdi-plus</v-icon>新增社團</v-btn>
            </v-col>

            <!-- 這邊要做迴圈 -->
            <v-col cols="12">　</v-col>

            <!-- 粉絲/追蹤 -->
            <v-col cols="12" v-if="user.ROLE === UserRole.CLUB">
              <v-row>
                <v-col cols="7" style="background-color: ;"></v-col>

                <v-col cols="2" style="background: ;">
                  <v-row class="text-center">
                    <v-col cols="12" style="padding: 0;">{{user.FANS.length}}</v-col>
                    <v-col cols="12" style="padding: 0;">粉絲</v-col>
                  </v-row>
                </v-col>

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

  </v-row>
  </v-container>
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
  padding: 24px !important

</style>
