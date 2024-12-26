import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DashBoardView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (currentUser && (to.name === 'login' || to.name === 'register')) {
    // Redirect the user to the dashboard page if they are already logged in and try to access the login or register page
    next('/login')
  } else if (requiresAuth && !currentUser) {
    // If the user is not logged in, but there is a saved session, log the user in
    const savedSession = localStorage.getItem('user-session')
    if (savedSession) {
      const { user, accessToken } = JSON.parse(savedSession)
      try {
        await auth.signInWithCustomToken(accessToken)
        next()
      } catch (error) {
        console.error(error)
        next('/login')
      }
    } else {
      // Redirect the user to the login page
      next('/login')
    }
  } else {
    next()
  }
})

export default router
