<template >
  <template v-if="isXs">
      <v-app-bar>
        <VContainer class="d-flex align-center text-center ">
        <v-app-bar-title class="font-weight-black text-h5">註冊</v-app-bar-title>
      </VContainer>
      </v-app-bar>
  </template>

  <div style="height: 80%; width: 400px;" :style="boxBorder">
    <!-- 標題Logo -->
    <div class="mb-5
    ">
        <div class="text-center font-weight-bold text-h3 mt-9">LogoHere</div>
        <!-- 副標 -->
        <div class="text-center mt-5">
          <p>註冊馬上加入「學生社團」社群行列</p>
        </div>
  </div>
    <!-- 選單 -->
    <div>
      <v-form @submit.prevent>

        <!-- 第一頁 -->
        <v-row class="d-flex justify-center px-10">
        <!-- 單位 -->
        <v-col cols="12" class="mt-8">
          <v-combobox
            v-model="type.value"
            :items="type.items"
            label="註冊單位"
            variant="outlined"
          ></v-combobox>
        </v-col>

        <!-- 身分 -->
        <v-col cols="12">
          <template v-if="type.value==='個人'">
            <v-combobox
            v-model="person.value"
            :items="person.items"
            label="註冊身分"
            variant="outlined"
            ></v-combobox>
          </template>

          <template v-else-if="type.value==='團體'">
            <v-combobox
            v-model="group.value"
            :items="group.items"
            label="註冊身分"
            variant="outlined"
            ></v-combobox>
          </template>

          <template v-else>
            <v-combobox
            v-model="person.value"
            :items="person.items"
            label="註冊身分"
            variant="outlined"
            ></v-combobox>
          </template>
        </v-col>

        </v-row>

        <!-- 往第二頁按鈕 -->
        <v-row class="d-flex justify-center px-10">
          <v-col cols="8">
            <v-btn type="bottom" block class="mt-2 py-6 rounded-lg" style="background-color: #1BBCA9;">下一步</v-btn>
          </v-col>
        </v-row>

      </v-form>
    </div>
  </div>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, reactive } from 'vue'

// 判斷是否用手機
const { mobile, sm, xs } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)
// const vuetify = useVuetify()

const type = reactive({ items: ['個人', '團體'], value: ['個人'] })
const person = reactive({ items: ['學生', '非學生'] })
const group = reactive({ items: ['社團'] })

const boxBorder = computed(() => {
  if (isXs.value) {
    return 'border: none;'
  } else {
    return 'border: 1px solid #333;'
  }
})
</script>

<style lang="sass" scoped>
</style>
