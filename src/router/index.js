import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import Film from '@/components/FilmCard.vue'
import {ROUTES_PATHS} from "@/constants/router";
import Random from "@/pages/Random.vue";
import FilmAction from "@/components/views/FilmAction.vue";
import TopRaiting from "@/components/views/TopRaiting.vue";

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
    },
    {
      path: ROUTES_PATHS.ACTION,
      name: ROUTES_PATHS.ACTION,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.COMEDY,
      name: ROUTES_PATHS.COMEDY,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.DOCUMENTARY,
      name: ROUTES_PATHS.DOCUMENTARY,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.ADVENTURE,
      name: ROUTES_PATHS.ADVENTURE,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.BIOGRAPHY,
      name: ROUTES_PATHS.BIOGRAPHY,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.HISTORY,
      name: ROUTES_PATHS.HISTORY,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.SPORT,
      name: ROUTES_PATHS.SPORT,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.HORROR,
      name: ROUTES_PATHS.HORROR,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.FANTASY,
      name: ROUTES_PATHS.FANTASY,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.DRAMA,
      name: ROUTES_PATHS.DRAMA,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.THRILLER,
      name: ROUTES_PATHS.THRILLER,
      component: FilmAction
    },
    {
      path: ROUTES_PATHS.TOP250,
      name: ROUTES_PATHS.TOP250,
      component: TopRaiting
    }
  ]
})

export default router
