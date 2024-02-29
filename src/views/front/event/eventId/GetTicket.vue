<template>
  <v-container style="padding: 0;max-width: 800px;" >
    <v-container >
      <v-row>
        <!-- 主辦單位頭像 -->
        <v-col :cols="imageCol"  class="d-flex justify-center" style="background-color: ;">
          <v-avatar size="96%"  >
            <v-img  :src="routeEvent.HOST.IMAGE"></v-img>
          </v-avatar>
        </v-col>
        <!-- 活動標題 -->
        <v-col cols="9" style="font-size: 1.5rem; font-weight: 900; " class="d-flex align-center">{{ routeEvent.TITLE }}</v-col>

        <!-- 詳細資訊 -->
        <EventInfo></EventInfo>

        <!-- 購票須知 -->
        <v-col cols="12">
          <v-card class="rounded-lg">
            <v-card-text style="color:#25ECE0; padding-bottom: 0;">購票須知</v-card-text>
            <v-card-text>此票券只限本人使用，活動當天請攜帶本票券，供主辦單位掃描入場。若取票後無故未使用，會影響個人「名譽」。當日刷票後即會將活動紀錄於「個人檔案」，即可PO當日活動文。</v-card-text>
          </v-card>
        </v-col>

        <!-- 購票 -->
        <v-col cols="12">
          <v-card class="rounded-lg">
            <v-row>
              <!-- 文字 -->
              <v-col cols="8" style="padding-bottom: 0;">
                <v-card-text style="color:#25ECE0; padding-bottom: 0;">單人票</v-card-text>
                <v-card-text style="font-size: 1.6rem;">免費票</v-card-text>
              </v-col>
              <!-- 按鈕 -->
              <v-col cols="3" class="d-flex align-center" style="padding-bottom: 0;">
                <div class="me-4" style="font-size: 1.5rem;">{{ number }}</div>
                <v-btn density="compact" size="large" :icon="buttonIcon" color="#25ECE0" @click="clickBtn"></v-btn>
              </v-col>
              <!-- 更多資訊 -->
              <v-col cols="12" style="padding-top: 0;">
                <v-expansion-panels>
                  <v-expansion-panel @click="openExpand">
                    <v-expansion-panel-title expand-icon="mdi-menu-down" >
                      <span :style="titleStyle" style="font-weight:bolder;font-size: 1.1rem;">{{panelTitle}}</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row style="padding-top: 5px;">
                        <v-col cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold; padding-bottom: 0px;">活動介紹</v-col>
                        <v-col cols="12">{{ routeEvent.DESCRIPTION }}</v-col>
                      </v-row>
                      </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- 確認 (按鈕) -->
        <v-col cols="12" class="d-flex justify-end">
            <v-btn  color="#1BBCA9" class="okBtn" style="font-weight: 900;" @click="goTicket" :disabled="disabled">確定取票</v-btn>
        </v-col>

        <v-col :style="bottomStyle"></v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- 【通知】積分不足 -->
  <InfoAll :InfoSwitch="InfoSwitchScores" :InfoText="InfoTextScores" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoTextScores = value"></InfoAll>

  <!-- 【通知】取過票 -->
  <InfoAll :InfoSwitch="InfoSwitchHadTicket" :InfoText="InfoTextHadTicket" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitchHadTicket = value"></InfoAll>

  <!-- 【通知】預售票售罄 -->
  <InfoAll :InfoSwitch="InfoSwitchNTicket" :InfoText="InfoTextNTicket" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitchNTicket = value"></InfoAll>

  <!-- 【通知】後端訊息 -->
  <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>

    <!-- 【通知】取票成功 -->
    <InfoAll :InfoSwitch="InfoSwitchTicketOk" :InfoText="InfoTextTicketOk" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitchTicketOk = value"></InfoAll>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventInfo from '@/components/EventView/EventInfo.vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import InfoAll from '@/components/InfoAll.vue'
import TicketUseState from '@/enums/TicketUseState'

const router = useRouter()
const route = useRoute()
const routeEvent = inject('routeEvent')
const user = useUserStore()
const { apiAuth } = useApi()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const number = ref(0)
const isPlus = ref(true)

const imageCol = computed(() => {
  return isXs.value ? 3 : 2
})

const bottomStyle = computed(() => {
  return isXs.value ? 'margin-bottom:5px;' : 'margin-bottom:15px;'
})

// 購票
const buttonIcon = computed(() => {
  return isPlus.value ? 'mdi-plus' : 'mdi-minus'
})

const clickBtn = () => {
  isPlus.value = !isPlus.value
  number.value = !isPlus.value ? 1 : 0
}

// 展開詳細資訊
const isExpanded = ref(false)
const openExpand = () => {
  isExpanded.value = !isExpanded.value
}
const panelTitle = computed(() => {
  return isExpanded.value ? 'less' : 'more'
})

const titleStyle = computed(() => {
  return isExpanded.value ? 'color: #aaa;' : ' color:#FF3333;'
})

// 確認
const disabled = computed(() => {
  return number.value === 0
})

// 取過票通知
const InfoSwitchHadTicket = ref(false)
const InfoTextHadTicket = ref('已經取過票溜！')

// 積分不足通知
const InfoSwitchScores = ref(false)
const InfoTextScores = ref('Sorry！榮譽積分不足～快參加活動賺積分(-`д´-)')

// 票售罄通知
const InfoSwitchNTicket = ref(false)
const InfoTextNTicket = ref('ㄚ！晚了一步，預售票沒有啦～')

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

// 通知
const InfoSwitchTicketOk = ref(false)
const InfoTextTicketOk = ref('取票成功！')

const closeInfo = () => {
  InfoSwitchHadTicket.value = false
  InfoSwitchScores.value = false
  InfoSwitch.value = false
  InfoSwitchNTicket.value = false
  InfoSwitchTicketOk.value = false
  router.push(`/event/${route.params.id}`)
}

// 取票
const goTicket = async () => {
  if (routeEvent.value.HOST._id === user._id) {
    // 這邊要跳出 取票狀態表單
    console.log('這邊要跳出 取票狀態表單')
    return
  }

  if (user.SCORES < routeEvent.value.SCORE_VALUES) {
    // 積分不足通知
    InfoSwitchScores.value = true
  } else if (routeEvent.value.PRE_SALE - routeEvent.value.TICKET.length === 0) {
    // 票售罄通知
    InfoSwitchNTicket.value = true
  } else if (routeEvent.value.TICKET.some(ticket => ticket.USER === user._id)) {
    // 取過票通知
    InfoSwitchHadTicket.value = true
  } else {
    try {
      // 取票
      const ticket = [{ USER: user._id, USED: TicketUseState.N_USE }]
      const response = await apiAuth.patch(`/events/${route.params.id}`, {
        TICKET: ticket
      })

      // 將 活動_id 、 票券_id 存入使用者資料
      const ticketId = response.data.ticketId
      user.TICKET_CART.push({ EVENT: route.params.id, TICKET: ticketId, USED: TicketUseState.N_USE })

      await apiAuth.patch('/users/edit', {
        USER_NAME: user.USER_NAME,
        TICKET_CART: user.TICKET_CART
      })

      // 更新 user 資料
      await user.getProfile()
      // 取票成功通知
      InfoSwitchTicketOk.value = true
    } catch (error) {
      console.log(error)
      const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
      InfoText.value = text
      InfoSwitch.value = true
    }
  }
}

</script>
<style scoped>
</style>
