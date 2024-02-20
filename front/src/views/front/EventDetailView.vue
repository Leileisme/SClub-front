<template>
  <!-- 頂部導覽列 -->
  <template v-if="isXs">
    <v-app-bar>
      <v-container class="align-center justify-space-around d-flex">
        <v-btn icon="mdi-chevron-left" style="font-size: 1.4rem;"></v-btn>
        <v-app-bar-title class="text-h5">{{routeEvent.TITLE}}</v-app-bar-title>
        <v-btn v-bind="props" icon="mdi-menu" style="font-size: 1.25rem;"> </v-btn>
      </v-container>
    </v-app-bar>
  </template>

  <!-- 內容 -->
  <!-- <v-img
  :width="371"
  aspect-ratio="16/9"
  cover
  :src="routeEvent.IMAGE"
></v-img> -->

<v-img
  :width="400"
  aspect-ratio="16/9"
  cover
  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
></v-img>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 判斷是否用手機
const { xs } = useDisplay()
const isXs = computed(() => xs.value)

const routeEvent = ref({
  TITLE: (''),
  DATE: (''),
  CITY: (''),
  ADD: (''),
  ADD_REMARK: (''),
  IS_PUBLIC: (''),
  CATEGORY: ([]),
  PRE_SALE: (''),
  ON_SITE_SALE: (''),
  SCORE_VALUES: (''),
  DESCRIPTION: (''),
  IMAGE: (''),
  HOST: ([]),
  CO_ORGANIZER: ([]),
  TICKET: ([]),
  LIKES: ([]),
  KEEPS: ([]),
  REACH: (''),
  IS_EDIT: (''),
  POST: ([]),
  PHOTO: ([])
})

const getEventById = async () => {
  try {
    const { data } = await apiAuth.get('/events/' + route.params.id)
    routeEvent.value.TITLE = data.result.TITLE
    routeEvent.value.DATE = data.result.DATE
    routeEvent.value.CITY = data.result.CITY
    routeEvent.value.ADD = data.result.ADD
    routeEvent.value.ADD_REMARK = data.result.ADD_REMARK
    routeEvent.value.IS_PUBLIC = data.result.IS_PUBLIC
    routeEvent.value.CATEGORY = data.result.CATEGORY
    routeEvent.value.PRE_SALE = data.result.PRE_SALE
    routeEvent.value.ON_SITE_SALE = data.result.ON_SITE_SALE
    routeEvent.value.SCORE_VALUES = data.result.SCORE_VALUES
    routeEvent.value.DESCRIPTION = data.result.DESCRIPTION
    routeEvent.value.IMAGE = data.result.IMAGE
    routeEvent.value.HOST = data.result.HOST
    routeEvent.value.CO_ORGANIZER = data.result.CO_ORGANIZER
    routeEvent.value.TICKET = data.result.TICKET
    routeEvent.value.LIKES = data.result.LIKES
    routeEvent.value.KEEPS = data.result.KEEPS
    routeEvent.value.REACH = data.result.REACH
    routeEvent.value.IS_EDIT = data.result.IS_EDIT
    routeEvent.value.POST = data.result.POST
    routeEvent.value.PHOTO = data.result.PHOTO

    console.log(data.result)

    document.title = `學生社團 | ${routeEvent.value.TITLE}`
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

onMounted(async () => {
  await getEventById()
})

</script>
