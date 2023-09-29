<script setup>


import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavBar from "@/components/NavBar.vue";
const route = useRoute();

const detailFilmInfo = ref(null)

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
    console.log(detailFilmInfo.value);
  } catch (error) {
    console.log(error);
  }
}

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
            <td id="left-col">Genre </td>
            <td id="spacer"></td>
            <td id="right-col" class="main-genre"><div class="genre" v-for="(genre,key) in genres_arr" :key="key">{{genre}}</div></td>
          </tr>
        </table>


      </div>

    </div>
  </div>
</div>




</template>

<style scoped lang="sass">
.main
  margin-top: 65px
.block
  display: flex

.list
  display: flex
  flex-direction: column
  padding-left: 50px
.image
  width: 400px
  height: 400px
  background-repeat: no-repeat
  background-size: 100%

.title
  margin-top: -20px

.main-genre
  display: flex

.genre
  margin-left: 10px
  &:first-child
    margin-left: 0


#maket
    width: 60%

#spacer
    width: 30px
TD
  vertical-align: center
  padding: 5px

TD#left-col
    width: 200px

TD#right-col



</style>