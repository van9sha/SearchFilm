<script  setup>


import NavBar from "@/components/NavBar.vue";
import {onMounted} from "vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";

const rootStore = useRootStore();
rootStore.getFilm()
const {filmInfo} = storeToRefs(rootStore);

onMounted(rootStore.getFilm)
</script>

<template>
  <NavBar></NavBar>


</template>

<style scoped>

</style>