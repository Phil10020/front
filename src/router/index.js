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
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/front/HomeView.vue'),
        meta: {
          title: '旅圖',
          login: false,
          admin: false
        }
      },
      {
        path: 'city',
        name: 'City',
        component: () => import(/* webpackChunkName: "home" */ '@/views/front/CityView.vue'),
        meta: {
          title: '城市探索',
          login: false,
          admin: false
        }
      },
      {
        path: 'cityDetail',
        name: 'CityDetail',
        component: () => import(/* webpackChunkName: "home" */ '@/views/front/CityDetail.vue'),
        meta: {
          title: '城市探索',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/front/RegisterView.vue'),
        meta: {
          title: '旅圖 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/front/LoginView.vue'),
        meta: {
          title: '旅圖 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product" */ '@/views/front/ProductView.vue'),
        meta: {
          title: '購物網 | 商品',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart" */ '@/views/front/CartView.vue'),
        meta: {
          title: '旅圖 | 行程管理',
          login: true,
          admin: false
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import(/* webpackChunkName: "orders" */ '@/views/front/OrdersView.vue'),
        meta: {
          title: '旅圖 | 訂單',
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
        component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/HomeView.vue'),
        meta: {
          title: '購物網 | 管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "admin-products" */ '@/views/admin/ProductsView.vue'),
        meta: {
          title: '購物網 | 商品管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "admin-orders" */ '@/views/admin/OrdersView.vue'),
        meta: {
          title: '購物網 | 訂單管理',
          login: true,
          admin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  // 剛進網頁時的第一次路由跳轉
  if (from === START_LOCATION) {
    // 取得使用者資訊
    await user.getProfile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 如果有登入，去註冊或登入頁，導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果沒登入，去需要登入的頁面，導向回登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 去管理員頁面，如果不是管理員，導向回首頁
    next('/')
  } else {
    // 不做導向
    next()
  }
})

export default router
