<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="#444" style="font-weight: 900; width: 100%;" dark v-bind="props">編輯社團檔案</v-btn>
    </template>
    <v-card  style="border-radius: 15px; max-width: 400px;margin: auto;">
      <!-- 標題 -->
      <v-toolbar dark color="#333">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title >編輯檔案</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        </v-toolbar-items>
      </v-toolbar>
      <!-- 表單清單 -->
      <v-container>
        <v-form :disabled=" isSubmitting" @submit.prevent="submit">
          <v-row>
            <v-col cols="12" style="padding-top: 30px; padding-bottom: 0;">
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
            <!-- 幹部 -->
            <pre>
              {{  errors }}
            </pre>
            <v-col cols="12" style="padding-top: 0; padding-bottom: 0;" v-for="(field, idx) in clubCoreMember.fields.value" :key="field.key">
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-if="user.ROLE === 3"
                    v-model="field.value.ROLE"
                    :error-messages="errors[`clubCoreMember[${idx}].ROLE`]"
                    label="幹部職稱"
                    variant="outlined"
                    density="compact">
                    </v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    v-if="user.ROLE === 3"
                    v-model="field.value.USER"
                    :error-messages="errors[`clubCoreMember[${idx}].USER`]"
                    label="用戶名稱"
                    variant="outlined"
                    density="compact">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn v-if="idx === 0" icon="mdi-plus" @click="addClubMemberField"></v-btn>
                  <v-btn v-else icon="mdi-minus" @click="removeClubMemberField(idx)"></v-btn>
                </v-col>
              </v-row>
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
            <v-col cols="4"  style="padding-top: 0; ">
              <v-btn type="button"
                block class=" rounded-lg"
                style="background-color: #FF8484;height: 60px; font-weight: 900;"
                @click="dialog = false" >
                取消
              </v-btn>
            </v-col>
            <v-col cols="8" style="padding-top: 0;padding-bottom: 30px; ">
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

</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField, useFieldArray } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { apiAuth } = useApi()

const createSnackbar = useSnackbar()
const user = useUserStore()

//  選單開關
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
  clubCoreMember: yup
    .array(
      yup.object({
        USER: yup.string().required('使用者名稱必填'),
        ROLE: yup.string().required('幹部職稱必填')
      })
    )
    .test('role', '必須要有社長和副社長', value => {
      return value.filter(item => item.ROLE === '社長').length === 1 && value.filter(item => item.ROLE === '副社長').length === 1
    }),

  // 社團類別
  clubCategory: yup
    .string()
    .required('社團類別必填')
    .min(2, '社團類別不符')
    .max(2, '社團類別不符')
})

// useForm建立一個表單
const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    emailUB: '',
    clubCoreMember: [{ USER: '', ROLE: '社長' }, { USER: '', ROLE: '副社長' }]
  }
})

// useField建立表單的欄位
const realName = useField('realName', user.REAL_NAME)
const emailUB = useField('emailUB', user.EMAIL_UB)
const clubTh = useField('clubTh', user.CLUB_TH)
const clubCoreMember = useFieldArray('clubCoreMember')
const clubCategory = useField('clubCategory', user.CLUB_CATEGORY)
const nickName = useField('nickName')
const addClubMemberField = () => {
  clubCoreMember.push({ USER: '', ROLE: '' })
}

const removeClubMemberField = (idx) => {
  clubCoreMember.remove(idx)
}

// 送出表單
const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch('/users/edit', {
      USER_NAME: user.USER_NAME,
      REAL_NAME: values.realName,
      EMAIL_UB: values.emailUB,
      CLUB_TH: values.clubTh,
      // CLUB_CORE_MEMBER: values.clubCoreMember,
      CLUB_CATEGORY: values.clubCategory,
      NICK_NAME: nickName.value.value || values.realName
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
