<template>
  <v-layout>
    <template v-if="isXs && user.isLogin">
      <v-bottom-navigation>
          <template v-for="item in BottomNavItems" :key="item.to">
            <v-btn :to="item.to" :prepend-icon="item.icon" exact class="iconBottom"></v-btn>
          </template>
      </v-bottom-navigation>
    </template>

    <!-- 電腦版 Sm (可縮合)-->
    <template v-else-if="isSm  && user.isLogin">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item v-if="!rail" class="text-center font-weight-black text-h4" nav style="padding: 8px !important;">
            LogoHere
            <template v-slot:append>
              <v-icon @click.stop="rail = !rail" style="font-size: 1.5rem;">mdi-chevron-left</v-icon>
            </template>
          </v-list-item>
          <v-list-item v-else>　</v-list-item>
        </v-list>

        <v-list  nav>
          <template v-for="item in navItems" :key="item.to">
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
            <v-list-item :to="item.to"  exact>
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-itemTitle>{{ item.text }}</v-list-itemTitle>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- 路由 main -->
    <v-main class="d-flex justify-center " :style="heigh">
      <RouterView :key="$route.path" ></RouterView>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()

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

const navItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: user.isLogin },
    { to: '/post', text: '動態', icon: 'mdi-account-multiple', show: user.isLogin },
    { to: '/personal', text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin },
    { to: '', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: user.isLogin },
    { to: '', text: '通知', icon: 'mdi-bell-outline', show: user.isLogin },
    { to: '', text: '訊息', icon: 'mdi-chat-processing', show: user.isLogin },
    { to: '/admin', text: '管理員後台', icon: 'mdi-account-cog-outline', show: user.IS_ADMIN }
  ]
})

const BottomNavItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show:user.isLogin },
    { to: '/post', text: '動態', icon: 'mdi-account-multiple', show: user.isLogin },
    { to: '/personal', text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1rem !important

</style>
