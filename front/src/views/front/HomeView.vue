<template>
    <template v-if="isXS">
      <v-app-bar>
        <VContainer class="d-flex align-center">
        <v-app-bar-title>LogoHere</v-app-bar-title>
        <template v-for="item in TopNavItems" :key="item.to" >
          <VBtn :to="item.to" :prepend-icon="item.icon" :active=false class="iconTop"></VBtn>
        </template>
      </VContainer>
      </v-app-bar>

      <div class="text-h5 mt-10">首頁</div>
  </template>

  <template v-else>
      首頁
  </template>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXS = computed(() => xs.value)

const TopNavItems = computed(() => {
  return [
    { to: '/register', text: '票券', icon: 'mdi-ticket-confirmation-outline', show: '' },
    { to: '/register', text: '通知', icon: 'mdi-bell-outline', show: '' },
    { to: '/register', text: '訊息', icon: 'mdi-chat-processing', show: '' }
  ]
})

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.2rem
</style>
