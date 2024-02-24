<template>
  <!-- 頂部導覽列 -->
  <template v-if="isXs">
  <v-app-bar>
    <v-container class="align-center justify-space-around d-flex">
      <v-btn icon="mdi-chevron-left" style="font-size: 1.4rem;" @click="goBack"></v-btn>
      <v-app-bar-title class="text-h5 text-center me-9"> 票券</v-app-bar-title>
    </v-container>
  </v-app-bar>
</template>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const goBack = () => {
  router.go(-1)
}
</script>
