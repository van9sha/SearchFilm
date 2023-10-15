<script lang="ts" setup>

import { ref } from 'vue'

import Input from "@/components/Input.vue";
import {storeToRefs} from "pinia";
import {useRootStore} from "@/stores/root";
import router from "@/router";
import {Search} from "@element-plus/icons-vue";



const rootStore = useRootStore()
const {filmName,pageNumber} = storeToRefs(rootStore)

const props = defineProps({
  filmName:{
    type:String,
    required:true
  },
  filmInfo:{
    type:[Object,null]
  }


})

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<template>
  <el-menu

      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="position: fixed; width: 100%; top:0;font-family: Hahmlet,serif"
  >
    <el-menu-item index="0" @click="router.push('/');pageNumber=1;rootStore.getStartedFilm(); rootStore.genreCase=undefined;rootStore.list='most_pop_movies';"><img class="img" src='/src/assets/img/logo2.jpg' alt=""></el-menu-item>
    <div class="flex-grow">
      <Input :filmName="filmName"
             v-model="rootStore.filmName"
             :getFilm="rootStore.getFilm"

      />
      <el-button class="btn-input" :icon="Search" circle  @click="rootStore.getFilm(); router.push({ path: '/Home' })"/>
    </div>

    <el-menu-item
        index="1"
        @click="router.push('/Random');pageNumber=1;rootStore.getStartedFilm(); rootStore.genreCase=undefined;rootStore.list='most_pop_movies'"
    >
      Random films
    </el-menu-item>

    <el-sub-menu index="2"
                 :filmName="filmName"
                 :getFilm="rootStore.getFilm"
                 :getStartedFilm="rootStore.getStartedFilm"
                 :filmInfo="filmInfo"
    >
      <template #title>Genres</template>
      <div class="genres-title">
        <el-menu-item index="2-1" @click="router.push('/film-action'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Action';rootStore.getStartedFilm();">Action</el-menu-item>
        <el-menu-item index="2-2" @click="router.push('/film-adventure'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Adventure';rootStore.getStartedFilm()">Adventure</el-menu-item>
        <el-menu-item index="2-3" @click="router.push('/film-biography'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Biography';rootStore.getStartedFilm()">Biography</el-menu-item>
        <el-menu-item index="2-4" @click="router.push('/film-comedy'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Comedy';rootStore.getStartedFilm()">Comedy</el-menu-item>
        <el-menu-item index="2-5" @click="router.push('/film-documentary');rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Documentary';rootStore.getStartedFilm()">Documentary</el-menu-item>
        <el-menu-item index="2-6" @click="router.push('/film-drama'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Drama';rootStore.getStartedFilm()">Drama</el-menu-item>
        <el-menu-item index="2-7" @click="router.push('/film-fantasy'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Fantasy';rootStore.getStartedFilm()">Fantasy</el-menu-item>
        <el-menu-item index="2-8" @click="router.push('/film-history'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='History';rootStore.getStartedFilm()">History</el-menu-item>
        <el-menu-item index="2-9" @click="router.push('/film-horror'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Horror';rootStore.getStartedFilm()">Horror</el-menu-item>
        <el-menu-item index="2-10" @click="router.push('/film-sport'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Sport';rootStore.getStartedFilm()">Sport</el-menu-item>
        <el-menu-item index="2-11" @click="router.push('/film-thriller'); rootStore.list='most_pop_movies';pageNumber=1;rootStore.genreCase='Thriller';rootStore.getStartedFilm()">Thriller</el-menu-item>

      </div>

    </el-sub-menu>

    <el-menu-item
      index="3"
      @click="router.push('/film-250');rootStore.genreCase=undefined;rootStore.list='top_rated_english_250';pageNumber=1;rootStore.getStartedFilm()"
  >
    TOP 250
  </el-menu-item>
  </el-menu>
</template>

<style lang="sass" scoped>

.flex-grow
  flex-grow: 1
  display: flex

.genres-title
 font-family: Hahmlet,serif

.btn-input
  width: 40px
  height: 40px
  translate: -135px
  margin-top: 12.5px

.img
  width: 60px
  height: 60px

</style>