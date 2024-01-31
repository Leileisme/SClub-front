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
        <v-window v-model="tab" style="width: 90%;" >
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
                <!-- 學號 -->
                <v-text-field v-if="role.value.value === 1"
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
                    <v-btn
                    type="button"
                    block class="mt-2  rounded-lg"
                    style="background-color: #FF8484;height: 60px;"
                    @click="tab='one'">上一步</v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn
                    type="submit"
                    block class="mt-2  rounded-lg"
                    style="background-color: #1BBCA9;height: 60px;">下一步</v-btn>
                  </v-col>
                </v-row>
              </v-col>
          </v-window-item>
        </v-form>
        <!-- 第三頁 -->
        <v-form @submit.prevent="submitThree" :disabled="form3.isSubitting">
          <v-window-item value="three">
              <v-col cols="12" class="mt-8">
                <!-- 學校名字 -->
                <v-text-field
                v-model="schoolName.value.value"
                :error-messages="schoolName.errorMessage.value"
                maxlength="20"
                label="學校"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- item-title/item-value先刪掉了 -->
                <!-- 學校地區 -->
                <v-select
                  v-model="schoolCity.value.value"
                  :error-messages="schoolCity.errorMessage.value"
                  :items="schoolCityItems.items"
                  density="compact"
                  label="學校縣市"
                  variant="outlined"
                ></v-select>
                <!-- 姓名 -->
                <v-text-field
                v-model="realName.value.value"
                :label="realNameLabel"
                :error-messages="realName.errorMessage.value"
                maxlength="6"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 用戶名稱 -->
                <v-text-field
                v-model="UserName.value.value"
                :error-messages="UserName.errorMessage.value"
                maxlength="12"
                label="用戶名稱"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 檔案暱稱 -->
                <v-text-field
                v-model="nickName.value.value"
                :error-messages="nickName.errorMessage.value"
                maxlength="6"
                label="檔案暱稱"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 用戶名稱 -->
                <v-text-field
                v-model="UserName.value.value"
                :error-messages="UserName.errorMessage.value"
                maxlength="12"
                label="用戶名稱"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 出生日期 -->
                <!-- 這邊的V-model??-->
                <!-- <v-menu v-if="!useRole.CLUB" v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" min-width="290px" class="d-flex align-center justify-center">
                  <template v-slot:activator="{ attrs }">
                    <v-text-field
                    density="compact"
                    variant="outlined"
                    v-model="BDay"
                    label="出生日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" @click="menu = !menu"></v-text-field>
                  </template>
                  <v-date-picker  type="date" v-model="rawDate" no-time no-title @input="menu = false">
                    <template v-slot:footer>
                      <v-btn color="primary" @click="menu = false">確定</v-btn>
                    </template>
                  </v-date-picker>
                </v-menu> -->
                <!-- 性別 -->
                <v-select
                  v-if="!role.value.value === 3"
                  v-model="gender.value.value"
                  :error-messages="gender.errorMessage.value"
                  :items="genderValue.items"
                  density="compact"
                  label="性別"
                  variant="outlined"
                ></v-select>
                <!-- 手機 -->
                <v-text-field
                v-if="!role.value.value === 3"
                v-model="mobile.value.value"
                :error-messages="mobile.errorMessage.value"
                minlength="9"
                maxlength="9"
                label="手機"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 常用信箱 -->
                <v-text-field
                v-model="emailUB.value.value"
                :error-messages="emailUB.errorMessage.value"
                maxlength="40"
                label="常用信箱"
                variant="outlined"
                density="compact"></v-text-field>
                <!-- 社團屆數 -->
                <v-text-field
                v-if="role.value.value === 3"
                v-model="clubTh.value.value"
                :error-messages="clubTh.errorMessage.value"
                maxlength="3"
                label="社團屆數"
                variant="outlined"
                density="compact"></v-text-field>
              <!-- 幹部 -->
              <v-text-field
              v-if="role.value.value === 3"
              v-model="clubCoreMember.value.value"
              :error-messages="clubCoreMember.errorMessage.value"
              label="幹部"
              variant="outlined"
              density="compact"></v-text-field>

              <!-- 社團類別 -->
              <v-select
              v-if="role.value.value === 3"
              v-model="clubCategory.value.value"
              :items="clubItems.items"
              label="社團類別"
              variant="outlined"
              density="compact"></v-select>

            </v-col>
              <!-- 送出 -->
              <v-col cols="12" >
                <v-row>
                  <v-col cols="4" >
                    <v-btn type="button"
                    block class="mt-2  rounded-lg"
                    style="background-color: #FF8484;height: 60px;"
                    @click="tab='two'" >上一步</v-btn>
                  </v-col>
                  <v-col cols="8" >
                    <v-btn type="submit"
                    block class="mt-2  rounded-lg"
                    style="background-color: #1BBCA9;height: 60px;">註冊成功</v-btn>
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
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
// import { useApi } from '@/composables/axios'

// const { api } = useApi()
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

const schoolCityItems = {
  items: ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']
}

const clubItems = {
  items: ['學術', '學藝', '音樂', '康樂', '服務', '體育', '康輔', '聯誼', '其他']
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

const BDay = computed({
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
    .required('學號必填',
      (value) => {
        if (role.value.value === UseRole.STUDENT && value) {
          return true
        }
        return false
      }
    )
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
    form3.resetForm()
    tab.value = 'three'
  } catch (error) {
    console(error)
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
    .required('出生日期必填',
      (value) => {
        if (role.value.value === UseRole.CLUB && !value) {
          return false
        } else {
          return true
        }
      }),
  // 性別
  gender: yup
    .string()
    .required('性別必填',
      (value) => {
        if (role.value.value === UseRole.CLUB && !value) {
          return false
        } else {
          return true
        }
      })
    .min(3, '性別長度不符')
    .max(3, '性別長度不符'),
  // 手機
  mobile: yup
    .string()
    .required('手機必填', (value) => {
      if (role.value.value === UseRole.CLUB && !value) {
        return false
      } else {
        return true
      }
    })
    .min(9, '手機長度不符')
    .max(9, '手機長度不符')
    .matches(/^0[0-9]{9}$/, '手機格式錯誤,從9開始'),
  // 常用信箱
  studentGrade: yup
    .string()
    .required('年級必填')
    .min(2, '年級長度不符')
    .max(2, '年級長度不符'),
  // 備用信箱
  emailUB: yup
    .string()
    .required('備用信箱必填')
    .max(40, '備用信箱長度不符')
    .test(
      'isEmail', '備用信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  // 社團屆數
  clubTh: yup
    .number()
    .required('社團屆數必填',
      (value) => {
        if (role.value.value === UseRole.CLUB && value) {
          return true
        } else {
          return false
        }
      })
    .max(3, '社團屆數長度不符'),
  // 社團幹部
  clubCoreMember: yup
    .object(),
  // 社團類別
  clubCategory: yup
    .string()
    .required('社團類別必填',
      (value) => {
        if (role.value.value === UseRole.CLUB && value) {
          return true
        } else {
          return false
        }
      })
    .min(2, '社團類別不符')
    .max(2, '社團類別不符')
    .required('社團類別必填')
})

// 3.useForm建立一個表單
const form3 = useForm({ validationSchema: schemaThree })

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
const isStudent = role.value.value !== UseRole.NOT_STUDENT

// 姓名、社團名稱判斷
const realNameLabel = computed(() => {
  return role.value.value === UseRole.CLUB ? '社團名稱' : '姓名'
})

// 3.送出表單
const submitThree = form3.handleSubmit(async (values) => {
  try {
    // await api.post('/users', {
    //   ROLE: role.value.value,
    //   EMAIL: email.value.value,
    //   PASSWORD: password.value.value,
    //   STUDENT_NO: studentNo.value.value,
    //   SCHOOL_NAME: schoolName.value.value,
    //   SCHOOL_CITY: schoolCity.value.value,
    //   REAL_NAME: realName.value.value,
    //   USER_NAME: UserName.value.value,
    //   NICK_NAME: nickName.value.value,
    //   BDAY: BDAY.value.value,
    //   GENDER: gender.value.value,
    //   MOBILE: mobile.value.value,
    //   STUDENT_GRADE: studentGrade.value.value,
    //   EMAIL_UB: emailUB.value.value,
    //   CLUB_TH: clubTh.value.value,
    //   CLUB_CORE_MEMBER: clubCoreMember.value.value,
    //   CLUB_CATEGORY: clubCategory.value.value,
    //   IS_STUDENT: isStudent
    // })
  } catch (error) {
    console.log(error)
  }
})

</script>

<style lang="sass" scoped>
.v-counter
  transform: translateY(-5px)
</style>
