<template>
  <v-layout>
    <template v-if="isXs">
      <v-bottom-navigation>
          <template v-for="item in BottomNavItems" :key="item.to">
            <v-btn :to="item.to" :prepend-icon="item.icon" :active=false class="iconBottom"></v-btn>
          </template>
      </v-bottom-navigation>
    </template>

      <!-- 電腦版 Sm (可縮合)-->
      <template v-else-if="isSm">
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
            <v-list-item :to="item.to">
              <template v-slot:prepend>
            <VIcon :icon="item.icon"></VIcon>
              </template>
          <VListItemTitle>{{ item.text }}</VListItemTitle>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
  </template>

      <!-- 電腦版 md以上 -->
  <template v-else>
          <v-navigation-drawer permanent location="left">
              <!-- LogoHere -->
              <v-list nav>
        <v-list-item class="text-center font-weight-black text-h4">
          LogoHere
        </v-list-item>
              </v-list>
              <!-- icon+路由 -->
              <v-list nav>
                <template v-for="item in navItems" :key="item.to">
                  <v-list-item :to="item.to">
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
    { to: '/home', text: '首頁', icon: 'mdi-home', show: '' },
    { to: '/login', text: '登入', icon: 'mdi-login', show: '' },
    { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: '' },
    // { to: '/login', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: '' },
    // { to: '/login', text: '動態', icon: 'mdi-account-multiple', show: '' },
    { to: '/register', text: '個人檔案', icon: 'mdi-account-circle-outline', show: '' },
    { to: '/register', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: '' },
    { to: '/register', text: '通知', icon: 'mdi-bell-outline', show: '' },
    { to: '/register', text: '訊息', icon: 'mdi-chat-processing', show: '' }
  ]
})

const BottomNavItems = computed(() => {
  return [
    { to: '/home', text: '首頁', icon: 'mdi-home', show: '' },
    { to: '/login', text: '登入', icon: 'mdi-login', show: '' },
    // { to: '/event', text: '活動', icon: 'mdi-calendar-check', show: '' },
    { to: '/register', text: '論壇', icon: 'mdi-bullhorn-variant-outline', show: '' },
    { to: '/register', text: '動態', icon: 'mdi-account-multiple', show: '' },
    { to: '/register', text: '個人檔案', icon: 'mdi-account-circle-outline', show: '' }
  ]
})
</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1rem !important

</style>
