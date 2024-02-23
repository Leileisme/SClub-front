<template>
        <!-- 分隔線 -->
        <BlankLine></BlankLine>

        <!-- 活動時間 -->
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-3">mdi-calendar-blank</v-icon>
          <span class="me-1">{{ routeEvent.YY_MM_DD }}</span>
          <span class="me-2">({{ WEEK }}) </span>
          <span>{{routeEvent.HOUR_START}}:{{ routeEvent.MINUTE_START }} - {{ routeEvent.HOUR_END }}:{{ routeEvent.MINUTE_END }}</span>
        </v-col>

        <!-- 活動地點 -->
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-3">mdi-map-marker</v-icon>
          <span class="me-3">{{ routeEvent.ADD }}</span>
          <span class="me-2" v-if="routeEvent.ADD_REMARK" >【 {{ routeEvent.ADD_REMARK }} 】</span>
        </v-col>

        <!-- 活動地點 -->
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-3" v-if="routeEvent.IS_PUBLIC === '公開'">mdi-earth</v-icon>
          <v-icon class="me-3" v-else>mdi-account-multiple</v-icon>
          <span class="me-3">{{ routeEvent.IS_PUBLIC }}</span>
          <span class="me-3" style="color: #aaa;">(榮譽分數需  {{ routeEvent.SCORE_VALUES }}  分含以上 )</span>
        </v-col>

        <!-- 預售票 / 現場票 -->
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-3">mdi-ticket-confirmation-outline</v-icon>
          <span class="me-1" >預售票： </span>
          <span :class="onSiteSale" class="me-1" style="color: #ffa011; font-weight: 900;">剩 {{ routeEvent.PRE_SALE - routeEvent.TICKET.length }} 張 </span>
          <span  class="me-1"> (共 {{ routeEvent.PRE_SALE }} 張) </span>
          <span class="me-3">,</span>
          <span class="me-1">現場票：{{ routeEvent.ON_SITE_SALE }} 張</span>

        </v-col>

        <!-- 分隔線 -->
        <BlankLine></BlankLine>
</template>
<script setup>
import { computed, inject } from 'vue'
import BlankLine from '@/components/BlankLine.vue'

const routeEvent = inject('routeEvent')

const onSiteSale = computed(() => {
  if (routeEvent.value.PRE_SALE - routeEvent.value.TICKET.length === 0) {
    return 'disabledText'
  } else {
    return ''
  }
})

const changeDateFormat = (value) => {
  return value.replace(/\//g, '-')
}

const getDayOfWeek = (value) => {
  const date = new Date(value)
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return days[date.getDay()]
}

const WEEK = computed(() => {
  const formattedDate = changeDateFormat(routeEvent.value.YY_MM_DD)
  return getDayOfWeek(formattedDate)
})

// const preTicketAll = computed(()=>{
//   // return routeEvent.PRE_SALE - routeEvent.TICKET.USER.length
// })

</script>
<style scoped>
</style>
