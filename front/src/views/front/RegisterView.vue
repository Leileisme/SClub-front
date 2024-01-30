<template >
  <template v-if="isXs">
      <v-app-bar fixed>
        <VContainer class="d-flex align-center text-center ">
        <v-app-bar-title class="font-weight-black text-h5">註冊</v-app-bar-title>
      </VContainer>
      </v-app-bar>
  </template>

  <div style="width: 400px;" :style="boxBorder" class="py-8" >
    <!-- 標題Logo -->
    <div class="mb-1" style="margin-top: -12%;">
        <div class="text-center font-weight-bold text-h3 mt-9">LogoHere</div>
  </div>
    <!-- 選單 -->
    <div>
      <v-form @submit.prevent>
        <v-row class="d-flex justify-center px-10" >
          <v-window v-model="tab" style="width: 90%;">
            <!-- 第一頁 -->
            <v-window-item value="one">
              <!-- 副標 -->
                <div class="text-center mt-5">
                  <p>註冊馬上加入「學生社團」社群行列</p>
                </div>
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

                <!-- 往第二頁的按鈕 -->
                <v-col cols="12" >
                    <v-btn type="button" block class="mt-2 py-6 rounded-lg" style="background-color: #1BBCA9;" @click="tab='two'">下一步</v-btn>
                </v-col>
            </v-window-item>

            <!-- 第二頁 -->
            <v-window-item value="two">
              <!-- 副標 -->
                <div class="text-center mt-5">
                  <p>註冊馬上加入「學生社團」社群行列</p>
                </div>
              <v-col cols="12" class="mt-8">
                <!-- 學校信箱 -->
                <v-text-field label="學校信箱" variant="outlined" density="comfortable"></v-text-field>
                <!-- 學號 -->
                <v-text-field label="學號" variant="outlined" density="comfortable"></v-text-field>
                <!-- 密碼 -->
                <v-text-field label="密碼" variant="outlined" density="comfortable"></v-text-field>
                <!-- 確認密碼 -->
                <v-text-field label="確認密碼" variant="outlined" density="comfortable"></v-text-field>
              </v-col>
              <!-- 往第二頁的按鈕 -->
              <v-col cols="12" >
                <v-btn type="button" block class="mt-2 py-6 rounded-lg" style="background-color: #1BBCA9;" @click="tab='three'">註冊</v-btn>
              </v-col>
              <!-- <v-icon class="d-flex align-self-end" >mdi-arrow-left-bottom</v-icon> -->

            </v-window-item>

            <!-- 第三頁 -->
            <v-window-item value="three">
              <v-col cols="12" class="mt-8">
                <!-- 學校 -->
                <v-text-field label="學校" variant="outlined"  density="compact"></v-text-field>
                <!-- 姓名 -->
                <v-text-field label="姓名" variant="outlined"  density="compact"></v-text-field>
                <!-- 檔案暱稱 -->
                <v-text-field label="檔案暱稱" variant="outlined"  density="compact"></v-text-field>
                <!-- 用戶名稱 -->
                <v-text-field label="用戶名稱" variant="outlined"  density="compact"></v-text-field>
                <!-- 出生日期 -->
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" min-width="290px" class="d-flex align-center justify-center">
                  <template v-slot:activator="{ attrs }">
                    <v-text-field   density="compact" variant="outlined" v-model="date" label="出生日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" @click="menu = !menu"></v-text-field>
                  </template>
                  <v-date-picker  type="date" v-model="rawDate" no-time no-title @input="menu = false">
                    <template v-slot:footer>
                      <v-btn color="primary" @click="menu = false">確定</v-btn>
                    </template>
                  </v-date-picker>
                </v-menu>
                <!-- 性別 -->
                <v-combobox
                  v-model="GENDER.value"
                  :items="GENDER.items"
                  density="compact"
                  label="性別"
                  variant="outlined"
                ></v-combobox>
                <!-- 手機 -->
                <v-text-field label="手機" variant="outlined"  density="compact"></v-text-field>
                <!-- 常用信箱 -->
                <v-text-field label="常用信箱" variant="outlined"  density="compact"></v-text-field>
              </v-col>
              <!-- 送出 -->
              <v-col cols="12" class="py-0">
                <v-btn type="submit" block class="mt-2 py-6 rounded-lg" style="background-color: #1BBCA9;">啟動帳號</v-btn>
              </v-col>
            </v-window-item>
          </v-window>
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

const tab = ref('one')

// 註冊 step1
const type = reactive({ items: ['個人', '團體'], value: ['個人'] })
const person = reactive({ items: ['學生', '非學生'] })
const group = reactive({ items: ['社團'] })
// 註冊 step3 - 出生日期
const menu = ref(false)
let rawDate = ref(null)

const formatDate = (value) => {
  const date = new Date(value)
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
const date = computed({
  get: () => formatDate(rawDate.value),
  set: (value) => rawDate.value = new Date(value)
})

const GENDER = reactive({ items: ['生理女', '生理男'] })

const boxBorder = computed(() => {
  if (isXs.value) {
    return 'border: none; '
  } else {
    return 'border: 1px solid #333;'
  }
})
</script>

<style lang="sass" scoped>
</style>
