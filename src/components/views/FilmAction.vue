<script setup>

import NavBar from "@/components/NavBar.vue";
import CardItem from "@/components/CardItem.vue";
import {computed, onMounted, ref} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";

const rootStore = useRootStore();
const {filmName,filmInfo} = storeToRefs(rootStore);




onMounted(rootStore.getStartedFilm)
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
  </div>


</template>

<style scoped lang="sass">
.cardPlace
  display: flex
  flex-wrap: wrap
  justify-content: center
  margin-top: 65px
</style>