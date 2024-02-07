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
        <v-list-item  >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-list-item v-if="!rail" class="text-center font-weight-black text-h4">
          LogoHere
        </v-list-item>
        <v-list-item v-else>　</v-list-item>

        <v-list density="compact" nav>
          <template v-for="item in navItems" :key="item.to">
            <v-list-item :to="item.to"  exact>
              <template v-slot:prepend>
                <VIcon :icon="item.icon"></VIcon>
              </template>
              <VListItemTitle>{{ item.text }}</VListItemTitle>
            </v-list-item>
          </template>
        </v-list>

        <v-list-item @click="logout">
          <template v-slot:prepend >
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          <VListItemTitle>登出</VListItemTitle>
        </v-list-item>
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
              <VIcon :icon="item.icon"></VIcon>
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
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const user = useUserStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const router = useRouter()

// 判斷是否用手機
const { sm, xs } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

const drawer = ref(true)
const rail = ref(true)

const heigh = computed(() => {
  if (!isXs.value) {
    return 'height: 100vh; align-items: center;'
  } else {
    return 'height:auto'
  }
})

const navItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    // { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '/login', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: user.isLogin},
    // { to: '/login', text: '動態', icon: 'mdi-account-multiple', show: user.isLogin},
    { to: '/personal', text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin },
    { to: '', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: user.isLogin },
    { to: '', text: '通知', icon: 'mdi-bell-outline', show: user.isLogin },
    { to: '', text: '訊息', icon: 'mdi-chat-processing', show: user.isLogin },
    { to: '', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

const BottomNavItems = computed(() => {
  return [
    { to: '/', text: '首頁', icon: 'mdi-home', show: user.isLogin },
    // { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: user.isLogin },
    // { to: '', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show:user.isLogin },
    { to: '', text: '動態', icon: 'mdi-account-multiple', show: user.isLogin },
    { to: '/personal', text: '個人檔案', icon: 'mdi-account-circle-outline', show: user.isLogin },
    { to: '', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }

  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    router.push('/')
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
  }
}
</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1rem !important

</style>
