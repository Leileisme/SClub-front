<template lang="pug">
  VContainer
    VForm(@submit.prevent="submit")
      pre {{ errors }}
      VTextField(
        label="Test"
        v-model="test.value.value"
        :error-messages="test.errorMessage.value"
      )
      VRow(v-for="(field, idx) in members.fields.value" :key="field.key")
        VCol(cols="3")
          pre {{ field }}
        VCol(cols="3")
          VTextField(
            label="USER"
            v-model="field.value.USER"
            :error-messages="errors[`members[${idx}].USER`]"
          )
        VCol(cols="3")
          VTextField(
            label="ROLE"
            v-model="field.value.ROLE"
            :error-messages="errors[`members[${idx}].ROLE`]"
          )
        VCol(cols="3")
          VBtn(icon="mdi-plus" v-if="idx === 0" @click="addMemberField")
          VBtn(icon="mdi-minus" v-else @click="removeMemberField(idx)")
      VBtn(type="submit" color="green") Submit
  </template>
  
<script setup>
import { useForm, useFieldArray, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  test: yup.string().required('Test is required'),
  members: yup.array(
    yup.object({
      USER: yup.string().required('USER is required'),
      ROLE: yup.string().required('ROLE is required')
    })
  ).test('role', 'ROLE ERROR', (value) => {
    return value.filter((v) => v.ROLE === 'a').length === 1 && value.filter((v) => v.ROLE === 'b').length === 1
  })
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    test: '',
    members: [
      { USER: '', ROLE: '' }
    ]
  }
})
const test = useField('test')
const members = useFieldArray('members')
const addMemberField = () => {
  members.push({ USER: '', ROLE: '' })
}
const removeMemberField = (index) => {
  members.remove(index)
}

const submit = handleSubmit(values => {
  console.log(values)
})
</script>
