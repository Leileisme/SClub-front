<template>

      <!-- 開始日期 / 時間 -->
      <!-- 結束日期 / 時間 -->
      <v-col :cols="dateCol " style="background-color:;">
          <v-row style="background-color: ;">
            <v-col cols="12" style="padding:0;padding-left: 12px;font-size: 0.8rem;color: #aaa"> {{ formatDate(item.EVENT.DATE).year }}</v-col>
            <!-- 日期 -->
            <v-col cols="8" style="background-color: ;font-size: 1.55rem; padding-right:0;padding-top: 0px;">{{ formatDate(item.EVENT.DATE).monthDay }}</v-col>
            <v-col cols="4" class="d-flex align-center" style="padding-top:0px;padding-bottom: 0;">
              <v-row style="color:#aaa ;margin-top:-20px; " >
                <v-col v-if="isStart" cols="12" style="padding: 0;font-size: 0.7rem;">{{ formatDate(item.EVENT.DATE).week}}</v-col>
                <v-col v-if="isEnd" cols="12" style="padding: 0; font-size: 0.85rem; margin-top: -3px;">{{ formatDate(item.EVENT.DATE).endTime}}</v-col>
              </v-row>
            </v-col>
          </v-row>
      </v-col>

  </template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object
  },
  isStart: {
    type: Boolean
  },
  isEnd: {
    type: Boolean
  }
})

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

// 設定日期格式
const formatDate = (value) => {
  const parts = value.split(' ')
  const dateParts = parts[0].split('/')
  const timePartStat = parts[1].split(' ')
  const timePartsEnd = parts[2].split(' ')

  const year = dateParts[0] // 2024
  const monthDay = (dateParts[1].padStart(2, '0') + '.' + dateParts[2].padStart(2, '0')) // 02.29
  const startTime = timePartStat[0].slice(0, 2) + ':' + timePartStat[0].slice(2) // 10:00
  const endTime = timePartsEnd[0].slice(0, 2) + ':' + timePartsEnd[0].slice(2) // 22:00

  const changeDateFormat = (value) => {
    return value.replace(/\//g, '-')
  }

  const getDayOfWeek = (value) => {
    const date = new Date(value)
    const days = ['日', '一', '二', '三', '四', '五', '六']
    return days[date.getDay()]
  }

  const formattedDate = changeDateFormat(parts[0])
  const week = getDayOfWeek(formattedDate)

  return { year, monthDay, week, startTime, endTime }
}

const dateCol = computed(() => {
  return isXs.value ? 5 : isSm.value ? 4 : 3
})
</script>
