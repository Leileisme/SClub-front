import {  ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/composables/axios'
const { apiAuth } = useApi()
const router = useRouter()
const route = useRoute()

export function useRouteUser () {
  const routeUser = ref({
    EMAIL: (''),
    ROLE: (''),
    SCHOOL_NAME: (''),
    SCHOOL_CITY: (''),
    USER_NAME: (''),
    NICK_NAME: (''),
    CLUB_TH: (''),
    CLUB_CATEGORY: (''),
    IMAGE: (''),
    TICKET_CART: ([]),
    SCORES: (''),
    NOTIFY: ([]),
    KEEP_POST: ([]),
    KEEP_EVENT: ([]),
    FANS: ([]),
    FOLLOW: ([]),
    IS_STUDENT: (''),
    IS_ABLE: (''),
    IS_ADMIN: (''),
    DESCRIBE: ('')
  })

  onMounted(async () => {
    try {
      const { data } = await apiAuth.get('/users/' + route.params.USER_NAME)
      routeUser.value.EMAIL = data.result.EMAIL
      routeUser.value.ROLE = data.result.ROLE
      routeUser.value.SCHOOL_NAME = data.result.SCHOOL_NAME
      routeUser.value.SCHOOL_CITY = data.result.SCHOOL_CITY
      routeUser.value.USER_NAME = data.result.USER_NAME
      routeUser.value.NICK_NAME = data.result.NICK_NAME
      routeUser.value.CLUB_TH = data.result.CLUB_TH
      routeUser.value.CLUB_CATEGORY = data.result.CLUB_CATEGORY
      routeUser.value.IMAGE = data.result.IMAGE
      routeUser.value.TICKET_CART = data.result.TICKET_CART
      routeUser.value.SCORES = data.result.SCORES
      routeUser.value.NOTIFY = data.result.NOTIFY
      routeUser.value.KEEP_POST = data.result.KEEP_POST
      routeUser.value.KEEP_EVENT = data.result.KEEP_EVENT
      routeUser.value.FANS = data.result.FANS
      routeUser.value.FOLLOW = data.result.FOLLOW
      routeUser.value.IS_STUDENT = data.result.IS_STUDENT
      routeUser.value.IS_ABLE = data.result.IS_ABLE
      routeUser.value.IS_ADMIN = data.result.IS_ADMIN
      routeUser.value.DESCRIBE = data.result.DESCRIBE

      document.title = `學生社團 | ${routeUser.value.NICK_NAME}`
    } catch (error) {
      console.log(error)

      router.push('/')
    }
  })

  return {
    routeUser
  }
}

// export const routeUser = ref({
//   EMAIL: (''),
//   ROLE: (''),
//   SCHOOL_NAME: (''),
//   SCHOOL_CITY: (''),
//   USER_NAME: (''),
//   NICK_NAME: (''),
//   CLUB_TH: (''),
//   CLUB_CATEGORY: (''),
//   IMAGE: (''),
//   TICKET_CART: ([]),
//   SCORES: (''),
//   NOTIFY: ([]),
//   KEEP_POST: ([]),
//   KEEP_EVENT: ([]),
//   FANS: ([]),
//   FOLLOW: ([]),
//   IS_STUDENT: (''),
//   IS_ABLE: (''),
//   IS_ADMIN: (''),
//   DESCRIBE: ('')
// })


// onMounted(async () => {
//   try {
//     const { data } = await apiAuth.get('/users/' + route.params.USER_NAME)
//     routeUser.value.EMAIL = data.result.EMAIL
//     routeUser.value.ROLE = data.result.ROLE
//     routeUser.value.SCHOOL_NAME = data.result.SCHOOL_NAME
//     routeUser.value.SCHOOL_CITY = data.result.SCHOOL_CITY
//     routeUser.value.USER_NAME = data.result.USER_NAME
//     routeUser.value.NICK_NAME = data.result.NICK_NAME
//     routeUser.value.CLUB_TH = data.result.CLUB_TH
//     routeUser.value.CLUB_CATEGORY = data.result.CLUB_CATEGORY
//     routeUser.value.IMAGE = data.result.IMAGE
//     routeUser.value.TICKET_CART = data.result.TICKET_CART
//     routeUser.value.SCORES = data.result.SCORES
//     routeUser.value.NOTIFY = data.result.NOTIFY
//     routeUser.value.KEEP_POST = data.result.KEEP_POST
//     routeUser.value.KEEP_EVENT = data.result.KEEP_EVENT
//     routeUser.value.FANS = data.result.FANS
//     routeUser.value.FOLLOW = data.result.FOLLOW
//     routeUser.value.IS_STUDENT = data.result.IS_STUDENT
//     routeUser.value.IS_ABLE = data.result.IS_ABLE
//     routeUser.value.IS_ADMIN = data.result.IS_ADMIN
//     routeUser.value.DESCRIBE = data.result.DESCRIBE

//     document.title = `學生社團 | ${routeUser.value.NICK_NAME}`
//   } catch (error) {
//     console.log(error)

//     router.push('/')
//   }
// })
