<template>
   <!-- 頂部導覽列 -->
  <TicketAppBar></TicketAppBar>

  <v-container style="margin-top: 1rem; max-width:800px">
    <v-row>
      <!-- 活動內容 / 分頁 -->
      <v-col cols="12" >
        <v-tabs
          v-model="tab"
          align-tabs="start">
          <v-tab value="one" class="rounded-ts-xl me-2" style=" min-width: 80px;" :style="colorOne">報名完成</v-tab>
          <v-tab value="two" class="rounded-ts-xl me-2" style="min-width: 80px;" :style="colorTwo">已取消</v-tab>
        </v-tabs>
        <v-divider color="#fff" class="border-opacity-50"></v-divider>
      </v-col>

      <v-window v-model="tab" style="width:100%; " >
        <!-- 活動內容-->
        <v-window-item value="one">
          <v-container>
            <v-row>
              <v-col cols="12" v-for="(item,idx) in user.TICKET_CART"  :key="item._id">
                <!-- <span style="border: 1px solid #1BBCA9; padding: 2px;font-size: 0.8rem; color: #ccc;" >
                  <v-icon style="font-size: 0.75rem;margin-top: -2px;" >mdi-map-marker</v-icon>  {{ item.EVENT.CITY }}
                </span> -->
                <v-card  width="100%" class="rounded-lg mt-1" >
                  <v-card-item style="padding-right: 0;">
                    <v-row>
                      <!-- 內容 -->
                      <v-col cols="9" style="position: relative;">

                        <v-row>
                          <!-- <v-col cols="12" style="padding-top: 0;"></v-col> -->
                          <!-- 1. 主辦大頭 -->
                          <v-col :cols="hostImage" class="d-flex " style="max-height: 60px;" >
                            <v-avatar :size="hostSize"  style="cursor: pointer;" >
                              <v-img  :src="item.EVENT.HOST.IMAGE"></v-img>
                            </v-avatar>
                          </v-col>

                          <!-- 2. 訂單編號 -->
                          <v-col cols="10" style="font-size: 0.9rem; color: #aaa;padding-right: 0;padding-left: 0; padding-bottom: 5px;">
                            <v-col cols="12" style="padding-top: 0; padding-bottom: 0; " class="d-flex align-center">
                                <span class="me-3">訂單編號　/ </span>
                                <span style="border: 0px solid #1BBCA9; padding-right: 4px; padding-left:0.5px;padding-bottom:0px;font-size: 0.9rem; color: #1BBCA9;" >
                                  <v-icon style="font-size: 0.8rem; margin-top: -2px;" >mdi-map-marker</v-icon>  {{ item.EVENT.CITY }}
                                </span>
                            </v-col>
                            <v-col cols="12" style="padding-top: 7px; padding-bottom: 0;">{{ item.TICKET }}</v-col>
                          </v-col>

                          <!-- 3. 活動名稱 -->
                          <v-col cols="12" style="font-size: 1.3rem; font-weight: 900; padding-top: 12px;" class="d-flex align-center" >{{ item.EVENT.TITLE }}</v-col>

                          <v-col cols="12" style="color: #fff;padding-top:0 ;" >

                          </v-col>

                          <!-- 4. 活動日期 -->
                          <v-col cols="12" style="padding-top: 12px;">
                            <v-row>
                              <!-- 開始日期 / 時間 -->
                              <v-col :cols="dateCol " style="background-color:;">
                                  <v-row style="background-color: ;">
                                    <v-col cols="12" style="padding:0;padding-left: 12px;font-size: 0.8rem;color: #aaa"> {{ formatDate(item.EVENT.DATE)[0] }}</v-col>
                                    <!-- 日期 -->
                                    <v-col cols="8" style="background-color: ;font-size: 1.55rem; padding-right:0;padding-top: 0px;">{{ formatDate(item.EVENT.DATE)[1] }}</v-col>
                                    <v-col cols="4" class="d-flex align-center" style="padding-top:0px;padding-bottom: 0;">
                                      <v-row style="color:#aaa ;margin-top:-20px; " >
                                        <v-col cols="12" style="padding: 0;font-size: 0.7rem;">{{ formatDate(item.EVENT.DATE)[2] }}</v-col>
                                        <v-col cols="12" style="padding: 0; font-size: 0.85rem; margin-top: -3px;">{{ formatDate(item.EVENT.DATE)[3] }}</v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                              </v-col>

                              <!-- 線 -->
                              <v-col cols="2" class="d-flex align-center" style="padding-top: 18px;">
                                <v-divider color="#aaa" thickness="2px" style="opacity: 1;"></v-divider>
                              </v-col>

                              <!-- 結束日期 / 時間 -->
                              <v-col :cols="dateCol " style="background-color:;">
                                <v-row style="background-color: ;">
                                  <v-col cols="12" style="padding:0;padding-left: 12px;font-size: 0.8rem;color: #aaa"> {{ formatDate(item.EVENT.DATE)[0] }}</v-col>
                                  <!-- 日期 -->
                                  <v-col cols="8" style="background-color: ;font-size: 1.55rem; padding-right:0;padding-top: 0px;">{{ formatDate(item.EVENT.DATE)[1] }}</v-col>
                                  <v-col cols="4" class="d-flex align-center" style="padding-top:0px;padding-bottom: 0;">
                                    <v-row style="color:#aaa ;margin-top:-20px; " >
                                      <v-col cols="12" style="padding: 0;font-size: 0.7rem;">{{ formatDate(item.EVENT.DATE)[2] }}</v-col>
                                      <v-col cols="12" style="padding: 0; font-size: 0.85rem; margin-top: -3px;">{{ formatDate(item.EVENT.DATE)[4] }}</v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>

                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>

                        <!-- 查看 -->
                      <v-col cols="2" style="border-left: 2px dashed #999;margin-left: 5px; padding: 0;" class="d-flex align-center">
                        <v-row style="color: #aaa;" :style="{ 'margin-left': checkMarginStyle }">
                        <v-col cols="12" style="padding-bottom: 5px;font-size: 1.2rem;padding-top: 10px;" class="d-flex justify-center">
                          <v-icon @click="goUsedTicket(item)">mdi-eye</v-icon>
                        </v-col>
                        <v-col cols="12" style="padding-top: 0; font-size: 0.8rem;" class="d-flex justify-center" @click="goUsedTicket(item)">查看</v-col>
                      </v-row>
                      </v-col>

                    </v-row>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <!--動態 / 直播-->
        <v-window-item value="two"></v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import TicketAppBar from '@/components/TicketView/TicketAppBar.vue'

const router = useRouter()
const route = useRoute()
const user = useUserStore()

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

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

  return [year, monthDay, week, startTime, endTime]
}

const dateCol = computed(() => {
  return isXs.value ? 5 : isSm.value ? 4 : 3
})

const checkMarginStyle = computed(() => {
  return isXs.value ? '0.5rem' : '2rem'
})

const hostImage = computed(() => {
  return isXs.value ? 2 : 1
})

const hostSize = computed(() => {
  return isXs.value ? '140%' : isSm.value ? '180%' : '160%'
})

const goUsedTicket = (value) => {
  router.push('/ticket/' + value.TICKET)
}

// const changeDateFormat = (value) => {
//   return value.replace(/\//g, '-')
// }

// const getDayOfWeek = (value) => {
//   const date = new Date(value)
//   const days = ['日', '一', '二', '三', '四', '五', '六']
//   return days[date.getDay()]
// }

// const WEEK = computed(() => {
//   const formattedDate = changeDateFormat(YY_MM_DD)
//   return getDayOfWeek(formattedDate)
// })

// const [date, timeStart, timeEnd] = user.EVENT.DATE.split(' ')
// const [year, month, day] = date.split('/')
// const [hourStart, minuteStart] = [timeStart.slice(0, 2), timeStart.slice(2)]
// const [hourEnd, minuteEnd] = [timeEnd.slice(0, 2), timeEnd.slice(2)]

// const YEAR = year
// const MONTH = month.padStart(2, '0')
// const DAY = day.padStart(2, '0')
// const MINUTE_START = minuteStart.padStart(2, '0')
// const MINUTE_END = minuteEnd.padStart(2, '0')
// const HOUR_START = hourStart.padStart(2, '0')
// const HOUR_END = hourEnd.padStart(2, '0')
// const YY_MM_DD = date

const tab = ref('one')
const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})
const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

</script>
