<template>
  <!-- 協辦單位 -->
  <v-card   variant="outlined" class="rounded-xl" >
    <v-card-item>
      <v-card-title>
        <v-row>
          <!-- 大頭 -->
          <v-col cols="3"  class="d-flex justify-center align-center" >
            <v-avatar size="90%"  @click="goUserName" style="cursor: pointer;">
              <v-img  :src="item.IMAGE"></v-img>
            </v-avatar>
          </v-col>

          <v-col cols="6"  class="d-flex align-center" @click="goUserName" style="cursor: pointer;">
            <span class="me-2" style="font-size: 1.2rem;">{{ item.NICK_NAME }}</span>
            <span class="" style="font-size: 1rem;">第{{ item.CLUB_TH }}屆</span>
          </v-col>

          <!-- 追蹤 -->
          <v-col cols="3" class="d-flex align-center" >
            <v-btn color="#1BBCA9" style="height: 30px ;">追蹤</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card-item>
    <!-- 主辦單位介紹 -->
    <v-card-text>
      {{ item.DESCRIBE }}
    </v-card-text>
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
    console.log(props.item.USER_NAME, 'props.item.USER_NAME')
    console.error('props.item.USER_NAME is not defined or empty')
  }
}

</script>
<style scoped>
</style>
