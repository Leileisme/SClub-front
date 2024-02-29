<template >
  <template v-if="isXs">
      <v-app-bar >
        <VContainer class="d-flex align-center text-center ">
        <v-app-bar-title class="font-weight-black text-h5">註冊</v-app-bar-title>
      </VContainer>
      </v-app-bar>
  </template>

  <div :style="heigh" class="boxHeigh">
    <div style="width: 400px; " :style="boxBorder " class="pb-8 " >
      <div v-if="!isXs" style="height: 65px; width: 100%; box-shadow: 0 1px 5px #000;" class="d-flex justify-center align-center">
        <div class="text-h5 font-weight-black">註冊</div>
      </div>
      <!-- 標題Logo -->
      <v-container>
        <div class="mb-1 mt-3">
          <div class="text-center font-weight-bold text-h3">LogoHere</div>
          <div class="text-center mt-5">
            <p>註冊馬上加入「學生社團」社群行列</p>
          </div>
        </div>

        <!-- 選單 -->
        <div class="d-flex justify-center w-100 mx-auto">
          <v-window v-model="tab" style="width: 95%;" :touch="false">
            <!-- 第一頁 -->
            <v-form @submit.prevent="submitOne" :disabled="form1.isSubmitting.value" >
              <v-window-item value="one">
                <v-row>
                  <!-- 單位 -->
                  <v-col cols="12" class="mt-8">
                    <v-select
                      v-model="type.selected"
                      :items="type.items"
                      item-title="text"
                      item-value="value"
                      label="註冊單位"
                      variant="outlined"
                      color="#25ECE0"
                      @update:model-value="role.value.value = undefined">
                    </v-select>
                  </v-col>

                  <!-- 身分 -->
                  <v-col cols="12">
                    <!-- 這個判斷方式也可以直接寫在 template 裡面，EX: 信箱 -->
                    <v-select
                      v-model.number="role.value.value"
                      :items="type.selected ==='個人' ? roleItems.items : type.selected ==='團體' ? group.items : []"
                      item-title="text"
                      item-value="value"
                      label="註冊身分"
                      variant="outlined"
                      color="#25ECE0"
                      :disabled="!type.selected"
                      :error-messages="role.errorMessage.value">
                    </v-select>
                  </v-col>

                  <!-- 往第二頁的按鈕 -->
                  <v-col cols="12" >
                    <v-btn type="submit"
                      class="mt-2 rounded-lg w-100"
                      style="background-color: #1BBCA9; height: 60px; font-weight: 900;">
                      下一步
                    </v-btn>
                  </v-col>
                  <v-col cols="12"  class="text-center">
                    <span>已經有帳號?</span>
                    <v-btn type="button"  class="rounded-lg  mx-8"
                      style="background-color: #4F75D9;
                      font-weight: 900; height: 42px; width: 25%;"  to="./login">
                      登入
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-form>

            <!-- 第二頁 -->
            <v-form @submit.prevent="submitTwo" :disabled="form2.isSubmitting.value">
              <v-window-item value="two">
                <v-row>
                  <v-col cols="12" class="mt-8">
                    <!-- 學校信箱 -->
                    <v-text-field
                      v-model="email.value.value"
                      :error-messages="email.errorMessage.value"
                      :label="emailLabel"
                      type="email"
                      maxlength="40"
                      counter
                      variant="outlined"
                      color="#25ECE0"
                      density="comfortable">
                    </v-text-field>
                    <!-- 學號 -->
                    <v-text-field v-if="role.value.value === UseRole.STUDENT"
                      v-model="studentNo.value.value"
                      :error-messages="studentNo.errorMessage.value"
                      label="學號"
                      maxlength="20"
                      counter
                      variant="outlined"
                      color="#25ECE0"
                      density="comfortable">
                    </v-text-field>
                    <!-- 密碼 -->
                    <v-text-field
                      v-model="password.value.value"
                      :error-messages="password.errorMessage.value"
                      minlength="6"
                      maxlength="20"
                      counter
                      label="密碼"
                      variant="outlined"
                      density="comfortable"
                      color="#25ECE0"
                      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible">
                    </v-text-field>
                    <!-- 確認密碼 -->
                    <v-text-field
                      v-model="passwordConfirm.value.value"
                      :error-messages="passwordConfirm.errorMessage.value"
                      minlength="6"
                      maxlength="20"
                      counter
                      :append-inner-icon="visibleConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="visibleConfirm ? 'text' : 'password'"
                      @click:append-inner="visibleConfirm = !visibleConfirm"
                      label="確認密碼"
                      color="#25ECE0"
                      variant="outlined"
                      density="comfortable">
                    </v-text-field>
                  </v-col>

                  <!-- 按鈕 -->
                  <v-col cols="4" >
                    <v-btn
                      type="button"
                      block class="mt-2  rounded-lg"
                      style="background-color: #FF8484;height: 60px; font-weight: 900;"
                      @click="tab='one'">
                      上一步
                    </v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn
                      type="submit"
                      block class="mt-2  rounded-lg"
                      style="background-color: #1BBCA9;height: 60px; font-weight: 900;">
                      下一步
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-form>

            <!-- 第三頁 -->
            <v-form @submit.prevent="submitThree" :disabled="form3.isSubmitting.value">
              <v-window-item value="three">
                <v-row>
                  <v-col cols="12" class="mt-8">
                    <!-- 學校名字 -->
                    <v-text-field
                      v-model="schoolName.value.value"
                      :error-messages="schoolName.errorMessage.value"
                      maxlength="20"
                      counter
                      color="#25ECE0"
                      label="學校"
                      variant="outlined"
                      density="compact">
                    </v-text-field>
                    <!-- 學校地區 -->
                    <v-select
                      v-model="schoolCity.value.value"
                      :error-messages="schoolCity.errorMessage.value"
                      :items="schoolCityItems.items"
                      density="compact"
                      color="#25ECE0"
                      label="學校縣市"
                      variant="outlined">
                    </v-select>
                    <!-- 姓名/社團名稱 -->
                    <v-text-field
                      v-model="realName.value.value"
                      :label="realNameLabel"
                      :error-messages="realName.errorMessage.value"
                      maxlength="6"
                      counter
                      color="#25ECE0"
                      variant="outlined"
                      density="compact">
                    </v-text-field>
                    <!-- 用戶名稱 -->
                    <v-text-field
                      v-model="UserName.value.value"
                      :error-messages="UserName.errorMessage.value"
                      maxlength="12"
                      counter
                      color="#25ECE0"
                      label="用戶名稱"
                      variant="outlined"
                      density="compact">
                    </v-text-field>
                    <!-- 檔案暱稱 -->
                    <v-text-field
                      v-if="role.value.value !== 3"
                      v-model="nickName.value.value"
                      :error-messages="nickName.errorMessage.value"
                      maxlength="6"
                      counter
                      color="#25ECE0"
                      label="檔案暱稱"
                      variant="outlined"
                      density="compact">
                    </v-text-field>
                    <!-- 出生日期 -->
                    <v-menu v-if="role.value.value !== 3" v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" min-width="290px" class="d-flex align-center justify-center">
                      <template v-slot:activator="{ attrs }">
                        <v-text-field
                          :model-value="BDAYText"
                          :error-messages="BDAY.errorMessage.value"
                          density="compact"
                          variant="outlined"
                          color="#25ECE0"
                          label="出生日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" @click="menu = !menu">
                        </v-text-field>
                      </template>
                      <v-date-picker  type="date" color="#25ECE0"  :max="maxDate" v-model="BDAY.value.value" no-time no-title @input="menu = false">
                        <template v-slot:actions>
                          <v-btn  style="background-color: #25ECE0; color: rgb(0, 0, 0); font-weight: 900;" @click="menu = false">確定</v-btn>
                        </template>
                      </v-date-picker>
                    </v-menu>
                    <!-- 性別 -->
                    <v-select
                      v-if="role.value.value !== 3"
                      v-model="gender.value.value"
                      :error-messages="gender.errorMessage.value"
                      :items="genderValue.items"
                      density="compact"
                      label="性別"
                      color="#25ECE0"
                      variant="outlined">
                    </v-select>
                    <!-- 手機 -->
                    <v-text-field
                      v-if="role.value.value !== 3"
                      v-model="mobile.value.value"
                      :error-messages="mobile.errorMessage.value"
                      maxlength="8"
                      label="手機"
                      prefix="09"
                      variant="outlined"
                      counter
                      color="#25ECE0"
                      density="compact">
                    </v-text-field>
                    <!-- 年級 -->
                    <v-select
                      v-if="role.value.value === 1"
                      v-model="studentGrade.value.value"
                      :error-messages="studentGrade.errorMessage.value"
                      :items="studentGradeItems"
                      minlength="2"
                      maxlength="2"
                      counter
                      label="年級"
                      color="#25ECE0"
                      variant="outlined"
                      density="compact">
                    </v-select>
                    <!-- 社團類別 -->
                    <v-select
                      v-if="role.value.value === 3"
                      v-model="clubCategory.value.value"
                      :error-messages="clubCategory.errorMessage.value"
                      :items="clubItems.items"
                      label="社團類別"
                      color="#25ECE0"
                      variant="outlined"
                      density="compact">
                    </v-select>
                    <!-- 社團屆數 -->
                    <v-text-field
                      v-if="role.value.value === 3"
                      v-model="clubTh.value.value"
                      :error-messages="clubTh.errorMessage.value"
                      maxlength="3"
                      counter
                      color="#25ECE0"
                      label="社團屆數"
                      variant="outlined"
                      density="compact">
                    </v-text-field>
                  <!-- 幹部 -->
                  <!-- <v-row>
                    <v-col cols="5">
                      <v-text-field
                        v-if="role.value.value === 3"
                        v-model="clubCoreMember.value.value.ROLE"
                        :error-messages="clubCoreMember.errorMessage.value"
                        label="幹部職稱"
                        variant="outlined"
                        density="compact">
                        </v-text-field>
                    </v-col>

                    <v-col cols="7">
                      <v-text-field
                        v-if="role.value.value === 3"
                        v-model="clubCoreMember.value.value.USER"
                        :error-messages="clubCoreMember.errorMessage.value"
                        label="用戶名稱"
                        variant="outlined"
                        density="compact">
                      </v-text-field>
                    </v-col>
                  </v-row> -->
                  <!-- 備用信箱 -->
                  <v-text-field
                    v-model="emailUB.value.value"
                    :error-messages="emailUB.errorMessage.value"
                    maxlength="40"
                    counter
                    color="#25ECE0"
                    label="備用信箱"
                    variant="outlined"
                    density="compact">
                  </v-text-field>
                  </v-col>

                  <!-- 送出 -->
                  <v-col cols="4" >
                    <v-btn type="button"
                      block class="mt-2  rounded-lg"
                      style="background-color: #FF8484;height: 60px; font-weight: 900;"
                      @click="tab='two'" >
                      上一步
                    </v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn type="submit"
                      block class="mt-2  rounded-lg "
                      style="background-color: #1BBCA9;height: 60px; font-weight: 900;">
                      註冊
                    </v-btn>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-form>
          </v-window>
        </div>
      </v-container>
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
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { api } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)
// RWD 樣式
const boxBorder = computed(() => {
  if (isXs.value) {
    return 'border: none; '
  } else {
    return 'border: 1px solid #333; box-shadow: 0 1px 10px #363636;'
  }
})

const heigh = computed(() => {
  if (!isXs.value) {
    return 'height: 100vh; align-items: center;'
    // return ' align-items: center;'
  } else {
    return 'height:auto'
  }
})

// 翻頁預設
const tab = ref('one')
// 密碼顯示
const visible = ref(false)
const visibleConfirm = ref(false)
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

const group = {
  items: [
    { text: '社團', value: UseRole.CLUB }
  ]
}

const schoolCityItems = {
  items: ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']
}

const clubItems = {
  items: ['學術', '學藝', '音樂', '康樂', '服務', '體育', '康輔', '聯誼', '其他']
}

// 性別
const genderValue = {
  items: ['生理女', '生理男']
}

// 年級
const studentGradeItems = ['高一', '高二', '高三', '大一', '大二', '大三', '大四', '碩士']

// 註冊 - 日曆/轉換日期格式
const menu = ref(false)

const maxDate = new Date()

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
    console.log(error)
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
    .max(20, '學號長度不符')
    .test('isStudentNo', '學號必填',
      (value) => {
        if (role.value.value === UseRole.STUDENT && !value) {
          return false
        }
        return true
      }
    ),
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
    form3.resetForm()
    tab.value = 'three'
  } catch (error) {
    console.log(error)
  }
})

// 3.定義註冊表單的資料格式
const schemaThree = yup.object({
  // 學校名字
  schoolName: yup
    .string()
    .required('學校必填')
    .max(20, '學校長度不符'),
  // 學校地區
  schoolCity: yup
    .string()
    .required('學校縣市必填')
    .min(3, '學校縣市長度不符')
    .max(3, '學校縣市長度不符'),
  // 姓名/社團名
  realName: yup
    .string()
    .required('姓名/社團名必填')
    .max(6, '姓名/社團名長度不符'),
  //  用戶名稱
  UserName: yup
    .string()
    .required('用戶名稱必填')
    .max(12, '用戶名稱長度不符')
    .matches(/^[a-zA-Z0-9]*$/, '用戶名稱格式錯誤,只能英文或數字'),
  // 檔案暱稱
  nickName: yup
    .string()
    .max(6, '檔案暱稱長度不符'),
  // 出生日期
  BDAY: yup
    .string()
    .test('isBADY', '出生日期必填',
      (value) => {
        if (role.value.value === !UseRole.CLUB && !value) {
          return false
        }
        return true
      }
    ),
  // 性別
  gender: yup
    .string()
    .min(3, '性別長度不符')
    .max(3, '性別長度不符')
    .test('isGender', '性別必填',
      (value) => {
        if (role.value.value === !UseRole.CLUB && !value) {
          return false
        }
        return true
      }
    ),
  // 手機
  mobile: yup
    .string()
    .length(8, '手機長度不符')
    .matches(/^[0-9]{8}$/, '手機格式錯誤')
    .test('isMobile', '手機必填',
      (value) => {
        if (role.value.value === !UseRole.CLUB && !value) {
          return false
        }
        return true
      }),
  // 年級
  studentGrade: yup
    .string()
    .min(2, '年級長度不符')
    .max(2, '年級長度不符')
    .test('isStudentGrade', '年級必填',
      (value) => {
        if (role.value.value === UseRole.STUDENT && !value) {
          return false
        }
        return true
      }),
  // 備用信箱
  emailUB: yup
    .string()
    .max(40, '備用信箱長度不符')
    .test(
      'isEmail', '備用信箱格式錯誤',
      (value) => {
        return value ? validator.isEmail(value) : true
      }
    ),
  // 社團屆數
  clubTh: yup
    .number()
    .typeError('社團屆數必須是數字')
    .test('isClubTh', '社團屆數必填',
      (value) => {
        if (role.value.value === UseRole.CLUB && !value) {
          return false
        }
        return true
      }
    ),
  // 社團幹部
  clubCoreMember: yup
    .object().shape({
      value: yup.object().shape({
        USER: yup.string(),
        ROLE: yup.string()
      })
    }),
  // 社團類別
  clubCategory: yup
    .string()
    .min(2, '社團類別不符')
    .max(2, '社團類別不符')
    .test('isClubTh', '社團類別必填',
      (value) => {
        if (value !== undefined) {
          if (role.value.value === UseRole.CLUB && !value) {
            return false
          }
          return true
        }
        return true
      }
    )
})

// 3.useForm建立一個表單
const form3 = useForm({ validationSchema: schemaThree, initialValues: { emailUB: '' } })

// 3.useField建立表單的欄位
const schoolName = useField('schoolName', undefined, { form: form3 })
const schoolCity = useField('schoolCity', undefined, { form: form3 })
const realName = useField('realName', undefined, { form: form3 })
const UserName = useField('UserName', undefined, { form: form3 })
const nickName = useField('nickName', undefined, { form: form3 })
const BDAY = useField('BDay', undefined, { form: form3 })
const gender = useField('gender', undefined, { form: form3 })
const mobile = useField('mobile', undefined, { form: form3 })
const studentGrade = useField('studentGrade', undefined, { form: form3 })
const emailUB = useField('emailUB', undefined, { form: form3 })
const clubTh = useField('clubTh', undefined, { form: form3 })
const clubCoreMember = useField('clubCoreMember', undefined, { form: form3 })
const clubCategory = useField('clubCategory', undefined, { form: form3 })

// 日期格式轉換
const BDAYText = computed(() => BDAY.value.value ? new Date(BDAY.value.value).toLocaleDateString().substring(0, 10) : '')

// 姓名、社團名稱判斷
const realNameLabel = computed(() => {
  return role.value.value === UseRole.CLUB ? '社團名稱' : '姓名'
})

// 3.送出表單
const submitThree = form3.handleSubmit(async (values) => {
  try {
    await api.post('/users', {
      ROLE: role.value.value,
      EMAIL: email.value.value,
      PASSWORD: password.value.value,
      STUDENT_NO: studentNo.value.value,
      SCHOOL_NAME: schoolName.value.value,
      SCHOOL_CITY: schoolCity.value.value,
      REAL_NAME: realName.value.value,
      USER_NAME: UserName.value.value,
      // 短路求值，回覆第一個是 true 的值
      NICK_NAME: nickName.value.value || realName.value.value,
      BDAY: BDAY.value.value ? new Date(BDAY.value.value).toLocaleDateString().substring(0, 10) : BDAY.value.value,
      GENDER: gender.value.value,
      MOBILE: mobile.value.value,
      STUDENT_GRADE: studentGrade.value.value,
      EMAIL_UB: emailUB.value.value,
      CLUB_TH: clubTh.value.value,
      CLUB_CORE_MEMBER: clubCoreMember.value.value,
      CLUB_CATEGORY: clubCategory.value.value,
      IS_STUDENT: role.value.value === UseRole.STUDENT
    })
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    // ?. 如果任何一個為  null 或 undefined，整個表達式會立即返回 undefined，而不會拋出錯誤。
    // || 若左邊的值為 false，則回傳右邊的值
    // 嘗試從錯誤物件中獲取錯誤訊息，如果無法獲取，則使用預設的錯誤訊息
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 20000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})

</script>

<style  scoped>
.v-counter{
  transform: translateY(-5px)
}

.boxHeigh {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media(max-height:600px) {
.boxHeigh {
align-items: flex-start !important;
margin: 3rem;
margin-bottom: 5rem;
  }
  }

</style>
