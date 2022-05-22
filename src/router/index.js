import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1')
const Products = () => import('../views/Products/Products')
const Product = () => import('../views/Products/Product')
const GenerateQR = () => import('../views/Products/QRcodeGenerated')
/* Authentic View */
const SignIn = () => import('../views/AuthPages/Default/SignIn')
const SignUp = () => import('../views/AuthPages/Default/SignUp')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')

// {
//   path: 'all-Products',
//   name: prop + '.all-Products',
//   // meta: { auth: true, name: 'Products' },
//   component: Category1,
//   beforeEnter: (to, from, next) => {
//     if (parseJwt(localStorage.getItem('access_token')).user_id === 1) {
//       next()
//     } else {
//       next({ path: '/home-1' })
//     }
//   }
// },
function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
};

Vue.use(VueRouter)
var Url = 'http://localhost:8000/api/'

axios.interceptors.request.use(
  config => {
    config.baseURL = Url
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
const childRoutes = (prop) => [
  {
    path: 'home-1',
    name: prop + '.home-1',
    meta: { auth: true, name: 'Home' },
    component: Dashboard1
  },
  {
    path: 'products',
    name: prop + '.products',
    meta: { auth: true, name: 'Products' },
    component: Products
  },
  // {
  //   path: 'product/:id',
  //   name: prop + '.product.show',
  //   meta: { auth: false, name: 'Product' },
  //   component: Product
  // },
  {
    path: 'generate/QR/:id',
    name: prop + '.QR',
    meta: { auth: true, name: 'GenerateQR' },
    component: GenerateQR
  },
  //end admins
]

const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { auth: true },
    component: SignUp
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true },
    component: ConfirmMail1
  },
  {
    path: 'show/:id',
    name: prop + '.show',
    meta: { auth: true },
    component: Product
  }
]


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: VerticleLayout,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/product',
    name: 'product',
    component: VerticleLayout,
    meta: { auth: false },
    children: authChildRoutes('auth1')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  axios.get('auth/details').then((res) => {
    localStorage.setItem('user', JSON.stringify(res.data))
  }).catch(() => {
    let path =  "" + window.location.href + ""
    let str = 'product/show'
    if (!path.includes(str)) {
      router.push({ name: 'auth1.sign-in1' })
    }
  })
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1']
  // if (publicPages.includes(to.path)) {
  //   localStorage.removeItem('user')
  //   localStorage.removeItem('access_token')
  // }
  // const authRequired = !publicPages.includes(to.path)
  // const loggedIn = localStorage.getItem('user')
  // if (to.meta.auth) {
  //   if (authRequired && loggedIn === null) {
  //     return next('/auth/sign-in1')
  //   } else if (to.name === 'dashboard') {
  //     return next('/home-1')
  //   }
  // }
  next()
})

export default router
