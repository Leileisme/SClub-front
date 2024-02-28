<template>
  <v-card  width="100%" class="rounded-lg mt-1" >
    <v-card-item style="padding-right: 0;">
      <v-row>
        <!-- 內容 -->
        <v-col cols="9" style="position: relative;">

          <v-row>
            <!-- 1. 主辦大頭 -->
            <v-col cols="2" class="d-flex " style="max-height: 60px;" >
              <v-avatar :size="hostSize"  style="cursor: pointer;" >
                <v-img  :src="item.EVENT.HOST.IMAGE" cover></v-img>
              </v-avatar>
            </v-col>

            <!-- 2. 票券編號 -->
            <v-col cols="10" style="font-size: 0.9rem; color: #aaa;padding-right: 0;padding-left: 0; padding-bottom: 5px;">
              <v-col cols="12" style="padding-top: 0; padding-bottom: 0; " class="d-flex align-center">
                  <span class="me-3">票券編號　/ </span>
                  <span style="border: 0px solid #1BBCA9; padding-right: 4px; padding-left:0.5px;padding-bottom:0px;font-size: 0.9rem; color: #1BBCA9;" >
                    <v-icon style="font-size: 0.8rem; margin-top: -2px;" >mdi-map-marker</v-icon>  {{ item.EVENT.CITY }}
                  </span>
              </v-col>
              <v-col cols="12" style="padding-top: 7px; padding-bottom: 0;">{{ item.TICKET }}</v-col>
            </v-col>

            <!-- 3. 活動名稱 -->
            <v-col cols="12" style="font-size: 1.3rem; font-weight: 900; padding-top: 12px;" class="d-flex align-center" >{{ item.EVENT.TITLE }}</v-col>

            <!-- 排版用空格 -->
            <!-- <v-col cols="12" style="color: #fff;padding-top:0 ;" ></v-col> -->

            <!-- 4. 活動日期 -->
            <v-col cols="12" style="padding-top: 12px;">
              <v-row>
                <!-- 開始日期 / 時間 -->
                <TicketDate :item="item" isStart></TicketDate>
                <!-- 線 -->
                <v-col cols="2" class="d-flex align-center" style="padding-top: 18px;">
                  <v-divider color="#aaa" thickness="2px" style="opacity: 1;"></v-divider>
                </v-col>
                <!-- 結束日期 / 時間 -->
                <TicketDate :item="item" isEnd></TicketDate>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

          <!-- 查看 -->
        <v-col cols="2" style="border-left: 2px dashed #999;margin-left: 5px; padding: 0;" class="d-flex align-center">
          <v-row style="color: #aaa;" :style="{ 'margin-left': checkMarginStyle }">
            <v-col cols="12" style="padding-bottom: 5px;font-size: 1.2rem;padding-top: 10px;" class="d-flex justify-center">
              <v-icon @click="checkTicket(item)">mdi-eye</v-icon>
            </v-col>
            <v-col cols="12" style="padding-top: 0; font-size: 0.8rem;" class="d-flex justify-center" @click="checkTicket(item)">查看</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-item>
    <!-- 使用票券的通知 -->
    <InfoAll :InfoSwitch="InfoSwitch" :InfoText="item.TICKET" :InfoTitle="InfoTitle" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import InfoAll from '@/components/InfoAll.vue'
import TicketDate from './TicketDate.vue'
import TicketUseState from '@/enums/TicketUseState'

const router = useRouter()
const user = useUserStore()

// 判斷是否用手機
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)

const props = defineProps({
  item: Object
})

// 使用票券的通知開關
const InfoSwitch = ref(false)
const InfoTitle = ref('使用票券')
const closeInfo = () => {
  InfoSwitch.value = false
}

const checkTicket = (item) => {
  if (item.USED === TicketUseState.USED || item.USED === TicketUseState.CANCEL) {
    InfoSwitch.value = false
  } else {
    InfoSwitch.value = true
  }
}

const checkMarginStyle = computed(() => {
  return isXs.value ? '0.5rem' : '2rem'
})

const hostSize = computed(() => {
  return isXs.value ? 40 : 50
})

// 跳往 QRcode 使用的頁面 先不做太複雜
const goUsedTicket = (value) => {
  router.push('/ticket/' + value.TICKET)
}

</script>
