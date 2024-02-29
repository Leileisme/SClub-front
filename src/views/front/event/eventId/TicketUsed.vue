<template>
  <v-container>
    <v-row>
      <!-- <v-col cols="12" style="font-size: 1.5rem;padding-bottom: 0;margin-top: 1.5rem;">票券使用一覽</v-col> -->

      <!-- 線 -->
      <BlankLine style="margin-top: 1rem;"></BlankLine>

      <!-- 票券登記 -->
      <v-col cols="12">
        <span style="color:#25ECE0 ;" class=" font-weight-bold">登記票券</span>
      </v-col>

      <!-- 票券輸入欄 -->
      <v-col cols="12" style="padding-top:0 ;padding-bottom: 0;">
        <v-form @submit.prevent="submit"  :disabled="isSubmitting">
          <v-row class="d-flex justify-center" >
            <v-col cols="9">
            <v-text-field
              v-model="ticketId.value.value"
              :error-messages="ticketId.errorMessage.value"
              label="輸入票券編號"
              type="text"
              counter
              color="#25ECE0"
              variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="3" style="margin-top: 5px;">
            <v-btn type="submit"
              block class=" rounded-lg "
              style="background-color: #1BBCA9; font-weight: 900; height: 45px;">
              確定
            </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <!-- 線 -->
      <BlankLine></BlankLine>

      <v-col cols="12" style="color:#25ECE0 ;" class=" font-weight-bold">
        未入場名單
        <span  style="color: #aaa;">( 共 {{ routeEvent.TICKET.filter(item => item.USED === TicketUseState.N_USE).length }} 人 )</span>
      </v-col>
      <v-col cols="12">

          <div v-for="(item,idx) in routeEvent.TICKET.filter(item => item.USED === TicketUseState.N_USE)" :key="idx">
            <v-row >
              <v-col cols="1"> {{idx+1}}.</v-col>
              <v-col cols="1" class="d-flex justify-center align-center me-3"  style="height: 55px;">
                <v-avatar size="35"  >
                <v-img  :src="item.USER.IMAGE" cover></v-img>
              </v-avatar>
              </v-col>
              <v-col cols="9"  class="d-flex justify-center align-center">
                <v-row >
                  <v-col cols="12" style="padding: 0;margin: 0;">{{ item.USER.NICK_NAME }} ({{ item.USER.USER_NAME }})</v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
      </v-col>

      <v-col cols="12" style="color:#25ECE0 ;" class=" font-weight-bold">
        已入場名單
        <span  style="color: #aaa;">( 共 {{ routeEvent.TICKET.filter(item => item.USED === TicketUseState.USED).length }} 人 )</span>
      </v-col>
      <v-col cols="12">
          <div v-for="(item,idx) in routeEvent.TICKET.filter(item => item.USED === TicketUseState.USED)" :key="idx">
            <v-row >
              <v-col cols="1"> {{idx+1}}.</v-col>
              <v-col cols="1" class="d-flex justify-center align-center me-3"  style="height: 55px;">
                <v-avatar size="35"  >
                <v-img  :src="item.USER.IMAGE"></v-img>
              </v-avatar>
              </v-col>
              <v-col cols="9"  class="d-flex justify-center align-center">
                <v-row >
                  <v-col cols="12" style="padding: 0;margin: 0;">{{ item.USER.NICK_NAME }} ({{ item.USER.USER_NAME }})</v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
      </v-col>

    </v-row>
  </v-container>

  <InfoAll :InfoSwitch="InfoSwitchTicketOk" :InfoText="InfoTextTicketOk"  :closeInfo="closeInfo" @update::InfoSwitch="value => InfoSwitchTicketOk = value"></InfoAll>
  <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText"  :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>

</template>
<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted, inject } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import BlankLine from '@/components/BlankLine.vue'
import InfoAll from '@/components/InfoAll.vue'
import TicketUseState from '@/enums/TicketUseState'
import { useEmitter } from '@/composables/mitt'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const { apiAuth } = useApi()
const routeEvent = inject('routeEvent')
const emitter = useEmitter()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const schema = yup.object({
  ticketId: yup
    .string()
    .required('票券編號必填')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const ticketId = useField('ticketId')

const submit = handleSubmit(async (values) => {
  try {
    const response = await apiAuth.patch('/events/' + route.params.id + '/useTicket', {
      ticketId: values.ticketId,
      used: TicketUseState.USED
    })

    const USER_NAME = response.data.USER_NAME

    await apiAuth.patch('/users/usedTicket', {
      USER_NAME,
      TICKET_CART: {
        TICKET: values.ticketId,
        USED: TicketUseState.USED
      }
    })
    await user.getProfile()
    emitter.emit('updateEvent')

    emitter.on('updateEventOk', async () => {
    // 登記成功
      InfoSwitchTicketOk.value = true
      ticketId.value.value = ''
    })
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    InfoText.value = text
    InfoSwitch.value = true
  }
})

// 通知
const InfoSwitchTicketOk = ref(false)
const InfoTextTicketOk = ref('登記成功！')

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

const closeInfo = () => {
  InfoSwitch.value = false
  InfoSwitchTicketOk.value = false
}

onMounted(async () => {

})
</script>

<style scoped>
  .boxHeigh {
    display: flex;
    justify-content: center;
    align-items: center;
  }

@media(max-height:600px) {
  .boxHeigh {
    align-items: flex-start !important;
    margin: 3rem;
    margin-bottom: 5rem;
  }
  }

</style>
