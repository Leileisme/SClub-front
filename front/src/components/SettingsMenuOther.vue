<template>
  <v-divider :style="styles.dividerFirst"></v-divider>
  <v-list-item :style="styles.listItem">檢舉</v-list-item>
  <v-divider :style="styles.divider"></v-divider>
  <v-list-item :style="styles.listItem">分享檔案</v-list-item>
  <v-divider :style="styles.dividerLast"></v-divider>
</template>

<script setup>
import { computed } from 'vue'

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

</script>
