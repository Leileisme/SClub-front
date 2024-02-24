<template>

    <template v-if="isXs">
      <v-app-bar >
      <VContainer class="d-flex align-center text-center">
        <v-app-bar-title class="font-weight-black text-h5">登入</v-app-bar-title>
      </VContainer>
      </v-app-bar>
    </template>

    <div :style="heigh" class="boxHeigh">
    <div style="width: 400px;  " :style="boxBorder" class="pb-8" >
      <div v-if="!isXs" style="height: 65px; width: 100%; box-shadow: 0 1px 5px #000;" class="d-flex justify-center align-center">
        <div class="text-h5 font-weight-black">登入</div>
      </div>

      <v-container>
        <!-- 標題Logo -->
        <div class="mb-1 mt-3">
          <div class="text-center font-weight-bold text-h3">LogoHere</div>
          <div class="text-center mt-5">
            <p>馬上登入觀看社群最新活動</p>
          </div>
        </div>
        <!-- 選單 -->
        <div>
          <v-form @submit.prevent="submit"  :disabled="isSubmitting">
            <v-row class="d-flex justify-center w-100 mx-auto" >
              <v-col cols="12"></v-col>
              <!-- 信箱 -->
              <v-col cols="12">
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  label="信箱"
                  type="email"
                  maxlength="40"
                  counter
                  color="#25ECE0"
                  variant="outlined">
                </v-text-field>
              </v-col>
              <!-- 密碼 -->
              <v-col>
                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  minlength="6"
                  maxlength="20"
                  counter
                  label="密碼"
                  variant="outlined"
                  color="#25ECE0"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  @click:append-inner="visible = !visible">
                </v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-btn type="submit"
                  block class=" rounded-lg "
                  style="background-color: #1BBCA9; font-weight: 900; height: 60px;">
                  登入
                </v-btn>
              </v-col>
              <v-col cols="12"  class="text-center">
                <span>忘記密碼?</span>
                <v-btn type="button"  class="rounded-lg  mx-8"
                  style="background-color: #4F75D9;
                  font-weight: 900; height: 42px; width: 25%;"  to="./register">
                  註冊
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { api } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

// 密碼顯示
const visible = ref(false)

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

const schema = yup.object({
  email: yup
    .string()
    .required('信箱必填')
    .max(40, '信箱長度不符')
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  password: yup
    .string()
    .required('密碼必填')
    .min(6, '密碼長度不符')
    .max(20, '密碼長度不符')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    // 因為有引入 axios 並有 baseURL 所以路由'/users'即可
    const { data } = await api.post('/users/login', {
      EMAIL: values.email,
      PASSWORD: values.password
    })
    // 將登入資料存入store
    user.login(data.result)

    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})
</script>

<style scoped>
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
