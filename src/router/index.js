import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import Film from '@/components/Film.vue'
import {ROUTES_PATHS} from "@/constants/router";
import Random from "@/pages/Random.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: ROUTES_PATHS.HOME,
      component: Home
    },
    {
      path: ROUTES_PATHS.FILM,
      name: ROUTES_PATHS.FILM,
      component: Film
    },
    {
      path: ROUTES_PATHS.RANDOM,
      name: ROUTES_PATHS.RANDOM,
      component: Random
    }
  ]
})

export default router
