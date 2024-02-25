<template>

  <template v-if="routeEvent.HOST._id === user._id || routeEvent.CO_ORGANIZER.some(coOrganizer => coOrganizer._id === user._id)">
    <v-divider :style="styles.dividerFirst"></v-divider>
    <v-list-item :style="styles.listItem">編輯</v-list-item>
    <v-divider :style="styles.divider"></v-divider>
    <v-list-item :style="styles.listItem">分享</v-list-item>
    <v-divider :style="styles.divider"></v-divider>
    <v-list-item :style="styles.listItem" @click="goTicketUsed">登記票券</v-list-item>
    <v-divider :style="styles.divider"></v-divider>
    <v-list-item :style="styles.listItem" @click="deleteItem">刪除</v-list-item>
    <v-divider :style="styles.dividerLast"></v-divider>
  </template>

  <template v-else>
    <v-divider :style="styles.dividerFirst"></v-divider>
    <v-list-item :style="styles.listItem">檢舉</v-list-item>
    <v-divider :style="styles.divider"></v-divider>
    <v-list-item :style="styles.listItem">分享</v-list-item>
    <v-divider :style="styles.dividerLast"></v-divider>
  </template>

  <!-- 【通知】後端訊息 -->
  <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>

<!-- 【通知】刪除成功 -->
<InfoAll :InfoSwitch="InfoSwitchTicketOk" :InfoText="InfoTextTicketOk" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitchTicketOk = value"></InfoAll>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { computed, inject, ref } from 'vue'
import { useEmitter } from '@/composables/mitt'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const { apiAuth } = useApi()
const routeEvent = inject('routeEvent')
const emitter = useEmitter()

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
    required: false
  }
})

const goTicketUsed = () => {
  router.push(`/event/${route.params.id}/ticketUsed`)
}

const styles = computed(() => {
  if (props.isMobile) {
    return {
      dividerFirst: {
        marginTop: '30px',
        marginBottom: '15px'
      },
      divider: {
        marginTop: '15px',
        marginBottom: '15px'
      },
      dividerLast: {
        marginTop: '15px',
        marginBottom: '30px'
      },
      listItem: {
        fontSize: '1.2rem'
      }
    }
  } else {
    return {
      dividerFirst: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      divider: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      dividerLast: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      listItem: {
        fontSize: '1rem'
      }
    }
  }
})

// 後端通知
const InfoSwitch = ref(false)
const InfoText = ref('')

// 通知
const InfoSwitchTicketOk = ref(false)
const InfoTextTicketOk = ref('刪除成功！')

const closeInfo = () => {
  InfoSwitch.value = false
  InfoSwitchTicketOk.value = false
}

const deleteItem = async () => {
  try {
    console.log(route.params.id)
    await apiAuth.delete(`/events/${route.params.id}`)
    // 先不要通知外面更新
    // emitter.emit('updateEvent')
    router.push('/')
    InfoSwitchTicketOk.value = true
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    InfoText.value = text
    InfoSwitch.value = true
  }
}

</script>
