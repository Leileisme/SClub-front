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

          <template v-if="!isXs">
            <v-icon class="ms-5" style="cursor: pointer;" id="setting">mdi-menu</v-icon>
            <v-menu activator="#setting" width="150" style="text-align: center;" >
              <v-list>
                <EventSetList></EventSetList>
              </v-list>
            </v-menu>
          </template>
        </v-col>

        <!-- 主辦單位頭像 -->
        <v-col :cols="imageCol"  class="d-flex justify-center" style="background-color: ;">
          <v-avatar :size="avatarSize" @click="goUserName"  style="cursor: pointer;">
            <v-img  :src="routeEvent.HOST.IMAGE" cover></v-img>
          </v-avatar>
        </v-col>
        <!-- 活動標題 -->
        <v-col cols="9" style="font-size: 1.5rem; font-weight: 900; " class="d-flex align-center">{{ routeEvent.TITLE }}</v-col>

        <v-col cols="12" style="color: #999 ; padding-top:0; padding-bottom: 0;font-size: 1rem" class="d-flex align-center justify-end">
          <!-- 總人次 -->
          <v-icon style="font-size: 1.1rem;" class="me-1">mdi-eye-outline </v-icon>
          <span class="me-5">{{ routeEvent.REACH }}</span>
          <!-- 喜歡人次 -->
          <v-icon style="font-size: 1.1rem;" class="me-1">mdi-cards-heart-outline</v-icon>
          <span  class="me-5">{{ routeEvent.LIKES.length }}</span>
          <!-- 取票按鈕 / 查看取票狀態 -->
          <v-btn color="#1BBCA9"  style="font-weight: 900;" @click="goTicket" :disabled="getTicketDisabled" class="okBtn">{{getTicketText}}</v-btn>
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
            <v-col cols="12" >
            <pre style="white-space: pre-wrap;">{{ routeEvent.DESCRIPTION }}</pre>
            </v-col>

            <!-- 主辦單位 -->
            <v-col cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold; padding-bottom: 0px;">主辦單位</v-col>
            <v-col cols="12">
              <EventHostCard :item="routeEvent.HOST"></EventHostCard>
            </v-col>

            <!-- 協辦單位 -->
            <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12"></v-col>
            <v-col v-if="routeEvent.CO_ORGANIZER.length>0" cols="12" style="color: #25ECE0; font-size: 0.9rem; font-weight: bold;padding-bottom: 0px;">協辦單位</v-col>
            <v-col cols="12"  v-for="item in routeEvent.CO_ORGANIZER" :key="item._id">
              <EventHostCard  :item="item"></EventHostCard>
            </v-col>
          </v-window-item>

          <!--動態 / 直播-->
          <v-window-item value="two"></v-window-item>
        </v-window>
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
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventInfo from '@/components/EventView/EventInfo.vue'
import EventHostCard from '@/components/EventView/EventHostCard.vue'
import { useUserStore } from '@/store/user'
import InfoAll from '@/components/InfoAll.vue'
import EventSetList from '@/components/EventView/EventSetList.vue'

const router = useRouter()
const route = useRoute()
const routeEvent = inject('routeEvent')
const user = useUserStore()

const goUserName = () => {
  if (routeEvent.value.HOST.USER_NAME) {
    router.push(`/${routeEvent.value.HOST.USER_NAME}`)
  } else {
    console.error('goUserName is error')
  }
}

const getTicketDisabled = computed(() => {
  if (routeEvent.value.HOST._id === user._id || routeEvent.value.CO_ORGANIZER.some(co => co._id === user._id)) {
    return false
  } else {
    return routeEvent.value.PRE_SALE - routeEvent.value.TICKET.length === 0
  }
})

const getTicketText = computed(() => {
  if (routeEvent.value.HOST._id === user._id || routeEvent.value.CO_ORGANIZER.some(co => co._id === user._id)) {
    return '登記票券'
  } else {
    return routeEvent.value.PRE_SALE - routeEvent.value.TICKET.length === 0 ? '預售票掃空' : '馬上取票'
  }
})

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const avatarSize = computed(() => {
  return isXs.value ? 80 : 85
})

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

const closeInfo = () => {
  InfoSwitchHadTicket.value = false
  InfoSwitchScores.value = false
  InfoSwitch.value = false
  InfoSwitchNTicket.value = false
  router.push(`/event/${route.params.id}`)
}

const goTicket = async () => {
  if (routeEvent.value.HOST._id === user._id || routeEvent.value.CO_ORGANIZER.some(co => co._id === user._id)) {
    // 這邊要跳出 取票狀態表單
    router.push(`/event/${route.params.id}/ticketUsed`)
    return
  }

  if (user.SCORES < routeEvent.value.SCORE_VALUES) {
    // 積分不足通知
    InfoSwitchScores.value = true
  } else if (routeEvent.value.PRE_SALE - routeEvent.value.TICKET.length === 0) {
    // 票售罄通知
    InfoSwitchNTicket.value = true
  } else if (routeEvent.value.TICKET.some(ticket => ticket.USER._id === user._id)) {
    // 取過票通知
    InfoSwitchHadTicket.value = true
  } else {
    try {
      // 跳轉去取票頁
      router.push(`/event/${route.params.id}/ticket`)
    } catch (error) {
      console.log(error)
      const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
      InfoText.value = text
      InfoSwitch.value = true
    }
  }
}

onMounted(() => {

})

</script>
<style scoped>
</style>
