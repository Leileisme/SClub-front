<template>
  <v-divider :style="styles.dividerFirst"></v-divider>
  <v-list-item :style="styles.listItem">貼文收藏</v-list-item>
  <v-divider :style="styles.divider"></v-divider>
  <v-list-item :style="styles.listItem">喜歡的活動</v-list-item>
  <v-divider :style="styles.divider"></v-divider>
  <v-list-item :style="styles.listItem">限動典藏</v-list-item>
  <v-divider :style="styles.divider"></v-divider>
  <template v-if="user.IS_ADMIN">
    <v-list-item :style="styles.listItem" style="cursor: pointer;" to="/admin">管理員後台</v-list-item>
    <v-divider :style="styles.divider"></v-divider>
  </template>
  <v-list-item :style="styles.listItem" style="cursor: pointer;" @click="logout" >登出</v-list-item>
  <v-divider :style="styles.dividerLast"></v-divider>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { computed } from 'vue'

const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()
const { apiAuth } = useApi()

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
    required: false
  }
})

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
        marginTop: '6px',
        marginBottom: '6px'
      },
      divider: {
        marginTop: '6px',
        marginBottom: '6px'
      },
      dividerLast: {
        marginTop: '6px',
        marginBottom: '6px'
      },
      listItem: {
        fontSize: '1rem'
      }
    }
  }
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    router.push('/')
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
</script>
