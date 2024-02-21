// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '學生社團網',
          login: true,
          admin: false
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '學生社團網 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '學生社團網 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: '/event',
        name: 'event',
        component: () => import('@/views/front/EventView.vue'),
        meta: {
          title: '學生社團網 | 活動',
          login: true,
          admin: false
        }
      },
      {
        path: '/post',
        name: 'post',
        component: () => import('@/views/front/PostView.vue'),
        meta: {
          title: '學生社團網 | 動態',
          login: true,
          admin: false
        }
      },
      {
        path: '/ticket',
        name: 'ticket',
        component: () => import('@/views/front/TicketView.vue'),
        meta: {
          title: '學生社團網 | 動態',
          login: true,
          admin: false
        }
      },
      {
        path: '/event/:id',
        name: 'eventDetail',
        component: () => import('@/views/front/EventDetailView.vue'),
        meta: {
          title: '學生社團網 | 活動',
          login: true,
          admin: false
        }
      },
      {
        path: '/:USER_NAME',
        name: 'personal',
        component: () => import('@/views/front/PersonalView.vue'),
        meta: {
          title: '學生社團網 | 個人檔案',
          login: true,
          admin: false
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
          title: '學生社團網 | 管理',
          login: true,
          admin: true
        }
      }]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '學生社團網 | 找不到',
      login: false,
      admin: false
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

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // START_LOCATION 網頁跳轉
  // 進到每一個頁面之前，取的使用者的資訊
  if (from === START_LOCATION) {
    await user.getProfile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
