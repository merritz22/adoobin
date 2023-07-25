import { createRouter, createWebHistory } from 'vue-router'
import AuthVue from '@/layouts/Auth.vue'
import LoginVue from '../views/auth/Login.vue'
import RegisterVue from '../views/auth/Register.vue'
import RecoverVue from '../views/auth/RecoverPassword.vue'

import ProfileVue from '@/views/Profile.vue'
import LandingVue from '@/views/Landing.vue'
import IndexVue from '@/views/Index.vue'

const routes = [
  {
    path: "/auth",
    redirect: "/auth/login",
    component: AuthVue,
    children: [
      {
        path: "/auth/login",
        component: LoginVue,
        name: 'login',
      },
      {
        path: "/auth/register",
        component: RegisterVue,
      },
      {
        path: "/auth/recover",
        component: RecoverVue,
      },
    ],
  },
  {
    path: "/patient",
    component: ProfileVue,
  },
  {
    path: "/landing",
    component: LandingVue,
  },
  {
    path: "/",
    component: IndexVue,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
