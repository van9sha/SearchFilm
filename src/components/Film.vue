<script setup>


import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavBar from "@/components/NavBar.vue";
const route = useRoute();

const detailFilmInfo = ref(null)
const extendedCast = ref(null)
const creators = ref(null)
const budget = ref(null)
const de = ref(null)

const props = defineProps({
  filmName:{
    type:String
  },
})

const filmId = computed(() =>
    route.path.split('/').pop());
async function getDetailCard() {
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,
    params: {info: 'base_info'},
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    detailFilmInfo.value = response?.data.results
  } catch (error) {
    console.log(error);
  }
}


//Cast
async function getExtendedCast(){
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,
    params: {
      info: 'extendedCast'
    },
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    extendedCast.value = response?.data?.results?.cast
    console.log(extendedCast.value);
  } catch (error) {
    console.log(error);
  }
}


//creators
async function getCreators(){
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,
    params: {
      info: 'creators_directors_writers'
    },
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    creators.value = response?.data?.results
    console.log(creators.value);
  } catch (error) {
    console.log(error);
  }
}

//budget

async function getBudget(){
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,
    params: {
      info: 'revenue_budget'
    },
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    budget.value = response?.data?.results
    console.log(budget.value);
  } catch (error) {
    console.log(error);
  }
}

const cast_arr = computed(() =>{
  const cast_arr = []

  for (let i=0; i <= 10; i++ ){

    const cast = extendedCast.value?.edges[i]?.node?.name?.nameText?.text
    if (cast === null) break
    cast_arr.push(cast)


  }
  let filterCastArr = cast_arr.filter(Boolean)
  console.log(filterCastArr )
  return filterCastArr
})

const budgetMoney = computed(() =>{
  const budgetMoney = budget.value?.productionBudget?.budget?.amount
  de.value = new Intl.NumberFormat(de).format(budgetMoney);
  return de
})


const genres_arr = computed(() =>{
  const genres_arr = []

  for (let i=0; i <= 4; i++ ){

    const genre = detailFilmInfo.value?.genres?.genres[i]?.text
    if (genre === null) break
    genres_arr.push(genre)


  }
  let filterGenresArr = genres_arr.filter(Boolean)
  console.log(filterGenresArr )
  return filterGenresArr
})

onMounted(getDetailCard)
onMounted(getExtendedCast)
onMounted(getCreators)
onMounted(getBudget)

</script>

<template>
<div class="main">
  <NavBar :filmName="filmName"></NavBar>
  <div class="block">
    <div :style="`background-image: url(${detailFilmInfo?.primaryImage?.url})`" class="image"></div>
    <div class="list">
      <div class="title">
        <h1>{{detailFilmInfo?.titleText?.text}}</h1>
      </div>
      <h1>About</h1>

      <div class="list-about">
        <table cellspacing="0" id="maket">
          <tr>
            <td id="left-col">Markdown</td>
            <td id="spacer"></td>
            <td id="right-col">{{detailFilmInfo?.plot?.plotText?.plainText}}</td>
          </tr>
          <tr>
            <td id="left-col">Release year: </td>
            <td id="spacer"></td>
            <td id="right-col">{{detailFilmInfo?.releaseDate?.year}}</td>
          </tr>
          <tr>
            <td id="left-col">Genre</td>
            <td id="spacer"></td>
            <td id="right-col" class="main-genre">
              <div class="genre" v-for="(genre,key) in genres_arr" :key="key">{{ genre }}</div>

            </td>
          </tr>
          <tr>
            <td id="left-col">Director</td>
            <td id="spacer"></td>
            <td id="right-col" class="main-genre">
              <div class="genre">{{ creators?.directors[0]?.credits[0]?.name?.nameText?.text}}</div>
            </td>
          </tr>
          <tr>
            <td id="left-col">Budget</td>
            <td id="spacer"></td>
            <td id="right-col" class="main-genre">
              <div class="genre">{{ budgetMoney }}   {{ budget?.productionBudget?.budget?.currency }}</div>

            </td>
          </tr>
        </table>
        </div>
    </div>
    <div class="main-cast">
      <div class="left-col">Cast:</div>
      <div id="spacer"></div>
      <div id="right-col" class="cast">
        <div class="castItem" v-for="(cast,key) in cast_arr" :key="key">{{ cast }}</div>
      </div>
  </div>
  </div>
</div>




</template>

<style scoped lang="sass">
.main
  margin-top: 65px
  &-cast
    margin-right: 40px
    margin-top: 50px
.block
  display: flex

.list
  display: flex
  flex-direction: column
  padding-left: 50px
  &-about
    display: flex
.image
  width: 300px
  height: 400px
  background-repeat: no-repeat
  background-size: 100%

.title
  margin-top: -20px

.main-genre
  display: flex

.cast
  display: flex
  flex-direction: column
  width: 200px
  &Item
    padding-top: 10px

.genre
  margin-left: 10px
  &:first-child
    margin-left: 0


#maket
    width: 80%

#spacer
    width: 30px
TD
  vertical-align: center
  padding: 5px

TD#left-col
    width: 200px

TD#right-col



</style>