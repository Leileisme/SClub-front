<template>
  <template v-if="isXs" >
    <v-app-bar >
      <VContainer class="d-flex align-center" style="">
        <v-btn v-if="routeUser.USER_NAME !== user.USER_NAME" icon="mdi-chevron-left" style="font-size: 1.4rem;" @click="goBack"></v-btn>
        <v-app-bar-title class="text-h5 ms-5">
          {{routeUser.USER_NAME}}
        </v-app-bar-title>

        <!-- 【建立】 動態/限時動態 -->
        <v-dialog max-width="400px"  v-if="routeUser.USER_NAME === user.USER_NAME">
          <template v-slot:activator="{ props }" >
            <v-btn v-bind="props" icon="mdi-plus-box-outline" style="font-size: 1.25rem;"> </v-btn>
          </template>

          <!-- 建立彈出的內容 -->
          <template v-slot:default="{ isActive }" >
            <v-card style="border-radius: 15px;">
              <v-card-text class="text-center">
                <AddMenu is-mobile></AddMenu>
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
                <SettingsMenu  v-if="routeUser.USER_NAME === user.USER_NAME" is-mobile></SettingsMenu>
                <SettingsMenuOther v-else is-mobile></SettingsMenuOther>
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

  <NPersonalClub v-if="routeUser.ROLE !== UserRole.CLUB" ></NPersonalClub>
  <PersonalClub v-else  ></PersonalClub>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useEmitter } from '@/composables/mitt'
import UserRole from '@/enums/UserRole'
import PersonalClub from '@/components/PersonalView/PersonalClub.vue'
import NPersonalClub from '@/components/PersonalView/NPersonalClub.vue'
import SettingsMenu from '@/components/PersonalView/SettingsMenu.vue'
import SettingsMenuOther from '@/components/PersonalView/SettingsMenuOther.vue'
import AddMenu from '@/components/AddMenu.vue'

const { apiAuth } = useApi()
const user = useUserStore()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const emitter = useEmitter()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const goBack = () => {
  router.go(-1)
}

emitter.on('updateUser', async () => {
  await user.getProfile()
  await getUserName()
  emitter.emit('updateUserOk')
})

const routeEvent = ref([])
const routeUser = ref({
  EMAIL: (''),
  ROLE: (''),
  SCHOOL_NAME: (''),
  SCHOOL_CITY: (''),
  USER_NAME: (''),
  NICK_NAME: (''),
  CLUB_TH: (''),
  CLUB_CATEGORY: (''),
  IMAGE: (''),
  TICKET_CART: ([]),
  SCORES: (''),
  NOTIFY: ([]),
  KEEP_POST: ([]),
  KEEP_EVENT: ([]),
  FANS: ([]),
  FOLLOW: ([]),
  IS_STUDENT: (''),
  IS_ABLE: (''),
  IS_ADMIN: (''),
  DESCRIBE: (''),
  MAKE_EVENT: ([]),
  MAKE_POST: ([]),
  MAKE_TIME_POST: ([]),
  GO_EVENT: ([]),
  BE_MARK: ([]),
  IS_CORE_MEMBER: ([]),
  MAKE_EVENTS_ID: ([]),
  CLUB_CORE_MEMBER: ([])
})
provide('routeUser', routeUser)
provide('routeEvent', routeEvent)

const getUserName = async () => {
  try {
    const { data } = await apiAuth.get('/users/' + route.params.USER_NAME)
    routeUser.value.EMAIL = data.result.EMAIL
    routeUser.value.ROLE = data.result.ROLE
    routeUser.value.SCHOOL_NAME = data.result.SCHOOL_NAME
    routeUser.value.SCHOOL_CITY = data.result.SCHOOL_CITY
    routeUser.value.USER_NAME = data.result.USER_NAME
    routeUser.value.NICK_NAME = data.result.NICK_NAME
    routeUser.value.CLUB_TH = data.result.CLUB_TH
    routeUser.value.CLUB_CATEGORY = data.result.CLUB_CATEGORY
    routeUser.value.IMAGE = data.result.IMAGE
    routeUser.value.TICKET_CART = data.result.TICKET_CART
    routeUser.value.SCORES = data.result.SCORES
    routeUser.value.NOTIFY = data.result.NOTIFY
    routeUser.value.KEEP_POST = data.result.KEEP_POST
    routeUser.value.KEEP_EVENT = data.result.KEEP_EVENT
    routeUser.value.FANS = data.result.FANS
    routeUser.value.FOLLOW = data.result.FOLLOW
    routeUser.value.IS_STUDENT = data.result.IS_STUDENT
    routeUser.value.IS_ABLE = data.result.IS_ABLE
    routeUser.value.IS_ADMIN = data.result.IS_ADMIN
    routeUser.value.DESCRIBE = data.result.DESCRIBE
    routeUser.value.MAKE_EVENT = data.result.MAKE_EVENT
    routeUser.value.MAKE_POST = data.result.MAKE_POST
    routeUser.value.MAKE_TIME_POST = data.result.MAKE_TIME_POST
    routeUser.value.GO_EVENT = data.result.GO_EVENT
    routeUser.value.BE_MARK = data.result.BE_MARK
    routeUser.value.IS_CORE_MEMBER = data.result.IS_CORE_MEMBER
    routeUser.value.MAKE_EVENTS_ID = data.result.MAKE_EVENTS_ID

    document.title = `SClub | ${routeUser.value.NICK_NAME}（${routeUser.value.USER_NAME}）`
    await getEventById()
    // await getEventById()
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
    router.push('/')
  }
}

const getEventById = async () => {
  try {
    const requests = routeUser.value.MAKE_EVENTS_ID.map(id => apiAuth.get('/events/' + id))
    const data = await Promise.all(requests)
    routeEvent.value = data.map(response => {
      const result = response.data.result
      const [date, timeStart, timeEnd] = result.DATE.split(' ')
      const [year, month, day] = date.split('/')
      const [hourStart, minuteStart] = [timeStart.slice(0, 2), timeStart.slice(2)]
      const [hourEnd, minuteEnd] = [timeEnd.slice(0, 2), timeEnd.slice(2)]
      result.dateParts = {
        year,
        month: month.padStart(2, '0'),
        day: day.padStart(2, '0'),
        hourStart: hourStart.padStart(2, '0'),
        minuteStart: minuteStart.padStart(2, '0'),
        hourEnd: hourEnd.padStart(2, '0'),
        minuteEnd: minuteEnd.padStart(2, '0')
      }
      return result
    })
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

onMounted(async () => {
  await getUserName()
}
)
</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem

.v-container
  padding: 24px !important

</style>
