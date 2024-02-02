<template>
<v-form @submit.prevent="submitOne" :disabled="form1.isSubmitting.value" >
  <v-window-item value="one">
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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import UseRole from '@/enums/UserRole.js'

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

const group = {
  items: [
    { text: '社團', value: UseRole.CLUB }
  ]
}
// 1.定義註冊表單的資料格式
const schemaOne = yup.object({
  // value 要跟 useField('') 的值一樣
  role: yup
    .number()
    .required('請選擇註冊身分')
})

//  1.useForm建立一個表單
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
    console.log(role.value.value)
  } catch (error) {
    console.log(error)
  }
})

defineExpose({
  form1,
  submitOne,
  role
})

</script>
