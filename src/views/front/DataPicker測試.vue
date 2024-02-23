<template>
票
  <!-- <v-container>

    <v-row>
      <v-col cols="12">
        <DatePicker v-model.range="range" :mode="mode" :rules="rules"  is24hr isDark >
          <template #default="{ inputValue, inputEvents }">
          <v-row>
            <v-col cols="6">
              開始
            <v-text-field :value="inputValue.start" v-on="inputEvents.start" />
            </v-col>
            <v-col cols="6">
              結束 <v-text-field :value="inputValue.end" v-on="inputEvents.end" />
            </v-col>
          </v-row>
        </template>
      </DatePicker>
    </v-col>

    <v-col cols="12">
      <input type="time"  min="00:00" max="23:59"  required />
    </v-col>
  </v-row>
</v-container> -->

  <!-- <v-row>

    <v-col cols="12">
      <DatePicker class="my-calendar" v-model.range="range" :mode="mode" :rules="rules"  is24hr isDark/>
    </v-col>

    <v-col>
      <v-date-picker
      v-model="selectedDateTime"
      @input="onDateTimeSelected"
      ></v-date-picker>
    </v-col>
  </v-row> -->
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const range = ref({
  start: new Date(),
  end: new Date()
})
const mode = ref('dateTime')
const rules = ref([
  {
    hours: { min: 0, max: 23 },
    minutes: { min: 0, max: 59 }
  }
])

</script>

<style scoped>
::deep .vc-title{
  color: #1f0707 !important;
}

.my-calendar .vc-weekday-1, .my-calendar .vc-weekday-7 {
  color: #6366f1;
}
</style>
