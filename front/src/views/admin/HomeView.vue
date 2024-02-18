<template>

<!-- <v-container class="text-center">

<h1>管理員後台</h1>

    <v-list-item  v-for="item in navItems" :key="item.to"  style="font-size: 1.8rem;" >
      {{ item.text }}
      <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>

    </v-list-item>
</v-container> -->

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/store/user'
import UserRole from '@/enums/UserRole'

// const { api, apiAuth } = useApi()
const user = useUserStore()
const router = useRouter()
// const createSnackbar = useSnackbar()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const navItems = computed(() => {
  return [
    { to: '', text: '會員管理' },
    { to: '', text: '活動管理' },
    { to: '', text: '貼文管理' },
    { to: '/', text: '回首頁' }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  padding: 24px !important

</style>
