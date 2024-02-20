<template>
  <template v-if="routeUser.ROLE === UserRole.CLUB">
    <!-- 動態/活動 -->
    <v-col cols="12" >
      <v-tabs
        v-model="tab"
        align-tabs="start">
        <v-tab value="one" class="rounded-ts-xl me-2" style="border:1.8px rgba(204,204,204,0.5) solid; min-width: 80px;">動態</v-tab>
        <v-tab value="two" class="rounded-ts-xl me-2" style="border:1.8px rgba(204,204,204,0.5) solid;min-width: 80px;">主辦活動</v-tab>
        <v-tab value="three" class="rounded-ts-xl" style="border:1.8px rgba(204,204,204,0.5) solid;min-width: 80px;">活動紀錄</v-tab>
      </v-tabs>
      <v-divider color="#fff" class="border-opacity-50"></v-divider>
    </v-col>

    <v-window v-model="tab" style="width:100%; " >
      <!-- 貼文 -->
      <!-- <v-window-item value="one">
        <v-col cols="12" >
        <v-row >
          <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex"
            cols="4"
            style="padding: 2px;"
          >
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
      </v-window-item> -->

    <!-- 活動 -->
      <v-window-item value="two">
        <v-col cols="12">
          <v-row>
            <!-- 主辦活動 -->
            <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
            <template v-if="routeUser.EVENTS_ID.length !== 0">
              <template v-for="item in routeEvent" :key="item._id" >
                <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
                <span class="me-1">{{ item.dateParts.month }}</span>
                <span class="me-1"  style="font-size: 0.7rem;">月</span>
                <span class="me-1">{{ item.dateParts.day }}</span>
                <span class="me-1" style="font-size: 0.7rem;">日</span>
                </v-col>

                <v-col cols="7" @click="$router.push(`/event/${item._id}`)" style="cursor: pointer;" class="title">{{ item.TITLE }}</v-col>

                <v-col cols="1"  class="d-flex justify-center">
                  <v-icon style=" " color="#fff ">mdi-camera</v-icon>
                </v-col>
                <v-col cols="1" class="d-flex justify-center" style="cursor: pointer;">
                  <EventMenu v-if="isXs" isMobile ></EventMenu>
                  <EventMenu v-else ></EventMenu>

                </v-col>
              </template>
            </template>

            <v-col cols="12" v-else>
              <AddEvent v-if="routeUser.USER_NAME === user.USER_NAME"></AddEvent>
              <div v-else style="font-size: 1.3rem;color: #ccc;">目前無活動</div>
            </v-col>
          </v-row>
        </v-col>
      </v-window-item>

        <!-- 活動 -->
        <v-window-item value="three">
        <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
        <v-col cols="12">
          <div style="font-size: 1.3rem;color: #ccc;">目前無活動參加紀錄</div>
        </v-col>
      </v-window-item>
    </v-window>
  </template>

  <template v-else>
    <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
    <v-col cols="12">
      <div style="font-size: 1.3rem;color: #ccc;">目前無活動參加紀錄</div>
    </v-col>
  </template>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import UserRole from '@/enums/UserRole'
import AddEvent from '@/components/AddEvent.vue'
import EventMenu from '@/components/EventMenu.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const user = useUserStore()
const tab = ref('')

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

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
  EVENTS_ID: ([])
})

const get = async () => {
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
    routeUser.value.EVENTS_ID = data.result.EVENTS_ID

    document.title = `學生社團 | ${routeUser.value.NICK_NAME}（${routeUser.value.USER_NAME}）`

    await getEventById()
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

const routeEvent = ref([])
const getEventById = async () => {
  try {
    const requests = routeUser.value.EVENTS_ID.map(id => apiAuth.get('/events/' + id))
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

    console.log(routeEvent.value, 'routeEvent.value in')
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
  await get()
  console.log(routeEvent.value, 'routeEvent.value out')
})

</script>

<style scoped>
.title:hover{
color: #25ECE0;
text-shadow: #25ECE0 0px 0px 1.2px;
  }
</style>
