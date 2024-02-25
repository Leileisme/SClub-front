<template>
  <!-- 【後端通知】 -->
  <v-dialog v-if="isBack" v-model="localInfoSwitch" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">
        <span>{{ InfoText }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @click="closeInfo" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 【通知】 -->
  <v-dialog v-else v-model="localInfoSwitch" max-width="290">
    <v-card class="rounded-lg">
      <v-card-title></v-card-title>
      <v-card-text class="headline text-center" style="font-size: 1.2rem;">
        <v-col v-if="InfoTitle" style="color:#1BBCA9 ;">{{ InfoTitle }}</v-col>
        <span>{{ InfoText }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  color="#1BBCA9" style="font-weight: 900;" @click="closeInfo" >關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 外層使用法 -->
  <!-- <InfoAll :InfoSwitch="InfoSwitch" :InfoText="InfoText" :InfoTitle="InfoTitle" :closeInfo="closeInfo" @update:InfoSwitch="value => InfoSwitch = value"></InfoAll> -->
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  InfoText: {
    type: String,
    required: true
  },
  closeInfo: {
    type: Function,
    required: true
  },
  InfoSwitch: {
    type: Boolean,
    required: true
  },
  isBack: {
    type: Boolean,
    default: false
  },
  InfoTitle: {
    type: String
  }
})

const emit = defineEmits(['update:InfoSwitch'])

const localInfoSwitch = computed({
  get: () => props.InfoSwitch,
  set: (value) => emit('update:InfoSwitch', value)
})

// 外層使用法

// const InfoSwitch = ref(false)
// const InfoTitle = ref('')
// const InfoText = ref('')
// const closeInfo = () => {
//   InfoSwitch.value = false
// }
</script>
<style scoped>
</style>
