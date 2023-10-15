<script setup>
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import CardItem from "@/components/CardItem.vue";
import NavBar from "@/components/NavBar.vue";

const rootStore = useRootStore();
const {filmInfo,filmName,pageNumber} = storeToRefs(rootStore);



const sizePage = ref(12)
const totalPage = ref(10)





async function getTitles() {
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles`,
    params: {
      page: pageNumber.value,
      list:'most_pop_movies',
      limit: sizePage.value,
      sort: 'year.decr',
    },

    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    rootStore.filmInfo = response?.data?.results
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


onMounted(getTitles)
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

    <div class="page-wrapper">
      <div class='page-wrapper-number'
           v-for="page in totalPage"
           :key="page"
           :class="{
           'current_page': page === pageNumber
         }"
           @click="pageNumber = page; getTitles()"
      >
        <strong>{{ page }}</strong>
      </div>
    </div>


  </div>





</template>

<style scoped lang="sass">
@import "../assets/styles/main.sass"

.example-pagination-block + .example-pagination-block
  margin-top: 10px

.example-pagination-block .example-demonstration
  margin-bottom: 16px
</style>