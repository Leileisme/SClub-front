<template>
  <v-dialog  v-model="dialog"  fullscreen transition="dialog-bottom-transition" :persistent="true">
    <!-- 新增活動按鈕 -->
    <template v-slot:activator="{ props }">
      <v-btn v-if="isBtnTrue" type="button"  v-bind="props" style="background-color:#1BBCA9; height: auto; padding-top: 3px; padding-bottom:3px;" >
        <v-icon style="margin-left: -3px;">mdi-plus</v-icon>建立活動
      </v-btn>
      <v-list-item v-else  v-bind="props" :style="style">建立活動</v-list-item>
    </template>

    <v-card class="m-auto">
      <!-- 標題 -->
      <v-toolbar dark color="#333">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title >新增活動</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>

      <!--新增活動表單  -->
      <v-container>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-row>
            <!-- 活動圖片 -->
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
                color="#25ECE0"
                ref="fileAgent">
              </VueFileAgent>
            </v-col>

            <!-- 活動名稱 -->
            <v-col cols="12" style="padding-top: 30px; padding-bottom: 0;">
              <v-text-field
                v-model="title.value.value"
                label="活動名稱"
                :error-messages="title.errorMessage.value"
                minlength="3"
                maxlength="20"
                counter
                color="#25ECE0"
                variant="outlined"
                ></v-text-field>
            </v-col>

            <!-- 活動日期 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-menu  v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" min-width="290px" class="d-flex align-center justify-center">
                      <template v-slot:activator="{ attrs }">
                        <v-text-field
                          :model-value="dateText"
                          :error-messages="date.errorMessage.value"
                          color="#25ECE0"
                          variant="outlined"
                          label="活動日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" @click="menu = !menu">
                        </v-text-field>
                      </template>
                      <!-- <v-date-picker  type="date" color="#25ECE0" v-model="date.value.value" no-time no-title @input="menu = false"> -->
                      <v-date-picker  type="date" color="#25ECE0" v-model="date.value.value" :min="minDate" no-time no-title @input="menu = false">
                        <template v-slot:actions>
                          <v-btn  style="background-color: #25ECE0; color: rgb(0, 0, 0); font-weight: 900;" @click="menu = false">確定</v-btn>
                        </template>
                      </v-date-picker>
                    </v-menu>
            </v-col>

            <!-- 開始時間 -->
            <v-col cols="6" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="startTime.value.value"
                :error-messages="startTime.errorMessage.value"
                minlength="4"
                maxlength="4"
                counter
                variant="outlined"
                color="#25ECE0"
                label="開始時間(EX:1900)"  >
            </v-text-field>
            </v-col>

            <!-- 結束時間 -->
            <v-col cols="6" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="endTime.value.value"
                :error-messages="endTime.errorMessage.value"
                minlength="4"
                maxlength="4"
                counter
                color="#25ECE0"
                variant="outlined"
                label="結束時間(EX:2230)"  >
            </v-text-field>
            </v-col>

            <!-- 活動縣市 -->
            <v-col cols="5" style="padding-top: 0px; padding-bottom: 0;">
              <v-select
                v-model="city.value.value"
                :error-messages="city.errorMessage.value"
                :items="cityItems"
                label="地址(縣市)"
                variant="outlined"
                color="#25ECE0"
                ></v-select>
            </v-col>

            <!-- 活動地址 -->
            <v-col cols="7" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="add.value.value"
                label="活動地址"
                :error-messages="add.errorMessage.value"
                maxlength="40"
                counter
                variant="outlined"
                color="#25ECE0"
                ></v-text-field>
            </v-col>

            <!-- 活動地點備註 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="addRemark.value.value"
                label="活動地點備註"
                :error-messages="addRemark.errorMessage.value"
                maxlength="30"
                counter
                variant="outlined"
                color="#25ECE0"
                ></v-text-field>
            </v-col>

            <!-- 誰可參加 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-select
                v-model="isPublic.value.value"
                :error-messages="isPublic.errorMessage.value"
                :items="isPublicItems"
                label="誰可參加"
                variant="outlined"
                color="#25ECE0"
                ></v-select>
            </v-col>

            <!-- 活動分類 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-select
                v-model="category.value.value"
                :error-messages="category.errorMessage.value"
                :items="categoryItems"
                editable="false"
                multiple
                chips
                label="活動分類"
                variant="outlined"
                color="#25ECE0"
                class="custom-chips"
                ></v-select>
            </v-col>

            <!-- 預售票 -->
            <v-col cols="6" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="preSale.value.value"
                label="預售票(張)"
                maxlength="4"
                :error-messages="preSale.errorMessage.value"
                counter
                color="#25ECE0"
                variant="outlined"
                ></v-text-field>
              </v-col>

            <!-- 現場票 -->
            <v-col cols="6" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="onSiteSale.value.value"
                :error-messages="onSiteSale.errorMessage.value"
                label="現場票(張)"
                maxlength="4"
                counter
                color="#25ECE0"
                variant="outlined"
                ></v-text-field>
            </v-col>

            <!-- 取票資格(取票人榮譽分數門檻) -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-text-field
                v-model="scoreValues.value.value"
                :error-messages="scoreValues.errorMessage.value"
                label="取票資格(取票人榮譽分數門檻，0-100分)"
                maxlength="3"
                counter
                color="#25ECE0"
                variant="outlined"
                >
              </v-text-field>
            </v-col>

            <!-- 協辦單位 - 搜尋 -->
              <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
                <v-combobox
                  v-model="searchRef"
                  label="協辦單位"
                  counter
                  variant="outlined"
                  @input="searchCoOrganizer()"
                  id="searchId"
                  prepend-inner-icon="mdi-account-search"
                  deletable-chips
                  color="#25ECE0"
                  >
                </v-combobox>

              <!-- 搜尋的id -->
              <v-menu activator="#searchId"  @click.stop >
                <v-list style="max-height: 300px; overflow-y: auto;">
                  <!-- 搜尋有符合 -->
                  <template v-if="search">
                    <v-list-item
                    v-for="(item) in search"
                    :key="item.USER_NAME"
                    @click="selectUserName(item.USER_NAME,item._id)"
                    >
                    <!-- 搜尋清單 -->
                      <v-row  style="margin: 5px; ">
                        <v-col :cols="avatarCol" class="justify-center align-center" style="padding: 0px; height: 45px;">
                          <v-avatar size="45"  >
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

            <!-- 協但單位 - 資料欄 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 22px;">
              <v-card variant="outlined" class="d-flex align-center" style="height: 56px;" >
                <v-card-subtitle>協辦單位</v-card-subtitle>
                <v-card-item>
                  <v-chip v-for="(item, idx) in coOrganizerItem.fields.value" :key="idx"  closable @click:close="removeSelectedItem(idx)"   >
                      {{ item }}
                  </v-chip>
                </v-card-item>
              </v-card>
            </v-col>

            <!-- 活動內容 -->
            <v-col cols="12" style="padding-top: 0px; padding-bottom: 0;">
              <v-textarea
                v-model="description.value.value"
                label="活動內容"
                :error-messages="description.errorMessage.value"
                minlength="50"
                maxlength="1000"
                rows="6"
                counter
                color="#25ECE0"
                variant="outlined"
                ></v-textarea>
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
            <v-col cols="4" style="padding-top: 0;padding-bottom: 30px; ">
              <v-btn type="button"
                block class=" rounded-lg "
                style="background-color: #444;height: 60px; font-weight: 900;"
                @click="isEditClick">
                儲存草稿
              </v-btn>
            </v-col>
            <v-col cols="4" style="padding-top: 0;padding-bottom: 30px; ">
              <v-btn type="submit"
                block class=" rounded-lg "
                style="background-color: #1BBCA9;height: 60px; font-weight: 900;"
                >
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
import { ref, computed, inject } from 'vue'
import { useField, useForm, useFieldArray } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useDisplay } from 'vuetify'
import { useEmitter } from '@/composables/mitt'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const { xs, sm } = useDisplay()
const isXs = computed(() => xs.value)
const isSm = computed(() => sm.value)
const emitter = useEmitter()
const router = useRouter()

const cityItems = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', '基隆市', '新竹市', '嘉義市']
const isPublicItems = ['公開', '學生']
const categoryItems = ['音樂', '合唱', '管樂', '吉他', '熱音', '熱舞', '手語', '康輔', '桌遊', '運動', '棒球', '桌球', '籃球', '羽球', '排球', '天文', '文學', '話劇', '美術', '攝影', '校友會', '學生會', '系學會', '營隊', '學習']

const avatarCol = computed(() => {
  if (isXs.value) {
    return 3
  } else {
    return 2
  }
})

const props = defineProps({
  isBtn: {
    type: Boolean,
    default: true,
    required: false
  },
  isMobile: {
    type: Boolean,
    default: false,
    required: false
  }
})

const isBtnTrue = computed(() => {
  if (props.isBtn) {
    return true
  } else {
    return false
  }
})

const style = computed(() => {
  if (props.isMobile) {
    return {
      fontSize: '1.2rem'
    }
  } else {
    return {
      fontSize: '1rem'
    }
  }
})

//  選單開關
const dialog = ref(false)

// 表單對話框正在編輯的商品 ID
// 空的話代表是新增商品
const dialogId = ref('')

// 關閉對話框
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

// 註冊 - 日曆/轉換日期格式
const menu = ref(false)
// 日期格式轉換
const dateText = computed(() => date.value.value ? new Date(date.value.value).toLocaleDateString().substring(0, 10) : '')
const minDate = new Date()

const fileRecords = ref([])
const rawFileRecords = ref([])
// 為了能讓VueFileAgent能透過ref找到元件
// 然後在onMounted時設定fileAgent的值
const fileAgent = ref(null)

// 儲存草稿
const isEditClick = () => {
  isEdit.value.value = true
  submit()
}

// 協辦單位
const search = ref('')
const searchRef = ref('')
const removeSelectedItem = (idx) => {
  coOrganizer.fields.value.splice(idx, 1)
  coOrganizerItem.fields.value.splice(idx, 1)
}

// 選好USER_NAME後，放入表單
const selectUserName = (USER_NAME, _id) => {
  coOrganizer.fields.value.push(_id)
  coOrganizerItem.fields.value.push(USER_NAME)
  searchRef.value = ''
}

// 搜尋使用者id
const searchCoOrganizer = async () => {
  try {
    const { data } = await apiAuth.get('/users/getUser', {
      params: {
        search: searchRef.value,
        role: 3
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

// 1.定義表單的料格式
const schema = yup.object({
  // 1.活動名稱
  title: yup
    .string()
    .required('「活動名稱」必填')
    .min(3, '「活動名稱」長度不符')
    .max(20, '「「活動名稱」長度不符'),

  // 2.活動日期/時間
  date: yup
    .string()
    .required('「活動日期」必填'),

  // 2.活動時間
  startTime: yup
    .number()
    .typeError('必須是數字')
    .required('「活動時間」必填'),

  // 2.活動時間
  endTime: yup
    .number()
    .typeError('必須是數字')
    .required('「活動時間」必填')
    .max(2359, '「活動時間」長度不符'),

  // 3.活動縣市
  city: yup
    .string()
    .required('「活動縣市」必填')
    .min(3, '「活動縣市」長度不符')
    .max(3, '「「活動縣市」長度不符'),

  // 4.活動地址
  add: yup
    .string()
    .required('「活動地址」必填')
    .max(40, '「活動地址」長度不符'),

  // 5.活動地點備註
  addRemark: yup
    .string()
    .max(30, '「地點備註」長度不符'),

  // 6.誰可參加
  isPublic: yup
    .string()
    .required('「誰可參加」必填')
    .min(2, '「誰可參加」長度不符')
    .max(2, '「誰可參加」長度不符'),

  // 7.活動分類
  category: yup
    .array().of(yup.string())
    .max(5, '最多5個標籤')
    .required('「活動分類」必填'),

  // 8.預售人數
  preSale: yup
    .number()
    .typeError('必須是數字')
    .max(9999, '「預售人數」長度不符')
    .required('「預售人數」必填'),

  // 9.現場票
  onSiteSale: yup
    .number()
    .typeError('必須是數字')
    .max(9999, '「現場票」長度不符')
    .required('「現場票」必填'),

  // 10.取票資格(榮譽分數)
  scoreValues: yup
    .number()
    .typeError('必須是數字')
    .max(100, '「取票資格」長度不符')
    .required('「取票資格」必填'),

  // 11.活動內容
  description: yup
    .string()
    .required('「活動內容」必填')
    .min(50, '「活動內容」長度不符')
    .max(1000, '「活動內容」長度不符'),

  // 14.協辦單位
  coOrganizer: yup
    .array().of(yup.string())
    .test('is-unique', '協辦單位重複', function (value) {
      if (!value || !value.length) return true // 如果數組為空，唯一值
      const uniqueValues = new Set(value) // 使用 Set 數據結構，它只允許唯一值
      return uniqueValues.size === value.length
    }),
  coOrganizerItem: yup
    .array().of(yup.string())
    .test('is-unique', '協辦單位重複', function (value) {
      if (!value || !value.length) return true // 如果數組為空，唯一值
      const uniqueValues = new Set(value) // 使用 Set 數據結構，它只允許唯一值
      return uniqueValues.size === value.length
    }),

  // 19.草稿
  isEdit: yup
    .boolean()
    .required('「草稿」必填')
})

// 2.useForm建立一個表單(可設預設值)
const { handleSubmit, isSubmitting, resetForm, errors } = useForm({ validationSchema: schema, initialValues: { isEdit: false } })

// 3.useField建立表單的欄位
const title = useField('title')
const date = useField('date')
const startTime = useField('startTime')
const endTime = useField('endTime')
const city = useField('city')
const add = useField('add')
const addRemark = useField('addRemark')
const isPublic = useField('isPublic')
const category = useField('category')
const preSale = useField('preSale')
const onSiteSale = useField('onSiteSale')
const scoreValues = useField('scoreValues')
const description = useField('description')
const coOrganizer = useFieldArray('coOrganizer', {
  value: []
})

const coOrganizerItem = useFieldArray('coOrganizerItem', {
  value: []
})
const isEdit = useField('isEdit')

// 4.送出表單
const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return

  try {
    console.log('values', values)
    console.log('category.value.value', category.value.value)
    const fd = new FormData()
    const dateValue = date.value.value ? new Date(date.value.value).toLocaleDateString().substring(0, 10) : date.value.value
    const timeValue = startTime.value.value + ' ' + endTime.value.value
    fd.append('TITLE', title.value.value)
    fd.append('DATE', dateValue + ' ' + timeValue)
    fd.append('CITY', city.value.value)
    fd.append('ADD', add.value.value)
    fd.append('IS_PUBLIC', isPublic.value.value)
    fd.append('CATEGORY', category.value.value)
    fd.append('PRE_SALE', preSale.value.value)
    fd.append('ON_SITE_SALE', onSiteSale.value.value)
    fd.append('SCORE_VALUES', scoreValues.value.value)
    fd.append('DESCRIPTION', description.value.value)
    fd.append('HOST', user._id)
    fd.append('IS_EDIT', isEdit.value.value)
    fd.append('IMAGE', fileRecords.value[0].file)

    if (coOrganizer.fields.value.length > 0) {
      fd.append('CO_ORGANIZER', coOrganizer.fields.value)
    }

    if (addRemark.value.value) {
      fd.append('ADD_REMARK', addRemark.value.value)
    }

    const response = await apiAuth.post('/events', fd)
    const eventId = response.data.result._id // 從伺服器回應中取得新建事件的 _id
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/event/' + eventId)
  } catch (error) {
    console.log(error)
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
<style scoped>
::v-deep .custom-chips .v-chip {
  border-radius: 4px !important;
  color:#25ECE0 ;
  font-size: 0.9rem;
}
</style>
