<template>

      首頁

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

</script>

<style lang="sass" scoped>
.iconTop
  font-size: 1.4rem
</style>
