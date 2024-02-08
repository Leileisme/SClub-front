<template>
  <!-- <template v-if="isXs"> -->
    <v-app-bar>
      <VContainer class="d-flex align-center">
        <v-app-bar-title class="text-h5 ms-5">
          {{ user.USER_NAME}}
        </v-app-bar-title>

        <!-- 【建立】 動態/限時動態 -->
        <v-dialog max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus-box-outline" style="font-size: 1.25rem;"> </v-btn>
          </template>

          <!-- 建立彈出的內容 -->
          <template v-slot:default="{ isActive }">
            <v-card title="　" >
              <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>

              <v-card-text>
                  <v-list style="font-size: 1.2rem;">建立動態</v-list>
                  <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                  <v-list style="font-size: 1.2rem;">建立限動</v-list>
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
            <v-card title="　">
              <v-card-text>
                  <v-list style="font-size: 1.2rem;">收藏貼文</v-list>
                  <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                  <v-list style="font-size: 1.2rem;">喜歡的活動</v-list>
                  <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                  <v-list style="font-size: 1.2rem;">限動典藏</v-list>
                  <v-divider style="margin-top: 15px; margin-bottom: 15px;"></v-divider>
                  <template v-if="user.isAdmin">
                    <v-list style="font-size: 1.2rem;" to="/admin">管理員後台</v-list>
                    <v-divider style="margin-top: 15px;margin-bottom: 15px;"></v-divider>
                  </template>
                  <v-list style="font-size: 1.2rem;cursor: pointer;" @click="logout" >登出</v-list>
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

  <!-- </template> -->

  <PersonalNotClub v-if="user.ROLE !== UserRole.CLUB"></PersonalNotClub>
  <PersonalClub v-if="user.ROLE === UserRole.CLUB"></PersonalClub>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import UserRole from '@/enums/UserRole'
import PersonalNotClub from '@/components/PersonalNotClub.vue'
import PersonalClub from '@/components/PersonalClub.vue'

const { api, apiAuth } = useApi()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

// 登出
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

.v-container
  padding: 24px !important

</style>
