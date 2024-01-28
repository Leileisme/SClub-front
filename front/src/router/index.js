// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '學生社團網'
          // login: false,
          // admin: false
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '學生社團網 | 註冊'
          // login: false,
          // admin: false
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '學生社團網 | 登入'
          // login: false,
          // admin: false
        }
      }

    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '學生社團網 | 管理'
          // login: true,
          // admin: true
        }
      }]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '學生社團網 | 找不到'
      // login: true,
      // admin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'All',
    redirect: '/404s'
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

// router.beforeEach(async (to, from, next) => {
//   const user = useUserStore()
// })

export default router
