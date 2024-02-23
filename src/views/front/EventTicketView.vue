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
        <EventInf></EventInf>

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

  <v-dialog v-model="hadTicket" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">已取過票溜!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @close="goBackToEvent" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventInf from './EventInfo.vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const router = useRouter()
const route = useRoute()
const routeEvent = inject('routeEvent')
const user = useUserStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

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

// 展開
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

const hadTicket = ref(false)
const goBackToEvent = () => {
  hadTicket.value = false
  router.push(`/event/${route.params.id}`)
}

// 取票
const goTicket = async () => {
  if (user.SCORES < routeEvent.SCORE_VALUES) {
    createSnackbar({
      text: '積分不足',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  } else {
    try {
      // 獲取事件的當前票據
      const response = await apiAuth.get(`/events/${route.params.id}`)
      const currentTickets = response.data.result.TICKET

      console.log(currentTickets)
      // 檢查 USER 是否包含 user._id
      if (currentTickets.some(ticket => ticket.USER === user._id)) {
        // 跳出已取票
        hadTicket.value = true
        return
      }

      // 取票
      const ticket = [{ USER: user._id, USED: false }]
      await apiAuth.patch(`/events/${route.params.id}`, {
        TICKET: ticket
      })

      createSnackbar({
        text: '取票成功',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })

      router.push(`/event/${route.params.id}`)
    } catch (error) {
      console.log(error)
      const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
      createSnackbar({
        text,
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          console: 'red',
          location: 'bottom'
        }
      })
    }
  }
}

</script>
<style scoped>
.okBtn.v-btn--disabled {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
