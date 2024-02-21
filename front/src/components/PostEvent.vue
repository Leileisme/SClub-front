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
            <template v-if="routeUser.EVENTS_ID.length !== 0">
              <template v-for="item in routeEvent" :key="item._id" >
                <v-col cols="3" style="background: rgba(6, 50, 107,0);padding-right: 0;">
                <span class="me-1">{{ item.dateParts.month }}</span>
                <span class="me-1"  style="font-size: 0.7rem;">月</span>
                <span class="me-1">{{ item.dateParts.day }}</span>
                <span class="me-1" style="font-size: 0.7rem;">日</span>
                </v-col>

                <v-col cols="7" @click="$router.push(`/event/${item._id}`)" style="cursor: pointer;" class="title">{{ item.TITLE }}</v-col>

                <v-col cols="1"  class="d-flex justify-center">
                  <v-icon style=" " color="#fff ">mdi-camera</v-icon>
                </v-col>
                <v-col cols="1" class="d-flex justify-center" style="cursor: pointer;">
                  <EventMenu v-if="isXs" isMobile ></EventMenu>
                  <EventMenu v-else ></EventMenu>

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
        <v-col cols="12" style="font-size: 0.9rem; color: #ccc;padding-top: 0px; padding-bottom: 0;" >{{ new Date().getFullYear() }}</v-col>
        <v-col cols="12">
          <div style="font-size: 1.3rem;color: #ccc;">目前無活動參加紀錄</div>
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
import EventMenu from '@/components/EventMenu.vue'

const user = useUserStore()
const tab = ref('')

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const colorOne = computed(() => {
  return tab.value === 'one' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorTwo = computed(() => {
  return tab.value === 'two' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

const colorThree = computed(() => {
  return tab.value === 'three' ? 'color:#25ECE0; border:1.8px #25ECE0 solid;' : 'color:#fff; border:1.8px rgba(204,204,204,0.5) solid;'
})

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
        EVENTS_ID: ([])
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
.title:hover{
color: #25ECE0;
text-shadow: #25ECE0 0px 0px 1.2px;
  }
</style>
