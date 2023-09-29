<script lang="ts" setup>
import { ref } from 'vue'
import {VideoPlay} from "@element-plus/icons-vue";
import Input from "@/components/Input.vue";
import {storeToRefs} from "pinia";
import {useRootStore} from "@/stores/root";
import router from "@/router";
import random from "@/pages/Random.vue";


const rootStore = useRootStore();
rootStore.getFilm()
rootStore.getStartedFilm()
const {filmName} = storeToRefs(rootStore);

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
    <el-menu-item index="0" @click="router.push('/');rootStore.getStartedFilm()"><img class="img" src='/src/assets/img/logo2.jpg'></el-menu-item>
    <div class="flex-grow">
      <Input :filmName="filmName"
             v-model="rootStore.filmName"
             :getFilm="rootStore.getFilm"

      />
    </div>

    <el-menu-item
        index="1"
        @click="router.push('/');rootStore.getStartedFilm()"
    >
      Рандомный фильм
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>Жанры</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
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