import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import MyRunsView from "@/views/MyRunsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SignupView from "@/views/SignupView.vue";
import Run from "@/views/Run.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },

    {
      path: '/Home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/MyRuns',
      name: 'MyRuns',
      component: MyRunsView
    },
    {
      path: '/Profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/Run',
      name: 'Run',
      component:Run
    }

  ]
})

export default router
