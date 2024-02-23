<template>
  <v-container style="padding: 0;max-width: 800px;" >
    <v-col cols="12" style="padding: 0; padding-bottom: 12px">
      <v-img
      :aspect-ratio="aspectRatio"
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
        <v-col :cols="imageCol"  class="d-flex justify-center" style="background-color: ;">
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
          <v-btn color="#1BBCA9"  style="font-weight: 900;" @click="goTicket">馬上取票</v-btn>
        </v-col>

        <!-- 詳細資訊 -->
        <EventInfo></EventInfo>

        <!-- 活動內容 / 分頁 -->
        <v-col cols="12" >
          <v-tabs
            v-model="tab"
            align-tabs="start">
            <v-tab value="one" class="rounded-ts-xl me-2" style=" min-width: 80px;" :style="colorOne">活動內容</v-tab>
            <v-tab value="two" class="rounded-ts-xl me-2" style="min-width: 80px;" :style="colorTwo">直播/動態</v-tab>
          </v-tabs>
          <v-divider color="#fff" class="border-opacity-50"></v-divider>
        </v-col>

        <v-window v-model="tab" style="width:100%; " >

          <!-- 活動內容-->
          <v-window-item value="one">
            <v-col cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold; padding-bottom: 0px;">活動介紹</v-col>
            <v-col cols="12">
              {{ routeEvent.DESCRIPTION }}
            </v-col>

            <!-- 主辦單位 -->
            <v-col cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold; padding-bottom: 0px;">主辦單位</v-col>
            <v-col cols="12">
              <EventHostCard :item="routeEvent.HOST"></EventHostCard>
            </v-col>

            <!-- 協辦單位 -->
            <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12"></v-col>
            <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold;padding-bottom: 0px;">協辦單位</v-col>
            <v-col cols="12">
              <EventHostCard  v-for="item in routeEvent.CO_ORGANIZER" :key="item._id" :item="item"></EventHostCard>
            </v-col>
          </v-window-item>

          <!--動態 / 直播-->
          <v-window-item value="two"></v-window-item>
        </v-window>
        <v-col :style="bottomStyle"></v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- 【通知】取過票 -->
  <v-dialog v-model="hadTicket" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">已經取過票溜!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @click="closeInfo" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 【通知】積分不足 -->
  <v-dialog v-model="nScores" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">
        <v-row>
          <v-col cols="12" style="padding-bottom: 0; color:;">Sorry！榮譽積分不足～快參加活動賺積分(-`д´-)</v-col>
          <!-- <v-col cols="12" >快參加活動賺積分吧！</v-col> -->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @click="closeInfo" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 【後端通知】 -->
  <TextBack :backInfo="backInfo" :textBack="textBack" :closeInfo="closeInfo" @update:backInfo="value => backInfo = value"></TextBack>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventInfo from '@/components/EventView/EventInfo.vue'
import EventHostCard from '@/components/EventView/EventHostCard.vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import TextBack from '@/components/TextBack.vue'

const router = useRouter()
const route = useRoute()
const routeEvent = inject('routeEvent')
const user = useUserStore()
const { apiAuth } = useApi()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const aspectRatio = computed(() => {
  return isXs.value ? 16 / 9 : 8 / 3
})

const imageCol = computed(() => {
  return isXs.value ? 3 : 2
})

const bottomStyle = computed(() => {
  return isXs.value ? 'margin-bottom:5px;' : 'margin-bottom:15px;'
})

const tab = ref('one')
const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})
const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

// 跳通知的開關
const hadTicket = ref(false)
const nScores = ref(false)

// backInfo、closeInfo( backInfo.value = false)、textBack 都要傳給子元件
const backInfo = ref(false)
const textBack = ref('')

const closeInfo = () => {
  hadTicket.value = false
  nScores.value = false
  backInfo.value = false
  router.push(`/event/${route.params.id}`)
}

const goTicket = async () => {
  if (user.SCORES < routeEvent.value.SCORE_VALUES) {
    // 積分不足通知
    nScores.value = true
  } else {
    try {
      // 獲取事件的當前票據
      const response = await apiAuth.get(`/events/${route.params.id}`)
      const currentTickets = response.data.result.TICKET

      // 檢查 USER 是否包含 user._id
      if (currentTickets.some(ticket => ticket.USER === user._id)) {
        // 跳出已取票
        hadTicket.value = true
        return
      }

      // 跳轉去取票頁
      router.push(`/event/${route.params.id}/ticket`)
    } catch (error) {
      console.log(error)
      textBack.value = error?.response?.data?.message || '發生錯誤，請稍後再試QQ'
      backInfo.value = true
    }
  }
}

</script>
<style scoped>
</style>
