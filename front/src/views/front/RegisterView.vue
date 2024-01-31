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
      <v-row class="d-flex justify-center w-100 mx-auto" >
        <v-window v-model="tab" style="width: 90%;">
        <!-- 第一頁 -->
        <v-form @submit.prevent="submitOne" :disabled="form1.isSubitting">
          <v-window-item value="one">
              <!-- 副標 -->
                <div class="text-center mt-5">
                  <p>註冊馬上加入「學生社團」社群行列</p>
                </div>
                <!-- 單位 -->
                <v-col cols="12" class="mt-8">
                <v-select
                  v-model="type.selected"
                  :items="type.items"
                  item-title="text"
                  item-value="value"
                  label="註冊單位"
                  variant="outlined"
                  @update:model-value="role.value.value = undefined"
                ></v-select>
                </v-col>

                <!-- 身分 -->
                <v-col cols="12">
                  <!-- 這個判斷方式也可以直接寫在 template 裡面，EX: 信箱 -->
                  <v-select
                    v-model="role.value.value"
                    :items="type.selected ==='個人' ? roleItems.items : type.selected ==='團體' ? group.items : []"
                    item-title="text"
                    item-value="value"
                    label="註冊身分"
                    variant="outlined"
                    :disabled="!type.selected"
                    :error-messages="role.errorMessage.value"
                  ></v-select>
                </v-col>

                <!-- 往第二頁的按鈕 -->
                <v-col cols="12" >
                  <v-btn type="submit" block class="mt-2 py-6 rounded-lg text-blod" style="background-color: #1BBCA9;">下一步</v-btn>
                </v-col>
          </v-window-item>
        </v-form>
          <!-- 第二頁 -->
        <v-form @submit.prevent="submitTwo" :disabled="form2.isSubitting">
          <v-window-item value="two">
              <!-- 副標 -->
                <div class="text-center mt-5">
                  <p>註冊馬上加入「學生社團」社群行列</p>
                </div>
              <v-col cols="12" class="mt-8">
                <!-- 學校信箱 -->
                <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                :label="emailLabel"
                type="email"
                maxlength="40"
                counter variant="outlined"
                density="comfortable"></v-text-field>

                <!-- <v-text-field
                v-else
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="信箱"
                type="email"
                maxlength="40"
                counter variant="outlined"
                density="comfortable"></v-text-field> -->

                <!-- 學號 -->
                <v-text-field
                v-model="studentNo.value.value"
                :error-messages="studentNo.errorMessage.value"
                label="學號"
                maxlength="20"
                variant="outlined"
                density="comfortable"></v-text-field>
                <!-- 密碼 -->
                <v-text-field
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                minlength="6"
                maxlength="20"
                type="password"
                label="密碼"
                variant="outlined"
                density="comfortable"></v-text-field>
                <!-- 確認密碼 -->
                <v-text-field
                v-model="passwordConfirm.value.value"
                :error-messages="passwordConfirm.errorMessage.value"
                minlength="6"
                maxlength="20"
                type="password"
                label="確認密碼"
                variant="outlined"
                density="comfortable"></v-text-field>
              </v-col>

              <!-- 往第三頁的按鈕 -->
              <v-col cols="12" >
                <v-row>
                  <v-col cols="4" >
                    <v-btn type="button" block class="mt-2  rounded-lg" style="background-color: #FF8484;height: 60px;" @click="tab='one'">上一步</v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn type="submit" block class="mt-2  rounded-lg" style="background-color: #1BBCA9;height: 60px;">下一步</v-btn>
                  </v-col>
                </v-row>
              </v-col>
          </v-window-item>
        </v-form>
        <!-- 第三頁 -->
        <v-form @submit.prevent>
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
                <!-- <v-select
                  v-model="..."
                  :items="genderValue.items"
                  item-title="text"
                  item-value="value"
                  density="compact"
                  label="性別"
                  variant="outlined"
                ></v-select> -->
                <!-- 手機 -->
                <v-text-field label="手機" variant="outlined"  density="compact"></v-text-field>
                <!-- 常用信箱 -->
                <v-text-field label="常用信箱" variant="outlined"  density="compact"></v-text-field>
              </v-col>
              <!-- 送出 -->
              <v-col cols="12" >
                <v-row>
                  <v-col cols="4" >
                    <v-btn type="button" block class="mt-2  rounded-lg" style="background-color: #FF8484;height: 60px;" @click="tab='two'">上一步</v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn type="submit" block class="mt-2  rounded-lg" style="background-color: #1BBCA9;height: 60px;" @click="tab='three'">註冊成功</v-btn>
                  </v-col>
                </v-row>
              </v-col>
          </v-window-item>
        </v-form>
    </v-window>
    </v-row>
    </div>
  </div>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, reactive } from 'vue'
// vee-validate 表單驗證庫
// useForm 是一個用於創建表單驗證的函數
// useField 是一個用於創建表單欄位驗證的函數
// 在前端進行驗證，並顯示錯誤訊息，不會阻止表單送出到後端
import { useForm, useField } from 'vee-validate'
// 靜態方法來驗證字符
import validator from 'validator'
// JS物件模式驗證器，這裡創建表單驗證的規則
import * as yup from 'yup'
import UseRole from '@/enums/UserRole.js'

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)
// RWD 樣式
const boxBorder = computed(() => {
  if (isXs.value) {
    return 'border: none; '
  } else {
    return 'border: 1px solid #333;'
  }
})

// 翻頁預設
const tab = ref('one')
// 註冊 - 下拉選單
const type = reactive({
  selected: null,
  items: [
    { text: '個人', value: '個人' },
    { text: '團體', value: '團體' }
  ]
})

const roleItems = {
  items: [
    { text: '學生', value: UseRole.STUDENT },
    { text: '非學生', value: UseRole.NOT_STUDENT }
  ]
}

const roleNull = {
  items: [
    { text: '', value: '' }
  ]
}

const group = {
  items: [
    { text: '社團', value: UseRole.CLUB }
  ]
}

const genderValue = {
  items: [
    { text: '生理女', value: '生理女' },
    { text: '生理男', value: '生理男' }
  ]
}

// 註冊 - 日曆/轉換日期格式
const menu = ref(false)
const rawDate = ref(null)

const formatDate = (value) => {
  const date = new Date(value)
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const date = computed({
  // 用於計算和返回屬性的值
  get: () => formatDate(rawDate.value),
  // 屬性被賦新值時被調用，將 rawDate.value 設置為新的 Date 物件
  set: (value) => {
    rawDate.value = new Date(value)
  }
})

// 1.定義註冊表單的資料格式
const schemaOne = yup.object({
  // value 要跟 useField('') 的值一樣
  role: yup
    .number()
    .required('請選擇註冊身分')
})

// 1.useForm建立一個表單
const form1 = useForm({
  validationSchema: schemaOne
})

// 1.useField建立表單的欄位
const role = useField('role', undefined, { form: form1 })

// 1.送出表單
const submitOne = form1.handleSubmit(async (value) => {
  try {
    form2.resetForm()
    tab.value = 'two'
  } catch (error) {
    console(error)
  }
})

// 2.定義註冊表單的資料格式
const schemaTwo = yup.object({
  email: yup
    .string()
    .required('信箱必填')
    .max(40, '信箱長度不符')
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => {
        if (role.value.value === UseRole.STUDENT && !value.includes('edu')) {
          return false
        }
        return validator.isEmail(value)
      }
    ),
  studentNo: yup
    .string()
    .required('學號必填')
    .max(20, '學號長度不符'),
  password: yup
    .string()
    .required('密碼必填')
    .min(6, '密碼長度不符')
    .max(20, '密碼長度不符'),
  passwordConfirm: yup
    .string()
    .required('密碼必填')
    .min(6, '密碼長度不符')
    .max(20, '密碼長度不符')
    // .oneOf 只允許符合陣列內其中一個值
    // .oneOf(陣列,錯誤訊息)
    // .ref('password')代表這個 schema 的 password 欄位
    .oneOf([yup.ref('password')], '密碼不一致')
}
)

// 2.useForm建立一個表單
const form2 = useForm({ validationSchema: schemaTwo })

// 2.useField建立表單的欄位
const email = useField('email', undefined, { form: form2 })
const studentNo = useField('studentNo', undefined, { form: form2 })
const password = useField('password', undefined, { form: form2 })
const passwordConfirm = useField('passwordConfirm', undefined, { form: form2 })

// 這個判斷方式也可以直接寫在 template 裡面，EX :身分
const emailLabel = computed(() => {
  return role.value.value === UseRole.STUDENT ? '學生信箱' : '信箱'
})

// 2.送出表單
const submitTwo = form2.handleSubmit(async (value) => {
  try {
    if (email.value.value && studentNo.value.value && password.value.value && passwordConfirm.value.value) {
      tab.value = 'three'
    }
  } catch (error) {
    console(error)
  }
})

</script>

<style lang="sass" scoped>
.v-counter
  transform: translateY(-5px)
</style>
