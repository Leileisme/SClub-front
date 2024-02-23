<template>
  <!-- 【後端通知】 -->
  <v-dialog v-model="localBackInfo" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">
        <span>{{ textBack }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @click="closeInfo" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 外層使用法 -->
  <!-- <TextBack :backInfo="backInfo" :textBack="textBack" :closeInfo="closeInfo" @update:backInfo="value => backInfo = value"></TextBack> -->
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  textBack: {
    type: String,
    required: true
  },
  closeInfo: {
    type: Function,
    required: true
  },
  backInfo: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:backInfo'])

const localBackInfo = computed({
  get: () => props.backInfo,
  set: (value) => emit('update:backInfo', value)
})

// 外層使用法

// const backInfo = ref(false)
// const textBack = ref('')
// const closeInfo = () => {
//   backInfo.value = false
// }
</script>
<style scoped>
</style>
