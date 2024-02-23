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
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventInfo from './EventInfo.vue'
import EventHostCard from '@/components/EventHostCard.vue'

const router = useRouter()
const route = useRoute()
const routeEvent = inject('routeEvent')

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const goTicket = () => {
  router.push(`/event/${route.params.id}/ticket`)
}

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

</script>
<style scoped>
</style>
