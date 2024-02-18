<template>
  <VDatePicker v-model.range="range" :mode="mode" :rules="rules" />
</template>

<script setup>
import { ref } from 'vue'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'

const range = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10)
})
const mode = ref('date')
const rules = ref([
  {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  },
  {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999
  }
])
</script>
