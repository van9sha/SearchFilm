<script setup>

import NavBar from "@/components/NavBar.vue";
import CardItem from "@/components/CardItem.vue";
import {computed, onMounted, ref} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";

const rootStore = useRootStore();
const {filmName,filmInfo,pageNumber} = storeToRefs(rootStore);





</script>

<template>
<NavBar :filmName="filmName"
        :getFilm="rootStore.getFilm"
        :getStartedFilm="rootStore.getStartedFilm"
        :filmInfo="filmInfo"/>

  <div class="cardPlace">
    <CardItem
        v-for="filmSearch in filmInfo"
        :filmSearch="filmSearch"
        :key="filmInfo?.id"
        :filmInfo="filmInfo"
        :filmName="filmName"
        :getFilm="rootStore.getFilm"

    />

    <div class="page-wrapper">
      <div class='page-wrapper-number'
           v-for="page in 10"
           :key="page"
           :class="{
           'current_page': page === pageNumber
         }"
           @click="pageNumber = page; rootStore.getStartedFilm()"
      >
        <strong>{{ page }}</strong>
      </div>
    </div>
  </div>


</template>

<style scoped lang="sass">
@import "../../assets/styles/main.sass"

</style>