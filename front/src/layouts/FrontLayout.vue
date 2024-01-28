<template>
  <v-layout>

    <template v-if="isMobile">
      <v-app-bar>
        <VContainer class="d-flex align-center">
        <v-app-bar-title>LogoHere</v-app-bar-title>
        <template v-for="item in TopNavItems" :key="item.to" >
          <VBtn :to="item.to" :prepend-icon="item.icon" :active=false class="iconTop"></VBtn>
        </template>
      </VContainer>
      </v-app-bar>

      <v-bottom-navigation>
          <template v-for="item in BottomNavItems" :key="item.to">
            <v-btn :to="item.to" :prepend-icon="item.icon" :active=false class="iconBottom"></v-btn>
          </template>
      </v-bottom-navigation>

    </template>

      <!-- 電腦版 -->
  <template v-else>
          <v-navigation-drawer permanent location="left">
              <!-- LogoHere -->
              <v-list nav>
        <VListItem class="text-center font-weight-black text-h4">
          LogoHere
        </VListItem>
              </v-list>
              <!-- icon+路由 -->
              <v-list nav>
                <template v-for="item in navItems" :key="item.to">
                 <VListItem :to="item.to">
            <template v-slot:prepend>
              <VIcon :icon="item.icon"></VIcon>
            </template>
            <VListItemTitle>{{ item.text }}</VListItemTitle>
                </VListItem>
                </template>
              </v-list>
            </v-navigation-drawer>
  </template>

    <!-- 路由 main -->
    <v-main style="height: 100vh">
      <RouterView :key="$route.path"></RouterView>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
// import { useUserStore } from '@/store/user'
// import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

//  axios
// const { apiAuth } = useApi()
const router = useRouter()
// const createSnackbar = useSnackbar()
// const user = useUserStore()

// 判斷是否用手機
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const navItems = computed(() => {
  return [
    { to: '/home', text: '首頁', icon: 'mdi-home', show: '' },
    { to: '/login', text: '登入', icon: 'mdi-login', show: '' },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: '' },
    // { to: '/login', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: '' },
    // { to: '/login', text: '動態', icon: 'mdi-account-multiple', show: '' },
    { to: '/login', text: '個人檔案', icon: 'mdi-account-circle-outline', show: '' },
    { to: '/login', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: '' },
    { to: '/login', text: '通知', icon: 'mdi-bell-outline', show: '' },
    { to: '/login', text: '訊息', icon: 'mdi-chat-processing', show: '' }
  ]
})

const BottomNavItems = computed(() => {
  return [
    { to: '/home', text: '首頁', icon: 'mdi-home', show: '' },
    { to: '/login', text: '登入', icon: 'mdi-login', show: '' },
    // { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: '' },
    { to: '/login', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: '' },
    { to: '/login', text: '動態', icon: 'mdi-account-multiple', show: '' },
    { to: '/login', text: '個人檔案', icon: 'mdi-account-circle-outline', show: '' }
  ]
})

const TopNavItems = computed(() => {
  return [
    { to: '/login', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: '' },
    { to: '/login', text: '通知', icon: 'mdi-bell-outline', show: '' },
    { to: '/login', text: '訊息', icon: 'mdi-chat-processing', show: '' }
  ]
})
</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1.1rem !important
</style>
