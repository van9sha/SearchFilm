<script  setup>


import NavBar from "@/components/NavBar.vue";
import Input from '@/components/Input.vue'
import {onMounted} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";
import CardItem from "@/components/CardItem.vue";

const rootStore = useRootStore();
rootStore.getFilm()
rootStore.getStartedFilm()
const {filmInfo,filmName,filmsSearch} = storeToRefs(rootStore);

onMounted(rootStore.getStartedFilm)
</script>

<template>
  <NavBar/>
  <Input
      :filmName="filmName"
      v-model="rootStore.filmName"
      :getFilm="rootStore.getFilm"
  />
  <div class="cardPlace">
    <CardItem
        v-for="filmSearch in filmInfo"
        :filmSearch="filmSearch"
        :key="filmInfo?.id"
        :filmInfo="filmInfo"

    />
  </div>



</template>

<style lang="sass" scoped>
.cardPlace
  display: flex
  flex-wrap: wrap
  justify-content: center
</style>