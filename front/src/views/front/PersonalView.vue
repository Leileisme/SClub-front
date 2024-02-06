<template>
  <template v-if="isXs">
    <v-app-bar>
      <VContainer class="d-flex align-center">
        <v-app-bar-title class="text-h5 ms-5">
          {{ user.USER_NAME}}
        </v-app-bar-title>
        <template v-for="item in TopNavItems" :key="item.to" >
          <VBtn :to="item.to" :active=false class="iconTop"><v-icon>{{ item.icon }}</v-icon></VBtn>
        </template>
      </VContainer>
    </v-app-bar>

    <v-container >
      <v-row >
        <v-col cols="4" style="background-color: brown;"></v-col>

        <!-- 學校名字/地區 -->
        <v-col cols="8" style=";">
          <v-row>
            <v-col cols="12"  style="padding:4px;"  class="d-flex flex-row-reverse">
              <span style="border: 1px solid #25ECE0; padding: 5px 12px; color: #FF6868;"  >
                <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ user.SCHOOL_NAME }}</span>
                <span>{{ user.SCHOOL_CITY }}</span>
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" style="font-size: 1.1rem; padding-top:0 ;padding-bottom: 0;" >{{ user.NICK_NAME }}</v-col>
            <v-col cols="12" style="padding-top:0 ;padding-bottom: 0;">
              <v-btn type="button" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" > <v-icon style="text-align: le;">mdi-plus</v-icon>新增社團</v-btn>
            </v-col>
          </v-row>
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

const { api } = useApi()
const router = useRouter()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const TopNavItems = computed(() => {
  return [
    { to: '', text: '新增', icon: 'mdi-plus-box-outline', click: '' },
    { to: '', text: '選單', icon: 'mdi-menu', click: '' },
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
</style>
