<template>
  <!-- 頂部導覽列 -->
  <template v-if="isXs">
    <v-app-bar>
      <v-container class="align-center justify-space-around d-flex">
        <v-btn icon="mdi-chevron-left" style="font-size: 1.4rem;" @click="goBack"></v-btn>
        <v-app-bar-title class="text-h5">{{routeEvent.TITLE}}</v-app-bar-title>
        <v-btn v-bind="props" icon="mdi-menu" style="font-size: 1.25rem;"> </v-btn>
      </v-container>
    </v-app-bar>
  </template>

  <!-- 內容 -->
  <v-container style="padding: 0;">
      <v-col cols="12" style="padding: 0; padding-bottom: 12px">
        <v-img
        :aspect-ratio="16/9"
        cover
        :src="routeEvent.IMAGE"
        style="display: ;"
        ></v-img>
      </v-col>

    <v-container >

    <v-row>
      <!-- 分類標籤 -->
      <v-col cols="10" style="background-color:;">
        <v-chip
          v-for="(item, index) in routeEvent.CATEGORY"
          :key="index"
          class="me-2 custom-chip "
          color="#25ECE0"
          label
          small
        >
        {{ item }}
      </v-chip>
      </v-col>

      <v-col cols="2"  class="d-flex justify-end">
        <v-icon  style="color: #999;" class="me-5">mdi-bookmark-multiple-outline</v-icon>
        <v-icon style="color: #999;">mdi-cards-heart-outline</v-icon>
      </v-col>

      <!-- 主辦單位頭像 -->
      <v-col cols="3"  class="d-flex justify-center" style="background-color: ;">
        <v-avatar size="96%"  >
          <v-img  :src="routeEvent.HOST.IMAGE"></v-img>
        </v-avatar>
      </v-col>

      <!-- 活動標題 -->
      <v-col cols="9" style="font-size: 1.5rem; font-weight: 900; " class="d-flex align-center">{{ routeEvent.TITLE }}</v-col>

      <v-col cols="12" style="color: #999 ; padding-top:0; padding-bottom: 0;font-size: 1rem" class="d-flex align-center justify-end">
        <v-icon style="font-size: 1.1rem;" class="me-1">mdi-eye-outline </v-icon>
        <span class="me-5">{{ routeEvent.REACH }}</span>
        <v-icon style="font-size: 1.1rem;" class="me-1">mdi-cards-heart-outline</v-icon>
        <span  class="me-5">{{ routeEvent.LIKES.length }}</span>
        <v-btn color="#1BBCA9"  style="font-weight: 900;">馬上報名</v-btn>
      </v-col>

      <!-- 分隔線 -->
      <PersonalLine></PersonalLine>

      <!-- 活動時間 -->
      <v-col cols="12">
        <v-icon class="me-3">mdi-calendar-blank</v-icon>
        <span class="me-1">{{ routeEvent.YY_MM_DD }}</span>
        <span class="me-2">({{ WEEK }}) </span>
        <span>{{routeEvent.HOUR_START}}:{{ routeEvent.MINUTE_START }} - {{ routeEvent.HOUR_END }}:{{ routeEvent.MINUTE_END }}</span>
      </v-col>

      <!-- 活動地點 -->
      <v-col cols="12">
        <v-icon class="me-3">mdi-map-marker</v-icon>
        <span class="me-3">{{ routeEvent.ADD }}</span>
        <span class="me-2" v-if="routeEvent.ADD_REMARK" >【 {{ routeEvent.ADD_REMARK }} 】</span>
      </v-col>

      <!-- 活動地點 -->
      <v-col cols="12" >
        <v-icon class="me-3" v-if="routeEvent.IS_PUBLIC === '公開'">mdi-earth</v-icon>
          <v-icon class="me-3" v-else>mdi-account-multiple</v-icon>
        <span class="me-3">{{ routeEvent.IS_PUBLIC }}</span>
      </v-col>

      <!-- 預售票 / 現場票 -->
      <v-col cols="12" >
        <v-icon class="me-3">mdi-ticket-confirmation-outline</v-icon>
        <span class="me-3">預售票： {{ routeEvent.PRE_SALE }} 張</span>
        <span class="me-3">/</span>
        <span class="me-1">現場票：{{ routeEvent.ON_SITE_SALE }} 張</span>

      </v-col>

      <!-- 活動內容 / 分頁 -->
      <v-col cols="12" >
        <v-tabs
          v-model="tab"
          align-tabs="start">
          <v-tab value="one" class="rounded-ts-xl me-2" style=" min-width: 80px;" :style="colorOne">活動內容</v-tab>
          <v-tab value="two" class="rounded-ts-xl me-2" style="min-width: 80px;" :style="colorTwo">主辦/協辦單位</v-tab>
          <v-tab value="three" class="rounded-ts-xl" style="min-width: 80px;" :style="colorThree">直播/動態</v-tab>
        </v-tabs>
        <v-divider color="#fff" class="border-opacity-50"></v-divider>
      </v-col>

      <v-window v-model="tab" style="width:100%; " >

      <!-- 活動內容-->
      <v-window-item value="one">
        <v-col cols="12">
          {{ routeEvent.DESCRIPTION }}
        </v-col>
      </v-window-item>

      <!-- 主辦 / 協辦 單位-->
      <v-window-item value="two">
        <!-- 主辦單位 -->
        <v-col cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold; padding-bottom: 0px;">主辦單位</v-col>

        <v-col cols="12">
          <EventHostCard :item="routeEvent.HOST"></EventHostCard>
        </v-col>

        <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12"></v-col>

        <!-- 協辦單位 -->
        <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold;padding-bottom: 0px;">協辦單位</v-col>

        <v-col cols="12">
          <EventHostCard  v-for="item in routeEvent.CO_ORGANIZER" :key="item._id" :item="item"></EventHostCard>
        </v-col>

      </v-window-item>
    </v-window>

  </v-row>
</v-container>
</v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import PersonalLine from '@/components/PersonalLine.vue'
import EventHostCard from '@/components/EventHostCard.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const goBack = () => {
  router.go(-1)
}

const tab = ref('one')

const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorThree = computed(() => {
  return tab.value === 'three' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const routeEvent = ref({
  TITLE: (''),
  DATE: (''),
  CITY: (''),
  ADD: (''),
  ADD_REMARK: (''),
  IS_PUBLIC: (''),
  CATEGORY: ([]),
  PRE_SALE: (''),
  ON_SITE_SALE: (''),
  SCORE_VALUES: (''),
  DESCRIPTION: (''),
  IMAGE: (''),
  HOST: ([]),
  CO_ORGANIZER: ([]),
  TICKET: ([]),
  LIKES: ([]),
  KEEPS: ([]),
  REACH: (''),
  IS_EDIT: (''),
  POST: ([]),
  PHOTO: ([]),
  YEAR: (''),
  MONTH: (''),
  DAY: (''),
  MINUTE_START: (''),
  MINUTE_END: (''),
  HOUR_START: (''),
  HOUR_END: (''),
  YY_MM_DD: ('')
})

const changeDateFormat = (value) => {
  return value.replace(/\//g, '-')
}

const getDayOfWeek = (value) => {
  const date = new Date(value)
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return days[date.getDay()]
}

const WEEK = computed(() => {
  const formattedDate = changeDateFormat(routeEvent.value.YY_MM_DD)
  return getDayOfWeek(formattedDate)
})

const getEventById = async () => {
  try {
    const { data } = await apiAuth.get('/events/' + route.params.id)
    const [date, timeStart, timeEnd] = data.result.DATE.split(' ')
    const [year, month, day] = date.split('/')
    const [hourStart, minuteStart] = [timeStart.slice(0, 2), timeStart.slice(2)]
    const [hourEnd, minuteEnd] = [timeEnd.slice(0, 2), timeEnd.slice(2)]

    routeEvent.value.TITLE = data.result.TITLE
    routeEvent.value.DATE = data.result.DATE
    routeEvent.value.CITY = data.result.CITY
    routeEvent.value.ADD = data.result.ADD
    routeEvent.value.ADD_REMARK = data.result.ADD_REMARK
    routeEvent.value.IS_PUBLIC = data.result.IS_PUBLIC
    routeEvent.value.CATEGORY = data.result.CATEGORY
    routeEvent.value.PRE_SALE = data.result.PRE_SALE
    routeEvent.value.ON_SITE_SALE = data.result.ON_SITE_SALE
    routeEvent.value.SCORE_VALUES = data.result.SCORE_VALUES
    routeEvent.value.DESCRIPTION = data.result.DESCRIPTION
    routeEvent.value.IMAGE = data.result.IMAGE
    routeEvent.value.HOST = data.result.HOST
    routeEvent.value.CO_ORGANIZER = data.result.CO_ORGANIZER
    routeEvent.value.TICKET = data.result.TICKET
    routeEvent.value.LIKES = data.result.LIKES
    routeEvent.value.KEEPS = data.result.KEEPS
    routeEvent.value.REACH = data.result.REACH
    routeEvent.value.IS_EDIT = data.result.IS_EDIT
    routeEvent.value.POST = data.result.POST
    routeEvent.value.PHOTO = data.result.PHOTO
    routeEvent.value.YEAR = year
    routeEvent.value.MONTH = month.padStart(2, '0')
    routeEvent.value.DAY = day.padStart(2, '0')
    routeEvent.value.MINUTE_START = minuteStart.padStart(2, '0')
    routeEvent.value.MINUTE_END = minuteEnd.padStart(2, '0')
    routeEvent.value.HOUR_START = hourStart.padStart(2, '0')
    routeEvent.value.HOUR_END = hourEnd.padStart(2, '0')
    routeEvent.value.YY_MM_DD = date

    document.title = `學生社團 | ${routeEvent.value.TITLE}`
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
  await getEventById()
  console.log(routeEvent.value, 'routeEvent.value in')
})

</script>
<style scoped>
</style>
