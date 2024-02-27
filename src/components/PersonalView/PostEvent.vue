<template>
  <template v-if="routeUser.ROLE === UserRole.CLUB">
    <!-- 動態/活動 -->
    <v-col cols="12" >
      <v-tabs
        v-model="tab"
        align-tabs="start">
        <v-tab value="one" class="rounded-ts-xl me-2" style=" min-width: 80px;" :style="colorOne">動態</v-tab>
        <v-tab value="two" class="rounded-ts-xl me-2" style=" min-width: 80px;" :style="colorTwo">主辦活動</v-tab>
        <v-tab value="three" class="rounded-ts-xl" style=" min-width: 80px;" :style="colorThree">活動紀錄</v-tab>
      </v-tabs>
      <v-divider color="#fff" class="border-opacity-50"></v-divider>
    </v-col>

    <v-window v-model="tab" style="width:100%; " >
      <!-- 貼文 -->
      <!-- <v-window-item value="one">
        <v-col cols="12" >
        <v-row >
          <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex"
            cols="4"
            style="padding: 2px;"
          >
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
      </v-window-item> -->

    <!-- 活動 -->
      <v-window-item value="two">
        <v-col cols="12">
          <v-row>
            <!-- 主辦活動 -->
            <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
            <template v-if="routeUser.MAKE_EVENTS_ID.length !== 0">
              <template v-for="item in sortedRouteEvent" :key="item._id" >

                <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
                <span class="me-1">{{ item.dateParts.month }}</span>
                <span class="me-1"  style="font-size: 0.7rem;">月</span>
                <span class="me-1">{{ item.dateParts.day }}</span>
                <span class="me-1" style="font-size: 0.7rem;">日</span>
                </v-col>

                <v-col cols="7" @click="$router.push(`/event/${item._id}`)"  class="textHover">{{ item.TITLE }}</v-col>

                <v-col cols="1"  class="d-flex justify-center textHover">
                  <v-icon >mdi-camera</v-icon>
                </v-col>
                <v-col cols="1" class="d-flex justify-center textHover">
                  <EventMenu v-if="isXs" isMobile  :itemId="item._id" ></EventMenu>
                  <EventMenu v-else  :itemId="item._id"></EventMenu>
                </v-col>
              </template>
            </template>

            <v-col cols="12" v-else>
              <AddEvent v-if="routeUser.USER_NAME === user.USER_NAME"></AddEvent>
              <div v-else style="font-size: 1.3rem;color: #ccc;">目前無活動</div>
            </v-col>
          </v-row>
        </v-col>
      </v-window-item>

        <!-- 活動 -->
        <v-window-item value="three">
          <v-col cols="12">
          <v-row>
            <!-- 參加活動 -->
            <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
            <template v-if="routeUser.TICKET_CART.length !== 0">
              <template v-for="item in sortedRouteTicketCart.filter(item => item.USED === 1)" :key="item._id" >
                <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
                <span class="me-1">{{ formatDate(item.EVENT.DATE).month }}</span>
                <span class="me-1"  style="font-size: 0.7rem;">月</span>
                <span class="me-1">{{ formatDate(item.EVENT.DATE).day }}</span>
                <span class="me-1" style="font-size: 0.7rem;">日</span>
                </v-col>

                <v-col cols="7" @click="$router.push(`/event/${item.EVENT._id}`)"  class="textHover">{{ item.EVENT.TITLE }}</v-col>

                <v-col cols="1"  class="d-flex justify-center textHover">
                  <v-icon >mdi-camera</v-icon>
                </v-col>
                <v-col cols="1" class="d-flex justify-center textHover" >
                  <EventMenu v-if="isXs" isMobile  :itemId="item._id" :joinEvent="true"></EventMenu>
                  <EventMenu v-else  :itemId="item._id"  :joinEvent="true"></EventMenu>

                </v-col>
              </template>
            </template>

            <v-col cols="12" v-if="sortedRouteTicketCart.filter(item => item.USED === 1).length ===0">
              <div style="font-size: 1.3rem;color: #ccc;">目前無活動</div>
            </v-col>
          </v-row>
        </v-col>
      </v-window-item>
    </v-window>
  </template>

  <template v-else>
    <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
    <v-col cols="12">
      <div style="font-size: 1.3rem;color: #ccc;">目前無活動參加紀錄</div>
    </v-col>
  </template>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user'
import UserRole from '@/enums/UserRole'
import AddEvent from '@/components/AddEvent.vue'
import EventMenu from '@/components/PersonalView/EventMenu.vue'

const user = useUserStore()
const tab = ref('')

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

// 【主辦活動】依照日期改變排序
const sortedRouteEvent = computed(() => {
  return props.routeEvent.slice().sort((a, b) => {
    const dateA = a.DATE.split(' ')[0] // 分割日期和時間，並只取日期部分
    const dateB = b.DATE.split(' ')[0]
    return new Date(dateB) - new Date(dateA) // 將日期字符串轉換為 Date 物件並進行比較
  })
})

// 參加活動
const sortedRouteTicketCart = computed(() => {
  return props.routeUser.TICKET_CART.slice().sort((a, b) => {
    const dateA = a.EVENT.DATE.split(' ')[0] // 分割日期和時間，並只取日期部分
    const dateB = b.EVENT.DATE.split(' ')[0]
    return new Date(dateB) - new Date(dateA) // 將日期字符串轉換為 Date 物件並進行比較
  })
})

const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorThree = computed(() => {
  return tab.value === 'three' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

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

const props = defineProps({
  routeUser: {
    type: Object,
    default: () => {
      return {
        EMAIL: (''),
        ROLE: (''),
        SCHOOL_NAME: (''),
        SCHOOL_CITY: (''),
        USER_NAME: (''),
        NICK_NAME: (''),
        CLUB_TH: (''),
        CLUB_CATEGORY: (''),
        IMAGE: (''),
        TICKET_CART: ([]),
        SCORES: (''),
        NOTIFY: ([]),
        KEEP_POST: ([]),
        KEEP_EVENT: ([]),
        FANS: ([]),
        FOLLOW: ([]),
        IS_STUDENT: (''),
        IS_ABLE: (''),
        IS_ADMIN: (''),
        DESCRIBE: (''),
        MAKE_EVENT: ([]),
        MAKE_POST: ([]),
        MAKE_TIME_POST: ([]),
        GO_EVENT: ([]),
        BE_MARK: ([]),
        IS_CORE_MEMBER: ([]),
        MAKE_EVENTS_ID: ([])
      }
    }
  },
  routeEvent: {
    type: Array,
    default: () => []
  }
})

</script>

<style scoped>
.textHover:hover{
color: #25ECE0;
text-shadow: #25ECE0 0px 0px 1.2px;
cursor: pointer;
  }
</style>
