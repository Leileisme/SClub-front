<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="#444" style="font-weight: 900; width: 100%;" dark v-bind="props">編輯社團檔案</v-btn>
      </template>

      <v-card>
        <!-- 標題 -->
        <v-toolbar
          dark
          color="#1BBCA9"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>編輯檔案</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>

        <!-- 表單清單 -->
        <v-container>

            <v-list-subheader>User Controls</v-list-subheader>

            <v-form :disabled=" isSubmitting" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
                  <!-- 姓名/社團名稱 -->
                  <v-text-field
                    v-model="realName.value.value"
                    label="社團名稱"
                    :error-messages="realName.errorMessage.value"
                    maxlength="6"
                    counter
                    variant="outlined"
                    >
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
                  <!-- 社團屆數 -->
                  <v-text-field
                    v-if="user.ROLE === 3"
                    v-model="clubTh.value.value"
                    :error-messages="clubTh.errorMessage.value"
                    maxlength="3"
                    counter
                    label="社團屆數"
                    variant="outlined">
                  </v-text-field>
                </v-col>

                <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
                  <!-- 社團類別 -->
                  <v-select
                    v-if="user.ROLE === 3"
                    v-model="clubCategory.value.value"
                    ::error-messages="clubCategory.errorMessage.value"
                    :items="clubItems.items"
                    label="社團類別"
                    variant="outlined">
                  </v-select>
                </v-col>
                <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
                  <!-- 備用信箱 -->
                    <v-text-field
                      v-model="emailUB.value.value"
                      :error-messages="emailUB.errorMessage.value"
                      maxlength="40"
                      counter
                      label="備用信箱"
                      variant="outlined">
                    </v-text-field>
                </v-col>

            <!-- 按鈕 -->
              <v-col cols="4" >
                <v-btn type="button"
                  block class=" rounded-lg"
                  style="background-color: #FF8484;height: 60px; font-weight: 900;"
                  @click="dialog = false" >
                  取消
                </v-btn>
              </v-col>

              <v-col cols="8" >
                <v-btn type="submit"
                  block class=" rounded-lg "
                  style="background-color: #1BBCA9;height: 60px; font-weight: 900;">
                  確定
                </v-btn>
              </v-col>

            </v-row>
            </v-form>

      </v-container>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useDisplay } from 'vuetify'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'
import UseRole from '@/enums/UserRole.js'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { api, apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const dialog = ref(false)

const clubItems = {
  items: ['學術', '學藝', '音樂', '康樂', '服務', '體育', '康輔', '聯誼', '其他']
}

// 定義註冊表單的資料格式
const schema = yup.object({
  // 姓名/社團名
  realName: yup
    .string()
    .required('姓名/社團名必填')
    .max(6, '姓名/社團名長度不符'),

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
    .required('社團屆數必填')
    .typeError('社團屆數必須是數字'),

  // 社團幹部
  // clubCoreMember: yup
  //   .object().shape({
  //     value: yup.object().shape({
  //       USER: yup.string(),
  //       ROLE: yup.string()
  //     })
  //   }),

  // 社團類別
  clubCategory: yup
    .string()
    .required('社團類別必填')
    .min(2, '社團類別不符')
    .max(2, '社團類別不符')
})

// useForm建立一個表單
const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema, initialValues: { emailUB: '' } })

// useField建立表單的欄位
const realName = useField('realName', user.REAL_NAME)
const emailUB = useField('emailUB', user.EMAIL_UB)
const clubTh = useField('clubTh', user.CLUB_TH)
// const clubCoreMember = useField('clubCoreMember', user.CLUB_CORE_MEMBER)
const clubCategory = useField('clubCategory', user.CLUB_CATEGORY)

// 送出表單
const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.path('/users/edit', {
      REAL_NAME: values.realName,
      EMAIL_UB: values.emailUB,
      CLUB_TH: values.clubTh,
      // CLUB_CORE_MEMBER: values.clubCoreMember,
      CLUB_CATEGORY: values.clubCategory
    })

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    dialog.value = false
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        console: 'red',
        location: 'bottom'
      }
    })
  }
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
