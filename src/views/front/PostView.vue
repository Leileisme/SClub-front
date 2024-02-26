<template>
  <v-container style="max-width: 800px;" class="d-flex justify-center">
    <v-row>
      <v-col cols="12">
      <!-- 搜尋列 -->
      <v-text-field
        v-model="search"
        label="搜尋"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
        @input="searchData"
        id="searchBtn"
        style="position: relative;padding: 1rem;max-width: 800px;"
      >
        <v-list-item icon @click="clearSearch" v-if="search !== ''" style="position: absolute; right: 1rem;padding: 0; cursor: pointer;">
          <v-icon>mdi-close</v-icon>
        </v-list-item>
      </v-text-field>
      <!-- 搜尋結果列 -->
      <v-menu activator="#searchBtn" >
        <v-list>
          <!-- 搜尋有符合 -->
          <template v-if="searchResults.length > 0">
            <v-list-item
            v-for="(item) in searchResults"
            :key="item.id"
            :value="item.USER_NAME"
            :to="'/'+item.USER_NAME"
            >

            <!-- xs 手機版 搜尋清單 -->
            <template v-if="isXs">
              <v-row  style="margin: 5px; ">
                <v-col cols="3" class="d-flex justify-center align-center">
                  <v-avatar size="100%"  >
                  <v-img  :src="item.IMAGE"></v-img>
                </v-avatar>
                </v-col>
                <v-col cols="9"  class="d-flex justify-center align-center">
                  <v-row >
                    <v-col cols="12" style="padding: 0; margin: 0;font-size: 1.1rem;color: #25ECE0;"  >{{ item.USER_NAME }}</v-col>
                    <v-col cols="12" style="padding: 0;margin: 0; font-size: 0.8rem;color: #cccccc;">{{ item.NICK_NAME }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>

            <template v-else>
              <v-row  style="margin: 5px; ">
                <v-col cols="1" class="d-flex justify-center align-center me-3"  style="height: 45px;">
                  <v-avatar size="220%"  >
                  <v-img  :src="item.IMAGE"></v-img>
                </v-avatar>
                </v-col>
                <v-col cols="9"  class="d-flex justify-center align-center">
                  <v-row >
                    <v-col cols="12" style="padding: 0; margin: 0;font-size: 1.1rem;color: #25ECE0;"  >{{ item.USER_NAME }}</v-col>
                    <v-col cols="12" style="padding: 0;margin: 0; font-size: 0.8rem;color: #cccccc;">{{ item.NICK_NAME }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>

            <v-divider></v-divider>
          </v-list-item>
        </template>

        <!-- 無搜尋符合 -->
        <template v-else>
          <v-list-item>
            <v-list-item-title>無搜尋結果</v-list-item-title>
          </v-list-item>
        </template>
        </v-list>
      </v-menu>
      </v-col>

      <v-col cols="12">
        <v-carousel style="height: 200px;"  hide-delimiters  show-arrows="hover">
          <template v-for="(item,idx) in eventAll.slice(0,3)" :key="idx">
          <v-carousel-item
            :src=item.IMAGE
            cover
          ></v-carousel-item>
        </template>
        </v-carousel>

      </v-col>
    </v-row>
</v-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'
import { useEmitter } from '@/composables/mitt'
import InfoAll from '@/components/InfoAll.vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

// 所有活動搜尋
// const search = ref()
// const searchData = ref('')
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

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

const closeInfo = () => {
  InfoSwitch.value = false
}

const swiperTopStyle = computed(() => {
  return isXs.value ? 'height: 250px;' : 'height: 310px;'
})

const swiperSlideStyle = computed(() => {
  return isXs.value ? 'height: 180px;' : 'height: 300px;'
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
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const search = ref('')
const searchResults = ref([])

const searchData = async () => {
  try {
    const { data } = await apiAuth.get('/users/getUser', {
      params: {
        search: search.value,
        role: '1,2,3'
      }
    })
    searchResults.value = data.result.data
    console.log(data, 'data')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

const clearSearch = () => {
  search.value = ''
}

</script>
