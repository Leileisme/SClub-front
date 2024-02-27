<template>
  <!-- 協辦單位 -->
  <v-card class="rounded-lg" style="max-width: 400px;">
    <v-card-item>
      <v-row style="padding-top: 3px; padding-bottom: 3px;" class="d-flex align-center"  >
        <!-- 大頭 -->
        <v-col cols="3" >
            <v-avatar size="75"  @click="goUserName" style="cursor: pointer;" >
              <v-img  :src="item.IMAGE" cover></v-img>
            </v-avatar>
        </v-col>

        <v-col cols="9" style="">
          <v-row>
            <!-- 社團名稱 -->
            <v-col cols="8"  class="d-flex align-center" @click="goUserName" style="cursor: pointer;color: #25ECE0;">
              <span class="me-2" style="font-size: 1.1rem;">{{ item.NICK_NAME }}</span>
              <span class="" style="font-size: 1rem;">第{{ item.CLUB_TH }}屆</span>
            </v-col>
            <!-- 追蹤 -->
            <v-col cols="4" class="d-flex align-center">
              <v-btn color="#1BBCA9" style="height:30px;">追蹤</v-btn>
            </v-col>
            <!-- 社團介紹 -->
            <v-col cols="10" style="padding-top:0;">{{ item.DESCRIBE }} </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  item: {
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
        DESCRIBE: ('')
      }
    }
  }
})

const goUserName = () => {
  if (props.item.USER_NAME) {
    router.push(`/${props.item.USER_NAME}`)
  } else {
    console.error('props.item.USER_NAME is not defined or empty')
  }
}

</script>
<style scoped>
</style>
