<template>
  <v-dialog v-model="dialog" @keydown.esc="closeDialog">
    <template v-slot:activator="{ props }">
      <v-btn color="#444" style="font-weight: 900; width: 100%;" dark v-bind="props">編輯社團檔案</v-btn>
    </template>

    <v-card  style="border-radius: 15px; max-width: 400px;margin: auto; width: 100%;">
      <!-- 標題 -->
      <v-toolbar dark color="#333">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title >編輯檔案</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>

      <!-- 表單清單 -->
      <v-container>
        <v-form :disabled=" isSubmitting" @submit.prevent="submit">
          <v-row>
            <!-- 大頭照 -->
            <v-col cols="12">
              <VueFileAgent
                v-model="fileRecords"
                v-model:rawModelValue="rawFileRecords"
                accept="image/jpeg,image/png"
                deletable
                :error-text="{type:'檔案格式不支援', size: '檔案超過 1MB 大小限制'}"
                help-text="選擇檔案或拖曳到這裡"
                :max-files="1"
                max-size="1MB"
                ref="fileAgent"
                color="#25ECE0"
                ></VueFileAgent>
            </v-col>
            <!-- 姓名/社團名稱 -->
            <v-col cols="12" style="padding-top: 30px; padding-bottom: 0;">
              <v-text-field
                v-model="realName.value.value"
                label="社團名稱"
                :error-messages="realName.errorMessage.value"
                maxlength="6"
                counter
                variant="outlined"
                color="#25ECE0"
                >
              </v-text-field>
            </v-col>
            <!-- 社團屆數 -->
            <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
              <v-text-field
                v-if="user.ROLE === 3"
                v-model="clubTh.value.value"
                :error-messages="clubTh.errorMessage.value"
                maxlength="3"
                counter
                color="#25ECE0"
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
                color="#25ECE0"
                variant="outlined">
              </v-select>
            </v-col>
            <!-- 幹部 -->
            <!-- <pre>  {{  errors }} </pre> -->

            <!-- 幹部-錯誤訊息 -->
            <v-col cols="12" style="padding-top: 0; padding-bottom: 0;">
              <v-list-subheader style="color: #FF8484;">{{ errors.clubCoreMember }}</v-list-subheader>
            </v-col>

            <!-- 幹部 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;" v-for="(field, idx) in clubCoreMember.fields.value" :key="field.key">
              <v-row>
                <!-- 幹部職稱 -->
                <v-col cols="5">
                  <v-text-field
                    v-if="user.ROLE === 3"
                    v-model="field.value.ROLE"
                    :error-messages="errors[`clubCoreMember[${idx}].ROLE`]"
                    label="幹部職稱"
                    variant="outlined"
                    color="#25ECE0"
                    density="compact">
                    </v-text-field>
                </v-col>
                <!-- 幹部 用戶名稱 -->
                <v-col cols="5">
                  <v-text-field
                    v-if="user.ROLE === 3"
                    v-model="field.value.USER"
                    :error-messages="errors[`clubCoreMember[${idx}].USER`]"
                    label="用戶名稱"
                    variant="outlined"
                    density="compact"
                    color="#25ECE0"
                    @input="searchData(idx)"
                    :id="'clubCoreMember_user' + idx">
                  </v-text-field>

                  <!-- 搜尋的id -->
                  <v-menu :activator="'#clubCoreMember_user' + idx" >
                    <v-list style="max-height: 300px; overflow-y: auto;">
                      <!-- 搜尋有符合 -->
                      <template v-if="field.value.USER">
                        <v-list-item
                        v-for="(item) in search"
                        :key="item.USER_NAME"
                        @click="selectUserName(item.USER_NAME, idx)"
                        >
                        <!-- 搜尋清單 -->
                          <v-row  style="margin: 5px; ">
                            <v-col cols="5" class="justify-center " style="padding: 8px;">
                              <v-avatar size="35"  >
                                <v-img :src="item.IMAGE" cover></v-img>
                              </v-avatar>
                            </v-col>
                            <v-col cols="7"  class="justify-center align-center">
                              <v-row >
                                <v-col cols="12" style="padding: 0; margin: 0;font-size: 1.1rem;color: #25ECE0;"  >{{ item.USER_NAME }}</v-col>
                                <v-col cols="12" style="padding: 0;margin: 0; font-size: 0.8rem;color: #cccccc;">{{ item.NICK_NAME }}</v-col>
                              </v-row>
                            </v-col>
                          </v-row>

                        <v-divider></v-divider>
                      </v-list-item>
                    </template>

                    <!-- 無搜尋符合 -->
                    <template v-else>
                      <v-list-item>
                        <v-list-item-title>無搜尋結果</v-list-item-title>
                      </v-list-item>
                    </template>
                    </v-list>
                  </v-menu>
                </v-col>

                <v-col cols="1" style="justify-content: start; align-items: center; ">
                  <v-btn v-if="idx === 0" icon="mdi-plus" @click="addClubMemberField" style="font-size: 1.2rem; width: auto; height: auto;" ></v-btn>
                  <v-btn v-else icon="mdi-minus" @click="removeClubMemberField(idx)" style="font-size: 1.2rem; width: auto; height: auto;"></v-btn>
                </v-col>
              </v-row>
            </v-col>

            <!-- 備用信箱 -->
            <v-col cols="12" style="padding-top: 10px; padding-bottom: 0;">
                <v-text-field
                  v-model="emailUB.value.value"
                  :error-messages="emailUB.errorMessage.value"
                  maxlength="40"
                  counter
                  label="備用信箱"
                  color="#25ECE0"
                  variant="outlined">
                </v-text-field>
              </v-col>
                <!-- 簡介 -->
                <v-col cols="12">
                  <v-textarea
                  v-model="describe.value.value"
                  :error-messages="describe.errorMessage.value"
                  maxlength="50"
                  counter
                  label="社團簡介"
                  color="#25ECE0"
                  variant="outlined">
                </v-textarea>
              </v-col>
              <!-- 按鈕 -->
            <v-col cols="4"  style="padding-top: 0; ">
              <v-btn type="button"
                block class=" rounded-lg"
                style="background-color: #FF8484;height: 60px; font-weight: 900;"
                @click="closeDialog" >
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
import { ref, computed, watch, inject } from 'vue'
import { useForm, useField, useFieldArray } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useDisplay } from 'vuetify'
import { useEmitter } from '@/composables/mitt'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const { xs } = useDisplay()
const isXs = computed(() => xs.value)
const emitter = useEmitter()
// 給元件外部使用

//  選單開關
const dialog = ref(false)

// 關閉對話框
const closeDialog = () => {
  dialog.value = false
  resetForm({
    values: {
      realName: user.REAL_NAME,
      emailUB: user.EMAIL_UB,
      clubTh: user.CLUB_TH,
      clubCategory: user.CLUB_CATEGORY,
      clubCoreMember: CoreMember.value,
      describe: user.DESCRIBE
    }
  })
  fileAgent.value.deleteFileRecord()
}

// 幹部：選好USER_NAME後，放入field.value.USER
const selectUserName = (value, idx) => {
  clubCoreMember.fields.value[idx].value.USER = value
}
//  將表單預設值放進去前，先抓到clubCoreMember要的值
const CoreMember = ref([])

for (const idx in user.CLUB_CORE_MEMBER) {
  CoreMember.value.push({
    USER: user.CLUB_CORE_MEMBER[idx].USER?.USER_NAME || '',
    ROLE: user.CLUB_CORE_MEMBER[idx].ROLE
  })
}

// IMAGE 的 v-model
const fileRecords = ref([])
const rawFileRecords = ref([])

// 為了能讓VueFileAgent能透過ref找到元件
// 然後在onMounted時設定fileAgent的值
const fileAgent = ref(null)

const clubItems = {
  items: ['學術', '學藝', '音樂', '康樂', '服務', '體育', '康輔', '聯誼', '其他']
}
const search = ref('')

// 搜尋使用者id
const searchData = async (idx) => {
  try {
    const { data } = await apiAuth.get('/users/getUser', {
      params: {
        search: clubCoreMember.fields.value[idx].value.USER,
        role: 1
      }
    })

    search.value = data.result.data
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
}

// 1.定義表單資料格式
const schema = yup.object({
  // 姓名/社團名
  realName: yup
    .string()
    .required('「姓名/社團名」必填')
    .max(6, '「姓名/社團名」長度不符'),

  // 備用信箱
  emailUB: yup
    .string()
    .max(40, '「備用信箱」長度不符')
    .test(
      'isEmail', '「備用信箱」格式錯誤',
      (value) => {
        return value ? validator.isEmail(value) : true
      }
    ),
  // 社團屆數
  clubTh: yup
    .number()
    .required('「社團屆數」必填')
    .typeError('「社團屆數」必須是數字'),

  // 社團幹部
  clubCoreMember: yup
    .array(
      yup.object({
        USER: yup.string().required('「用戶名稱」必填'),
        ROLE: yup.string().required('「幹部職稱」必填').max(5, '「幹部職稱」長度不符').min(2, '「幹部職稱」長度不符')
      })
    )
    .test('role', '必須要有社長和副社長', value => {
      return value.filter(item => item.ROLE === '社長').length === 1 && value.filter(item => item.ROLE === '副社長').length === 1
    }
    )
    .test('user', '幹部不可重複', value => {
      // 新的陣列將由原始陣列中每個元素的 USER 屬性的值組成
      const user = value.map(item => item.USER)
      // Set 是一種只能包含唯一值的數據結構
      return new Set(user).size === user.length
    }),

  // 社團類別
  clubCategory: yup
    .string()
    .required('「社團類別」必填')
    .min(2, '「社團類別」不符')
    .max(2, '「社團類別」不符'),

  // 社團簡介
  describe: yup
    .string()
    .max(50, '「社團類別」不符')
})

// 2.useForm建立一個表單(可設預設值)
const { handleSubmit, isSubmitting, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    realName: user.REAL_NAME,
    emailUB: user.EMAIL_UB,
    clubTh: user.CLUB_TH,
    clubCategory: user.CLUB_CATEGORY,
    clubCoreMember: CoreMember.value,
    describe: user.DESCRIBE
  }
})

// 3.useField建立表單的欄位
const realName = useField('realName')
const nickName = useField('nickName')
const emailUB = useField('emailUB')
const clubTh = useField('clubTh')
const clubCoreMember = useFieldArray('clubCoreMember')
const clubCategory = useField('clubCategory')
const describe = useField('describe')
const addClubMemberField = () => {
  clubCoreMember.push({ USER: '', ROLE: '' })
}

const removeClubMemberField = (idx) => {
  clubCoreMember.remove(idx)
}

// 4.送出表單
const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  try {
    const fd = new FormData()

    fd.append('USER_NAME', user.USER_NAME)
    fd.append('REAL_NAME', values.realName)
    fd.append('NICK_NAME', nickName.value.value || values.realName)
    fd.append('EMAIL_UB', values.emailUB)
    fd.append('CLUB_TH', values.clubTh)
    fd.append('CLUB_CATEGORY', values.clubCategory)
    for (const idx in values.clubCoreMember) {
      fd.append(`CLUB_CORE_MEMBER[${idx}][USER]`, values.clubCoreMember[idx].USER)
      fd.append(`CLUB_CORE_MEMBER[${idx}][ROLE]`, values.clubCoreMember[idx].ROLE)
    }
    fd.append('DESCRIBE', values.describe)

    if (fileRecords.value.length > 0) {
      fd.append('IMAGE', fileRecords.value[0].file)
    }

    await apiAuth.patch('/users/edit', fd)

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    // 元件觸發事件，告訴外面要更新
    emitter.emit('updateUser')
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

emitter.on('updateUserOk', async () => {
  closeDialog()
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
