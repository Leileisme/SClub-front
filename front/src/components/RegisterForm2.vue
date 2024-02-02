<template>
<v-form @submit.prevent="submitTwo" :disabled="form2.isSubmitting.value">
  <v-window-item value="two">
    <!-- 副標 -->
      <!-- <div class="text-center mt-5">
        <p>註冊馬上加入「學生社團」社群行列</p>
      </div> -->
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
      density="comfortable"></v-text-field>
      <!-- 學號 -->
      <v-text-field v-if="role.value.value === 1"
      v-model="studentNo.value.value"
      :error-messages="studentNo.errorMessage.value"
      label="學號"
      maxlength="20"
      counter
      variant="outlined"
      density="comfortable"></v-text-field>
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
      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="visible ? 'text' : 'password'"
      @click:append-inner="visible = !visible"
      ></v-text-field>
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

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import UseRole from '@/enums/UserRole.js'
import validator from 'validator'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { api } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()


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

</script>