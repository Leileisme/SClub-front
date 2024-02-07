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

    <NotClubPersonal v-if="user.ROLE !== UserRole.CLUB"></NotClubPersonal>
    <ClubPersonal v-if="user.ROLE === UserRole.CLUB"></ClubPersonal>
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
import UserRole from '@/enums/UserRole'
import NotClubPersonal from '@/components/NotClubPersonal.vue'
import ClubPersonal from '@/components/ClubPersonal.vue'

const { api } = useApi()
const router = useRouter()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const TopNavItems = computed(() => {
  return [
    { to: '', text: '新增', icon: 'mdi-plus-box-outline', click: '' },
    { to: '', text: '選單', icon: 'mdi-menu', click: '' }
  ]
})

console.log(user.FANS)

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  padding: 24px !important

</style>
