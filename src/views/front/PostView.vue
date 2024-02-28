<template>
  <v-container style="max-width: 800px;" class="d-flex justify-center">
    <v-row>
      <!-- 舊的搜尋列 -->
      <!-- <v-col cols="12">
      <v-text-field
        v-model="search"
        label="搜尋"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
        @input="getUserAll"
        id="searchBtn"
        style="position: relative;padding: 1rem;max-width: 800px;"
      >
        <v-list-item icon @click="clearSearch" v-if="search !== ''" style="position: absolute; right: 1rem;padding: 0; cursor: pointer;">
          <v-icon>mdi-close</v-icon>
        </v-list-item>
      </v-text-field>

      <v-menu activator="#searchBtn" >
        <v-list  style="max-height: 300px; overflow-y: auto;">

          <template v-if="searchResults.length > 0">
            <v-list-item
            v-for="(item) in searchResults"
            :key="item.id"
            :value="item.USER_NAME"
            :to="'/'+item.USER_NAME"
            >

            <template v-if="isXs">
              <v-row  style="margin: 5px; ">
                <v-col cols="3" class="d-flex justify-center align-center">
                  <v-avatar size="40"  >
                  <v-img  :src="item.IMAGE" cover></v-img>
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
                  <v-avatar size="45"  >
                  <v-img  :src="item.IMAGE" cover></v-img>
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

        <template v-else>
          <v-list-item>
            <v-list-item-title>無搜尋結果</v-list-item-title>
          </v-list-item>
        </template>
        </v-list>
      </v-menu>
      </v-col> -->

      <v-col  cols="8">
      <v-text-field
          v-model="search"
          label="使用者名稱"
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

      <v-col cols="12"  v-for="(item,idx) in  filteredUserAll.slice(0,number)" :key="idx">
        <v-card  class="rounded-lg" @click="router.push(`/${item.USER_NAME}`)">
          <v-card-item style="padding-left: 0; padding-top: 0;padding-bottom: 0;">
            <v-row style="margin:0;" >

              <v-col :cols="imgCols" class="text-center">
                <v-avatar size="90"  >
                <v-img  :src="item.IMAGE" cover></v-img>
              </v-avatar>
              </v-col>

              <v-col cols="8">
                <v-row>
                  <v-col cols="12">
                    <span class="me-2" style="font-size: 1.2rem;">{{ item.NICK_NAME }}</span>
                    <span v-if=" item.CLUB_TH" class="me-2">第 {{ item.CLUB_TH }} 屆</span>
                    <span style="color: #aaa;">( {{ item.USER_NAME }} )</span>
                  </v-col>

                  <v-col cols="12"  style=" font-size: 0.9rem;padding-top: 0;">
                    <span style="border: 1px solid #25ECE0; padding: 3px 10px; color: #FF6868;"  >
                      <span style="margin-right: 10px; font-weight: 900; color: #25ECE0;" >{{ item.SCHOOL_NAME }}</span>
                      <span>{{ item.SCHOOL_CITY }}</span>
                    </span>
                  </v-col>

                  <v-col cols="12" style="padding-top:0 ;">
                    <span style="color: #aaa;">{{ item.DESCRIBE }}</span>
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" style="color: #FF3333;text-align: right; padding-top:10px ;font-size: 1.2rem;">
        <span v-if="filteredUserAll.length>number" class="pe-2" style="cursor: pointer;" @click="addNumber">and more</span>
        <span v-else style="color: #25ECE0;">已經到底了（;≧皿≦）</span>
      </v-col>

    </v-row>
</v-container>
</template>

<script setup>
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'
import InfoAll from '@/components/InfoAll.vue'
import { computed, ref, onMounted, provide, watch } from 'vue'

const { xs } = useDisplay()
const isXs = computed(() => xs.value)
const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()

// 所有活動搜尋
const search = ref()
const searchData = ref('')
const city = ref()
const cityItems = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']
const number = ref(5)
const addNumber = () => {
  number.value += 5
}

// 依照日期近遠改變排序
const sortedEventAll = computed(() => {
  return eventAll.value.slice().sort((a, b) => {
    const dateA = a.DATE.split(' ')[0] // 分割日期和時間，並只取日期部分
    const dateB = b.DATE.split(' ')[0]
    return new Date(dateA) - new Date(dateB) // 將日期字符串轉換為 Date 物件並進行比較
  })
})

// 隨機出現
const randomUserAll = computed(() => {
  return [...userAll.value].sort(() => Math.random() - 0.5)
})

const filteredUserAll = computed(() => {
  return randomUserAll.value.filter(item => {
    let matchesSearch = true
    if (search.value) {
      matchesSearch = item.USER_NAME.includes(search.value) || item.NICK_NAME.includes(search.value)
    }

    let matchesCity = true
    if (city.value) {
      matchesCity = item.SCHOOL_CITY === city.value
    }

    return matchesSearch && matchesCity
  })
})

watch([search, city], () => {
  number.value = 5
})

const eventAll = ref([])

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

const imgCols = computed(() => {
  return isXs.value ? 4 : 2
})

// 使用者搜尋
const userAll = ref([])

const getUserAll = async () => {
  try {
    const { data } = await apiAuth.get('/users/getUser', {
      params: {
        role: '1,2,3'
      }
    })
    userAll.value = data.result.data
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

// const clearGetUserAll = () => {
//   search.value = ''
// }

onMounted(async () => {
  getUserAll()
})
</script>
