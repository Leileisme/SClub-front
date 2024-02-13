<template>
  <template v-if="isXs">
    <v-app-bar >
      <VContainer class="d-flex align-center" style="">
        <v-app-bar-title class="text-h5 ms-5">
          {{ user.USER_NAME}}
        </v-app-bar-title>

        <!-- 【建立】 動態/限時動態 -->
        <v-dialog max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus-box-outline" style="font-size: 1.25rem;"> </v-btn>
          </template>

          <!-- 建立彈出的內容 -->
          <template v-slot:default="{ isActive }" >
            <v-card style="border-radius: 15px;">
              <v-card-text class="text-center">
                  <v-divider style="margin-top: 30px;margin-bottom: 15px;"></v-divider>
                  <v-list-item style="font-size: 1.2rem;">建立動態</v-list-item>
                  <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                  <v-list-item style="font-size: 1.2rem;">建立限動</v-list-item>
                  <v-divider style="margin-top: 15px;margin-bottom: 30px;"></v-divider>
              </v-card-text>

                <v-spacer></v-spacer>
                <v-btn text="Close Dialog" :flat="true" @click="isActive.value = false"  style="position: absolute; right: 0; top: 0;">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

            </v-card>
          </template>
        </v-dialog>

        <!-- 【設定】 -->
        <v-dialog max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-menu" style="font-size: 1.25rem;"> </v-btn>
          </template>

          <!-- 設定彈出的內容 -->
          <template v-slot:default="{ isActive }">
            <v-card style="border-radius: 15px;" class="text-center">
              <v-card-text>
                <v-divider style="margin-top: 30px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">貼文收藏</v-list-item>
                <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">喜歡的活動</v-list-item>
                <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                <v-list-item style="font-size: 1.2rem;">限動典藏</v-list-item>
                <v-divider style="margin-top: 15px; margin-bottom: 15px;"></v-divider>
                <template v-if="user.IS_ADMIN">
                  <v-list-item style="font-size: 1.2rem; cursor: pointer;" to="/admin" >管理員後台</v-list-item>
                  <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                </template>
                <v-list-item style="font-size: 1.2rem;cursor: pointer;" @click="logout" >登出</v-list-item>
                <v-divider style="margin-top: 15px;margin-bottom: 30px;"></v-divider>
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

  <NClubSelf v-if="user.ROLE !== UserRole.CLUB"></NClubSelf>
  <ClubSelf v-if="user.ROLE === UserRole.CLUB"></ClubSelf>
  <!-- 未完成 -->
  <!-- <Club></Club> -->

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
// import { useRouter } from 'vue-router'
// import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import ClubSelf from '@/components/ClubSelf.vue'
import UserRole from '@/enums/UserRole'
import NClubSelf from '@/components/NClubSelf.vue'
import Club from '@/components/Club.vue'
import logout from '@/composables/logout'

// const { api, apiAuth } = useApi()
const user = useUserStore()
// const router = useRouter()
// const createSnackbar = useSnackbar()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  padding: 24px !important

</style>
