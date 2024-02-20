<template>
  123
</template>
<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, watch } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const isPersonalRoute = ref(router.currentRoute.value.name === 'personal')
const isLoginRoute = ref(router.currentRoute.value.name === 'login')
const isRegisterRoute = ref(router.currentRoute.value.name === 'register')
const isEventRoute = ref(router.currentRoute.value.name === 'event')

// currentRoute 是異步的
// 使用 ref 並進行監聽
watch(() => router.currentRoute.value.name, (newName) => {
  isPersonalRoute.value = newName === 'personal'
  isLoginRoute.value = newName === 'login'
  isRegisterRoute.value = newName === 'register'
})

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
    { text: '票券', icon: 'mdi-menu', show: '' }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
.iconBottom
  font-size: 1rem !important

</style>
