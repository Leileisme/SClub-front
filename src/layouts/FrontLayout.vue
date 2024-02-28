<template>
  <v-layout>
    <!-- 頂部導覽列 -->
    <template v-if="isXs && !isPersonalRoute && !isLoginRoute && !isRegisterRoute && !isEventRoute && !isTicketRoute & !isTicketIdRoute">
      <v-app-bar>
        <VContainer class="d-flex align-center">
        <v-app-bar-title class="text-h5 ms-5">LogoHere</v-app-bar-title>
        <template v-for="item in TopNavItems" :key="item.to" >
          <VBtn :to="item.to" :active=false class="iconTop" ><v-icon>{{ item.icon }}</v-icon></VBtn>
        </template>
      </VContainer>
      </v-app-bar>

    </template>

    <!-- 底部導覽列 Xs -->
    <template v-if="isXs && user.isLogin">
      <v-bottom-navigation>
          <template v-for="item in BottomNavItems" :key="item.to">
            <v-btn :to="item.to" :prepend-icon="item.icon" exact class="iconBottom" color="#25ECE0"> </v-btn>
          </template>
      </v-bottom-navigation>
    </template>

    <!-- 電腦版 Sm (可縮合)-->
    <template v-else-if="isSm  && user.isLogin">
      <v-navigation-drawer
        v-model="drawer"
        :rail="true"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item v-if="rail" class="text-center font-weight-black text-h4" nav style="padding: 8px !important;">
            LogoHere
            <template v-slot:append>
              <v-icon  style="font-size: 1.5rem;"></v-icon>
            </template>
          </v-list-item>
          <v-list-item v-else>　</v-list-item>
        </v-list>

        <v-list  nav>
          <template v-for="item in navItems" :key="item.to">
            <v-list-item :to="item.to"  exact  color="#25ECE0">
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
    <template v-else-if=" user.isLogin">
      <v-navigation-drawer permanent location="left">
        <!-- LogoHere -->
        <v-list nav>
          <v-list-item class="text-center font-weight-black text-h4">
            LogoHere
          </v-list-item>
        </v-list>

        <!-- icon+路由 -->
        <v-list nav>
          <template v-for="item in navItems" :key="item.to" >
            <v-list-item :to="item.to"  exact color="#25ECE0">
              <template v-slot:prepend>
                <v-icon :icon="item.icon" ></v-icon>
              </template>
              <v-list-itemTitle>{{ item.text }}</v-list-itemTitle>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- 路由 main -->
    <v-main class="d-flex justify-center " :style="heigh">
      <!-- 綁定路徑:id -->
      <RouterView :key="$route.fullPath" ></RouterView>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, watch } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const isPersonalRoute = computed(() => route.name === 'personal')
const isLoginRoute = computed(() => route.name === 'login')
const isRegisterRoute = computed(() => route.name === 'register')
// 因為路由裡面還「子路由」，所以看所有[相關路由」中是否有 eventDetail
const isEventRoute = computed(() => route.matched.some(item => item.name === 'eventId'))
const isTicketRoute = computed(() => route.matched.some(item => item.name === 'ticket'))
const isTicketIdRoute = computed(() => route.matched.some(item => item.name === 'ticketUsed'))

// 判斷是否用手機
const { sm, xs } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

const drawer = ref(true)
const rail = ref(true)

const heigh = computed(() => {
  if (!isXs.value) {
    return ' align-items: center;'
  } else {
    return 'height:auto'
  }
})

// xs 頂部導覽列
const TopNavItems = computed(() => {
  return [
    { to: '/ticket', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: '' },
    { to: '', text: '通知', icon: 'mdi-bell-outline', show: '' },
    { to: '', text: '訊息', icon: 'mdi-chat-processing', show: '' }
  ]
})

// xs 底部導覽列
const BottomNavItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    // { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show:user.isLogin },
    { to: '/post', text: '檔案牆', icon: 'mdi-account-multiple', show: user.isLogin },
    { to: '/' + user.USER_NAME, text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin }

  ]
})

// 電腦版導覽列
const navItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    // { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: user.isLogin },
    { to: '/post', text: '檔案牆', icon: 'mdi-account-multiple', show: user.isLogin },
    // { to: '/personal', text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin },
    { to: '/' + user.USER_NAME, text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin },
    { to: '/ticket', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: user.isLogin },
    { to: '', text: '通知', icon: 'mdi-bell-outline', show: user.isLogin },
    { to: '', text: '訊息', icon: 'mdi-chat-processing', show: user.isLogin }
    // { to: '/admin', text: '管理員後台', icon: 'mdi-account-cog-outline', show: user.IS_ADMIN }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1rem !important

</style>
