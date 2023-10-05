<script setup>

import NavBar from "@/components/NavBar.vue";
import {computed, onMounted, ref} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";
import CardItem from "@/components/CardItem.vue";
import axios from "axios";

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

.example-pagination-block + .example-pagination-block
  margin-top: 10px

.example-pagination-block .example-demonstration
  margin-bottom: 16px

</style>