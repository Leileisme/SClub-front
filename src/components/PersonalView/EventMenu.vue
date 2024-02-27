<template>
  <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props"  class="textHover">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-divider :style="styles.dividerFirst"></v-divider>
        <template v-if="!joinEvent">
        <v-list-item :style="styles.listItem">編輯</v-list-item>
        <v-divider :style="styles.divider"></v-divider>
      </template>
        <v-list-item :style="styles.listItem">分享</v-list-item>
        <template v-if="!joinEvent">
          <v-divider :style="styles.divider"></v-divider>
          <v-list-item :style="styles.listItem" @click="deleteItem">刪除</v-list-item>
        </template>
        <v-divider :style="styles.dividerLast"></v-divider>
      </v-list>
    </v-menu>
  </div>
  <!-- 【通知】後端訊息 -->
  <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll>

  <!-- 【通知】刪除成功 -->
  <InfoAll :InfoSwitch="InfoSwitchTicketOk" :InfoText="InfoTextTicketOk" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitchTicketOk = value"></InfoAll>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { computed, ref } from 'vue'
import InfoAll from '@/components/InfoAll.vue'
import { useEmitter } from '@/composables/mitt'

const router = useRouter()
const user = useUserStore()
const { apiAuth } = useApi()
const emitter = useEmitter()

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
    required: false
  },
  itemId: {
    type: String,
    default: '',
    required: true
  },
  joinEvent: {
    type: Boolean,
    default: false,
    required: false
  }
})

const styles = computed(() => {
  if (props.isMobile) {
    return {
      dividerFirst: {
        marginTop: '5px',
        marginBottom: '0px'
      },
      divider: {
        marginTop: '0px',
        marginBottom: '0px'
      },
      dividerLast: {
        marginTop: '0px',
        marginBottom: '5px'
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
    await apiAuth.delete(`/events/${props.itemId}`)
    emitter.emit('updateUser')
    InfoSwitchTicketOk.value = true
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    InfoText.value = text
    InfoSwitch.value = true
  }
}

</script>

<style scoped>
.textHover:hover{
color: #25ECE0;
text-shadow: #25ECE0 0px 0px 1.2px;
cursor: pointer;
  }
</style>
