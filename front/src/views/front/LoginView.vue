<template>
<template v-if="isXs">
      <v-app-bar >
        <VContainer class="d-flex align-center text-center">
        <v-app-bar-title class="font-weight-black text-h5">登入</v-app-bar-title>
      </VContainer>
      </v-app-bar>
  </template>

  <div style="width: 400px; position: relative;" :style="boxBorder" class="py-8 text-center" >
    <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);">登入</div>
    <!-- 標題Logo -->
    <div class="mb-1">
        <div class="text-center font-weight-bold text-h3">LogoHere</div>
        <div class="text-center mt-5">
          <p>註冊馬上加入「學生社團」社群行列</p>
        </div>
    </div>
    <!-- 選單 -->
    <div>
      <v-form @submit.prevent>
        <v-row class="d-flex justify-center w-100 mx-auto" >
          <v-col cols="12"></v-col>
          <v-col cols="12">
            <v-text-field
            label="信箱"
            type="email"
            maxlength="40"
            counter
            variant="outlined"
            density="comfortable"></v-text-field>
          </v-col>
          <v-col cols="12" >
            <v-btn type="submit" block class="mt-2 py-6 rounded-lg text-blod" style="background-color: #1BBCA9;">下一步</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, reactive } from 'vue'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const boxBorder = computed(() => {
  if (isXs.value) {
    return 'border: none; '
  } else {
    return 'border: 1px solid #333;'
  }
})
</script>
