<template>
  <v-container>
    <div>
      <!-- 輪播圖 -->
      <div class="swiper mySwiper swiper2">
        <div class="swiper-wrapper">
          <template v-for="(item,idx) in eventAll" :key="idx">
            <div class="swiper-slide swiper-slide2">
              <v-card  width="100%" class="rounded-lg mt-1" >
                <v-card-item style="padding: 0;">
                  <v-row style="margin: 0;padding: 0;">
                    <v-col cols="12" style="margin: 0; padding: 0;background-color: antiquewhite;height: 110px;width: 100%;">
                      <v-img :src="item.IMAGE" cover></v-img>
                    </v-col>
                    <v-col cols="11" >
                      <span class="me-2">{{ item.TITLE.length > 10 ? item.TITLE.substring(0, 15) + '...' : item.TITLE }}</span>
                      <span>{{ formatDate(item.DATE).startTime }}</span>
                      <span>開始</span>

                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </div>
        </template>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </v-container>

  <!-- 【通知】後端訊息 -->
  <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useEmitter } from '@/composables/mitt'
import InfoAll from '@/components/InfoAll.vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const emitter = useEmitter()

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

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

const closeInfo = () => {
  InfoSwitch.value = false
}
const eventAll = ref([])

const getEventAll = async (value) => {
  try {
    const { data } = await apiAuth.get('/events/getEventAll')

    eventAll.value = data.result
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    InfoText.value = text
    InfoSwitch.value = true
  }
}

onMounted(async () => {
  await getEventAll()
  console.log('eventAll', eventAll.value)

  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  })
})
</script>

<style scoped>
    .swiper {
      width: 100%;
      height: 200px;
    }

    .swiper-slide {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: top;
    }

    </style>
