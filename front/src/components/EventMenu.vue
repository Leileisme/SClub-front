<template>
  <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" color="#fff">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-divider :style="styles.dividerFirst"></v-divider>
        <v-list-item :style="styles.listItem">編輯</v-list-item>
        <v-divider :style="styles.divider"></v-divider>
        <v-list-item :style="styles.listItem">分享</v-list-item>
        <v-divider :style="styles.dividerLast"></v-divider>
      </v-list>
    </v-menu>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { computed } from 'vue'

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

</script>
