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
        <!-- 報名完成-->

        <v-window-item value="one">
          <v-container>
            <v-row>
              <v-col  v-if="!user.TICKET_CART.some(item => item.USED !== TicketUseState.N_USE) & !user.TICKET_CART.some(item => item.USED !== TicketUseState.USED)" style="color: #aaa;">目前沒有任何票券</v-col>
              <!-- 未使用票券 -->
              <template v-if="user.TICKET_CART.some(item => item.USED === TicketUseState.N_USE)">
                <v-container style="padding-bottom: 0;">未使用票券</v-container>
                <v-col cols="12" v-for="(item) in user.TICKET_CART.filter(item => item.USED === 0)"  :key="item._id" >
                    <IsTicket :item="item"></IsTicket>
                </v-col>
              </template>

              <!-- 已使用票券 -->
              <template v-if="user.TICKET_CART.some(item => item.USED === TicketUseState.USED)" >
                <v-container style="padding-bottom: 0; margin-top: 1rem;opacity: 0.6;" >已使用票券</v-container>
                <v-col cols="12" v-for="(item) in user.TICKET_CART.filter(item => item.USED === 1)"  :key="item._id" style="opacity: 0.6;">
                    <IsTicket :item="item"></IsTicket>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-window-item>

        <!-- 已取消 -->
        <v-window-item value="two">
          <v-container>
            <v-row>
              <v-col  v-if="!user.TICKET_CART.some(item => item.USED !== TicketUseState.CANCEL )" style="color: #aaa;">目前沒有任何票券</v-col>

              <template v-if="user.TICKET_CART.some(item => item.USED === TicketUseState.CANCEL)" >
                <v-container style="padding-bottom: 0; margin-top: 1rem;opacity: 0.6;" >已使用票券</v-container>
                <v-col cols="12" v-for="(item) in user.TICKET_CART.filter(item => item.USED === 1)"  :key="item._id" style="opacity: 0.6;">
                    <IsTicket :item="item"></IsTicket>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-window-item>
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
import InfoAll from '@/components/InfoAll.vue'
import IsTicket from '@/components/TicketView/IsTicket.vue'
import TicketUseState from '@/enums/TicketUseState'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
// 取得路由資訊
// const routeEvent = inject('routeEvent')。

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

// 使用票券的通知開關
const InfoSwitch = ref(false)
const InfoTitle = ref('使用票券')
const closeInfo = () => {
  InfoSwitch.value = false
}

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

// 跳往 QRcode 使用的頁面 先不做太複雜
const goUsedTicket = (value) => {
  router.push('/ticket/' + value.TICKET)
}

const tab = ref('one')
const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})
const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

</script>
