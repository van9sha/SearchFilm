<script setup>

import NavBar from "@/components/NavBar.vue";
import Input from '@/components/Input.vue'
import {onMounted} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";
import CardItem from "@/components/CardItem.vue";

const rootStore = useRootStore();
const {filmInfo,filmName} = storeToRefs(rootStore);

onMounted(rootStore.getStartedFilm)
</script>

<template>
  <NavBar :filmName="filmName"
          :getFilm="rootStore.getFilm"
  />
  <div class="cardPlace">
    <CardItem
        v-for="filmSearch in filmInfo"
        :filmSearch="filmSearch"
        :key="filmInfo?.id"
        :filmInfo="filmInfo"
        :filmName="filmName"
        :getFilm="rootStore.getFilm"

    />
  </div>
</template>

<style scoped lang="sass">
@import "../assets/styles/main.sass"


</style>