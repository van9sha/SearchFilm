<script lang="ts" setup>
import { ref } from 'vue'

import Input from "@/components/Input.vue";
import {storeToRefs} from "pinia";
import {useRootStore} from "@/stores/root";
import router from "@/router";



const rootStore = useRootStore();
const {filmName,genreCase} = storeToRefs(rootStore);

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
      style="position: fixed; width: 100%; top:0"
  >
    <el-menu-item index="0" @click="router.push('/');rootStore.genreCase=undefined;rootStore.getStartedFilm()"><img class="img" src='/src/assets/img/logo2.jpg'></el-menu-item>
    <div class="flex-grow">
      <Input :filmName="filmName"
             v-model="rootStore.filmName"
             :getFilm="rootStore.getFilm"

      />
    </div>

    <el-menu-item
        index="1"
        @click="router.push('/'); rootStore.genreCase=undefined;rootStore.getStartedFilm()"
    >
      Рандомный фильм
    </el-menu-item>

    <el-sub-menu index="2"
                 :filmName="filmName"
                 :getFilm="rootStore.getFilm"
                 :getStartedFilm="rootStore.getStartedFilm"
                 :filmInfo="filmInfo"
    >
      <template #title>Жанры</template>
      <el-menu-item index="2-1" @click="router.push('/film-action'); rootStore.genreCase='Action';rootStore.getStartedFilm();">Action</el-menu-item>
      <el-menu-item index="2-2" @click="router.push('/film-adventure'); rootStore.genreCase='Adventure';rootStore.getStartedFilm()">Adventure</el-menu-item>
      <el-menu-item index="2-3" @click="router.push('/film-biography'); rootStore.genreCase='Biography';rootStore.getStartedFilm()">Biography</el-menu-item>
      <el-menu-item index="2-4" @click="router.push('/film-comedy'); rootStore.genreCase='Comedy';rootStore.getStartedFilm()">Comedy</el-menu-item>
      <el-menu-item index="2-5" @click="router.push('/film-documentary');rootStore.genreCase='Documentary';rootStore.getStartedFilm()">Documentary</el-menu-item>
      <el-menu-item index="2-6" @click="router.push('/film-drama'); rootStore.genreCase='Drama';rootStore.getStartedFilm()">Drama</el-menu-item>
      <el-menu-item index="2-7" @click="router.push('/film-fantasy'); rootStore.genreCase='Fantasy';rootStore.getStartedFilm()">Fantasy</el-menu-item>
      <el-menu-item index="2-8" @click="router.push('/film-history'); rootStore.genreCase='History';rootStore.getStartedFilm()">History</el-menu-item>
      <el-menu-item index="2-9" @click="router.push('/film-horror'); rootStore.genreCase='Horror';rootStore.getStartedFilm()">Horror</el-menu-item>
      <el-menu-item index="2-10" @click="router.push('/film-sport'); rootStore.genreCase='Sport';rootStore.getStartedFilm()">Sport</el-menu-item>
      <el-menu-item index="2-11" @click="router.push('/film-thriller'); rootStore.genreCase='Thriller';rootStore.getStartedFilm()">Thriller</el-menu-item>


    </el-sub-menu>
  </el-menu>
</template>

<style lang="sass" scoped>

.flex-grow
  flex-grow: 1

.img
  width: 60px
  height: 60px

</style>