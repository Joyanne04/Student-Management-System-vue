import { createRouter, createWebHistory } from 'vue-router'

import LoginPageView from '@/views/LoginPageView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'

import StudentsView from '@/views/StudentsView.vue'
import AddStudentView from '@/views/AddStudentView.vue'
import EditStudentView from '@/views/EditStudentView.vue'
import ViewStudentView from '@/views/ViewStudentView.vue'

import UnitsView from '@/views/UnitsView.vue'
import AddUnitView from '@/views/AddUnitView.vue'
import EditUnitView from '@/views/EditUnitView.vue'
import ViewUnitView from '@/views/ViewUnitView.vue'

import EnrollmentView from '@/views/EnrollmentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPageView,
      meta: { requiresAuth: false },
    },

    {
      path: '/',
      alias: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },

    {
      path: '/profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },

    {
      path: '/students',
      component: StudentsView,
      meta: { requiresAuth: true },
    },

    {
      path: '/add-student',
      component: AddStudentView,
      meta: { requiresAuth: true },
    },

    {
      path: '/edit-student/:id',
      component: EditStudentView,
      meta: { requiresAuth: true },
    },

    {
      path: '/view-student/:id',
      component: ViewStudentView,
      meta: { requiresAuth: true },
    },

    {
      path: '/units',
      component: UnitsView,
      meta: { requiresAuth: true },
    },

    {
      path: '/add-unit',
      component: AddUnitView,
      meta: { requiresAuth: true },
    },

    {
      path: '/edit-unit/:id',
      component: EditUnitView,
      meta: { requiresAuth: true },
    },

    {
      path: '/view-unit/:id',
      component: ViewUnitView,
      meta: { requiresAuth: true },
    },

    {
      path: '/enrollments',
      component: EnrollmentView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
