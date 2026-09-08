import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '../views/DashboardView.vue';

import StudentsView from '@/views/StudentsView.vue';
import AddStudentView from '@/views/AddStudentView.vue';
import EditStudentView from '@/views/EditStudentView.vue';
import ViewStudentView from '@/views/ViewStudentView.vue';

import UnitsView from '@/views/UnitsView.vue';
import AddUnitView from '@/views/AddUnitView.vue';
import EditUnitView from '@/views/EditUnitView.vue';
import ViewUnitView from '@/views/ViewUnitView.vue';

import EnrollmentView from '@/views/EnrollmentView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },

    {
      path: '/students',
      component: StudentsView
    },

    {
      path: '/add-student',
      component: AddStudentView
    },

    {
      path: '/edit-student/:id',
      component: EditStudentView
    },

    {
      path: '/view-student/:id',
      component: ViewStudentView
    },

    {
      path: '/units',
      component: UnitsView
    },

    {
      path: '/add-unit',
      component: AddUnitView
    },

    {
      path: '/edit-unit/:id',
      component: EditUnitView
    },

    {
      path: '/view-unit/:id',
      component: ViewUnitView
    },

    {
      path: '/enrollments',
      component: EnrollmentView
    }

  ]

});

export default router;
