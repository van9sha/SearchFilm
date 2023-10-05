<script setup>


import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import {useRootStore} from "@/stores/root";
import {storeToRefs} from "pinia";

const route = useRoute();
const rootStore = useRootStore();
const {filmInfo,filmName} = storeToRefs(rootStore);

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


function getDetailCard() {
  return axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,{
    params: {info: 'base_info'},
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  })
}

//Cast
 function getExtendedCast(){
   return axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,{
     method: 'GET',
     params: {
       info: 'extendedCast'
     },
     headers: {
       'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
       'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
     }
   })
}
//creators
 function getCreators(){
   return axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,{
     params: {
       info: 'creators_directors_writers'
     },
     headers: {
       'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
       'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
     }
   })
}
//budget
async function getBudget(){
  return axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${filmId.value}`,{
    params: {
      info: 'revenue_budget'
    },
    headers: {
      'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  })
}


async function getFullInfo(){
  Promise.all([getExtendedCast(), getCreators(),getDetailCard(),getBudget()])
      .then(function (results) {
        extendedCast.value = results[0]?.data?.results;
        creators.value = results[1]?.data?.results;
        detailFilmInfo.value = results[2]?.data?.results;
        budget.value = results[3]?.data?.results;
      });

}

const cast_arr = computed(() =>{
  const cast_arr = []

  for (let i=0; i <= 10; i++ ){

    const cast = extendedCast.value?.cast?.edges[i]?.node?.name?.nameText?.text
    if (cast === null) break
    cast_arr.push(cast)


  }
  let filterCastArr = cast_arr.filter(Boolean)

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
  return genres_arr.filter(Boolean)
})


onMounted(getFullInfo)


</script>

<template>
<div class="main">
  <NavBar :filmName="filmName"
          :getFilm="rootStore.getFilm"
          :getStartedFilm="rootStore.getStartedFilm"
          :filmInfo="filmInfo"/>
  <div class="block">
    <div :style="`background-image: url(${detailFilmInfo?.primaryImage?.url})`" class="image"></div>
    <div class="list">
      <div class="title">
        <h1>{{detailFilmInfo?.titleText?.text}}</h1>
        <div class="rating-main">
          <div class='rating-main-count'>{{ detailFilmInfo?.ratingsSummary?.aggregateRating }}/10  IMDb</div>
          <div class='rating-main-vote'>{{ detailFilmInfo?.ratingsSummary?.voteCount }}  votes</div>
        </div>
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
@import "../assets/styles/main.sass"

.main
  margin-top: 65px
  &-cast
    margin-top: 50px

.block
  display: flex
  background-color: #282828
  color: #FBEEC1




.list
  display: flex
  flex-direction: column
  padding-left: 50px
  &-about
    display: flex
.image
  width: 50%
  height: 600px
  background-repeat: no-repeat
  background-size: 100%

.title
  margin-top: -20px

.rating-main
  flex-direction: column
  display: flex
  width: 200px
  &-count
    width: 200px
    align-items: center
    font-size: 25px
  &-vote
    width: 200px
    padding-top: 5px
    font-size: 15px


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




</style>