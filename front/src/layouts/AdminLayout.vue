<template>
  <v-layout>
  <template v-if="isXs">
    <v-app-bar >
      <VContainer class="d-flex align-center" style="">
        <v-btn icon="mdi-chevron-left" style="font-size: 1.25rem;"  to="/personal"> </v-btn>
        <v-app-bar-title class="text-h5  text-center">
          管理員後台
        </v-app-bar-title>

        <!-- 【選單】 -->
        <v-dialog max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-menu" style="font-size: 1.25rem;"> </v-btn>
          </template>

          <!-- 選單彈出的內容 -->
          <template v-slot:default="{ isActive }">
            <v-card style="border-radius: 15px;" class="text-center">
              <v-card-text>
                <v-divider style="margin-top: 30px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">會員管理</v-list-item>
                <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">活動管理</v-list-item>
                <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">貼文管理</v-list-item>
                <v-divider style="margin-top: 15px; margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;" to="/">回前台首頁</v-list-item>
                <v-divider style="margin-top: 15px; margin-bottom: 30px;"></v-divider>
                <!-- <v-list-item style="font-size: 1.2rem;" @click="logout">登出</v-list-item>
                <v-divider style="margin-top: 15px; margin-bottom: 30px;"></v-divider> -->
              </v-card-text>

                <v-spacer></v-spacer>
                <v-btn text="Close Dialog" :flat="true" @click="isActive.value = false"  style="position: absolute; right: 0; top: 0;">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card>
          </template>
        </v-dialog>

      </VContainer>
    </v-app-bar>
  </template>

  <!-- 電腦版 Sm (可縮合)-->
  <template v-else-if="isSm  && user.isLogin">
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >

      <!-- 線 -->
      <v-divider></v-divider>

      <!-- 管理員大頭 -->
      <v-list>
        <v-list-item  :prepend-avatar="user.IMAGE" :title="user.USER_NAME">
          <template v-slot:append>
            <v-icon @click.stop="rail = !rail" style="font-size: 1.5rem;">mdi-chevron-left</v-icon>
          </template>
        </v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider></v-divider>

      <!-- 導覽列清單 -->
      <v-list nav  >
        <template v-for="item in navItems" :key="item.to" >
          <v-list-item :to="item.to"  exact>
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </template>

  <!-- 電腦版 md以上 -->
  <template v-else>
    <v-navigation-drawer permanent location="left">
      <!-- 線 -->
      <v-divider></v-divider>

      <!-- 管理員大頭 -->
      <v-list>
        <v-list-item  :prepend-avatar="user.IMAGE" :title="user.USER_NAME"></v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider></v-divider>

      <!-- 導覽列清單 -->
      <v-list nav  >
        <template v-for="item in navItems" :key="item.to" >
          <v-list-item :to="item.to"  exact>
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
      </v-navigation-drawer>
    </template>

    <v-main class="d-flex justify-center " style="height: auto;">
      <RouterView :key="$route.path" ></RouterView>
    </v-main>

  </v-layout>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'

const { api, apiAuth } = useApi()
const user = useUserStore()
const router = useRouter()
// const createSnackbar = useSnackbar()

const drawer = ref(true)
const rail = ref(true)

const heigh = computed(() => {
  if (!isXs.value) {
    return ' align-items: center;'
  } else {
    return 'height:auto'
  }
})

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

const navItems = computed(() => {
  return [
    { to: '', text: '會員管理', icon: 'mdi-account' },
    { to: '', text: '活動管理', icon: 'mdi-calendar' },
    { to: '', text: '貼文管理', icon: 'mdi-file-document' },
    { to: '/', text: '回首頁', icon: 'mdi-home' }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  padding: 24px !important

</style>
