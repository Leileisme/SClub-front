<template>
  <div>
    <div class="swiper  swiper1 mySwiper" :style="swiperTopStyle">
      <div class="swiper-wrapper swiper-wrapper1">
        <div class="swiper-slide" v-for="(item,idx) in randomEventsTop.slice(0,5)" :key="idx" >
          <v-img
          cover
          :src="item.IMAGE" style="height: 100%;"
          @click="router.push(`/event/${item._id}`)"
          ></v-img>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

  <v-container class="d-flex justify-center" style="max-width: 800px !important ;">
  <v-row >
    <v-col cols="12" style="padding-bottom: 0;" >最新活動</v-col>

    <v-col cols="12" style="padding-left: 0; padding-right: 0;" >
        <div>
          <div class="swiper mySwiper2 swiper2" style="max-width:800px" :style="swiperSlideStyle">
            <div class="swiper-wrapper">
              <template v-for="(item,idx) in eventAll" :key="idx">
                <div class="swiper-slide swiper-slide2"  @click="router.push(`/event/${item._id}`)">
                  <v-card  width="100%" class="rounded-lg mt-1" style="position: relative;">
                    <v-card-item style="padding: 0;">
                      <v-row style="margin: 0;padding: 0;">
                        <v-col cols="12" style="margin: 0; padding: 0;width: 100%;" :style="swiper2Style">
                          <v-img :src="item.IMAGE" cover></v-img>
                        </v-col>
                        <v-col cols="11" >
                          <span class="me-2">{{ item.TITLE.length > 10 ? item.TITLE.substring(0, 15) + '...' : item.TITLE }}</span>
                          <span>{{ formatDate(item.DATE).startTime }}</span>
                          <span>開始</span>
                        </v-col>
                          <div style="position: absolute;background-color:#fff;top: 5px;left: 5px;width: 50px;height: 50px;font-weight: 900;" class="rounded-lg  text-center">
                            <div style="width: 100%; height: 55%;background-color: red;font-size: 0.9rem;line-height: 1.8rem;" class="rounded-t-lg ">
                              {{ formatDate(item.DATE).month }}月
                            </div>
                            <div style="color: #000;margin-top: -2px;">
                              {{ formatDate(item.DATE).day}}
                            </div>
                          </div>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </div>
            </template>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
    </v-col>

    <v-col cols="12" style="padding-bottom: 0;" >所有活動</v-col>

    <v-col  cols="8">
      <v-text-field
          v-model="search"
          label="活動名稱"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
          density="compact"
          @input="searchData"></v-text-field>
    </v-col>
    <v-col  cols="4" style="padding-left: 0;">
      <v-select
        v-model="city"
        :items="cityItems"
        density="compact"
        color="#25ECE0"
        label="地區"
        variant="outlined"
        @keydown.delete="city = null"
        >
      </v-select>
    </v-col>

    <template v-if="isXs">
      <v-col :cols="cardCol"  v-for="(item,idx) in filteredEvents" :key="idx">
        <v-card  class="rounded-xl" @click="router.push(`/event/${item._id}`)">
          <v-card-item style="padding-left: 0; padding-top: 0;padding-bottom: 0;">
            <v-row style="margin:0;" >
              <v-col :cols="imageCol" class="text-center" style="padding: 0; height: 130px;">
                <v-img :src="item.IMAGE"  cover   aspect-ratio="1"></v-img>
              </v-col>

              <v-col :cols="textCol" style="padding: 0;">
                  <!-- 標題 -->
                  <v-col cols="12" style="font-size: 1.2rem;font-weight: 900;padding-bottom: 5px;">{{ item.TITLE }}</v-col>
                  <!-- 日期 -->
                  <v-col cols="12" style="padding-top: 0;padding-bottom: 5px;color: #aaa;">
                    <span class="me-1">{{ formatDate(item.DATE).monthDay2 }} ({{ formatDate(item.DATE).week }})</span>
                    <span> {{ formatDate(item.DATE).startTime }}</span>
                    <span>～</span>
                    <span> {{ formatDate(item.DATE).endTime }}</span>
                  </v-col>
                  <v-col cols="12" style="color: #25ECE0; padding-top:0;">
                    <v-icon style="font-size: 0.9rem;" class="me-1">mdi-map-marker</v-icon>
                    <span>{{ item.CITY }}</span>
                  </v-col>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12" class="text-center">
        <v-row>
          <v-col cols="12" style="color:">
            <v-row>
              <v-col cols="1">項次</v-col>
              <v-col cols="1">海報</v-col>
              <v-col cols="3">活動名稱</v-col>
              <v-col cols="2">活動日期</v-col>
              <v-col cols="1">開始時間</v-col>
              <v-col cols="1">結束時間</v-col>
              <v-col cols="2">地點</v-col>
              <v-col cols="1">查看</v-col>
              <BlankLine style="padding-bottom: 12px;"></BlankLine>
            </v-row>
            </v-col>

          <template v-for="(item,idx) in filteredEvents" :key="idx">
            <!-- <v-col cols="12" :style="{ backgroundColor: idx % 2 === 0 ? 'rgba(0,0,0,0.3)' : '#color2', color: idx % 2 === 0 ? '#25ECE0' : '#fff' }" style="padding-top: 20px;padding-bottom: 20px;"> -->
            <v-col cols="12" style="padding-top: 20px;padding-bottom: 20px; color: #aaa;" class="hoverClass" >
              <v-row class="d-flex align-center">
                <v-col cols="1">{{ idx+1 }}</v-col>
                <v-col cols="1">
                  <v-img :src="item.IMAGE" cover aspect-ratio="1"></v-img>
                </v-col>
                <v-col cols="3"  style="font-size: 1.2rem;">{{ item.TITLE }}</v-col>
                <v-col cols="2">{{ formatDate(item.DATE).monthDay2 }}</v-col>
                <v-col cols="1">{{ formatDate(item.DATE).startTime }}</v-col>
                <v-col cols="1">{{ formatDate(item.DATE).endTime }}</v-col>
                <v-col cols="2">{{ item.CITY }}</v-col>
                <v-col cols="1"  @click="router.push(`/event/${item._id}`)" style="font-size: 0.8rem;"><v-icon>mdi-eye</v-icon></v-col>
                <BlankLine style="padding-top: 12px;" ></BlankLine>
              </v-row>
            </v-col>
          </template>
        </v-row>
      </v-col>
   </template>
  </v-row>
</v-container>
</div>

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
import BlankLine from '@/components/BlankLine.vue'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const emitter = useEmitter()
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)

// 所有活動搜尋
const search = ref()
const searchData = ref('')
const city = ref()
const cityItems = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']

const randomEvents = computed(() => {
  return [...eventAll.value].sort(() => Math.random() - 0.5)
})

const randomEventsTop = computed(() => {
  return [...eventAll.value].sort(() => Math.random() - 0.5)
})

const filteredEvents = computed(() => {
  return randomEvents.value.filter(item => {
    let matchesSearch = true
    if (search.value) {
      matchesSearch = item.TITLE.includes(search.value)
    }

    let matchesCity = true
    if (city.value) {
      matchesCity = item.CITY === city.value
    }

    return matchesSearch && matchesCity
  })
})

const cardCol = computed(() => {
  return isXs.value ? 12 : 12
})

const imageCol = computed(() => {
  return isXs.value ? 5 : 3
})

const textCol = computed(() => {
  return isXs.value ? 7 : 9
})

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

const closeInfo = () => {
  InfoSwitch.value = false
}

const swiperTopStyle = computed(() => {
  return isXs.value ? 'height: 250px; width:100vw' : 'height: 310px;max-width:800px;'
})

const swiperSlideStyle = computed(() => {
  return isXs.value ? 'height: 180px; width:100vw' : 'height: 300px;max-width:800px;'
})

const swiper2Style = computed(() => {
  return isXs.value ? 'height: 110px;' : 'height: 200px;'
})

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

const formatDate = (value) => {
  const parts = value.split(' ')
  const dateParts = parts[0].split('/')
  const timePartStat = parts[1].split(' ')
  const timePartsEnd = parts[2].split(' ')

  const year = dateParts[0] // 2024
  const monthDay = (dateParts[1].padStart(2, '0') + '.' + dateParts[2].padStart(2, '0')) // 02.29
  const startTime = timePartStat[0].slice(0, 2) + ':' + timePartStat[0].slice(2) // 10:00
  const endTime = timePartsEnd[0].slice(0, 2) + ':' + timePartsEnd[0].slice(2) // 22:00
  const month = dateParts[1]
  const day = dateParts[2]
  const monthDay2 = (dateParts[1].padStart(2, '0') + '/' + dateParts[2].padStart(2, '0')) // 02.29

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

  return { year, monthDay, monthDay2, week, startTime, endTime, month, day }
}

onMounted(async () => {
  await getEventAll()
  console.log('eventAll', eventAll.value)

  const swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 5000
    }
  })

  const swiper2 = new Swiper('.mySwiper2', {
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
    .swiper1 {
      width: 100%;
      height: 250px;
    }

    .swiper-slide1 {
      text-align: center;
      font-size: 18px;
      background: #333;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper2 {
      width: 100%;
      height: 200px;
    }

    .swiper-slide2 {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: top;
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* html,
    body {
      position: relative;
      height: 100%;
    }

    body {
      background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #000;
      margin: 0;
      padding: 0;
    }

    .swiper {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    } */

    .hoverClass:hover {
      color: #25ECE0 !important;
      cursor: pointer;
      transform: scale(105%);
    }
    </style>
