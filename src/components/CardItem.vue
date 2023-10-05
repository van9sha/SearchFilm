<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();


const props = defineProps({
  filmInfo:{
    type:[Object,null],
    required:true
  },
  imgUrl:{
    type:String,
  },
  filmSearch:{
    type:[Object]
  },
  filmName:{
    type:String
  },
  getFilm:{
    type:Function,
    required:true
  },
})

</script>


<template>
  <div class="main">

      <RouterLink  :filmName="filmName" :getFilm="getFilm"   :to="`/${filmSearch?.id}`">
      <el-card  class="box-card">
        <template #header>
          <div class="card-header">
            <div :style="`background-image: url(${filmSearch?.primaryImage?.url})`" class="image"></div>
          </div>
        </template>
        <h5 class="text-overflow">{{ filmSearch?.originalTitleText?.text }}</h5>
      </el-card>
    </RouterLink>

  </div>

<!--  <RouterLink :filmName="filmName" :getFilm="getFilm"   :to="`/${filmSearch?.id}`">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div :style="`background-image: url(${filmSearch?.primaryImage?.url})`" class="image"></div>
      </div>
    </template>
    <h5>{{ filmSearch?.originalTitleText?.text }}</h5>
  </el-card>
  </RouterLink>-->


</template>

<style lang="sass" scoped>
@import "../assets/styles/main.sass"


.box-card
  width: 200px
  margin-top: 10px
  margin-left: 5px


.text-overflow
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.image
  width: 160px
  height: 230px
  background-repeat: no-repeat
  background-size: cover

.card-header
  display: flex
  justify-content: space-between
  align-items: center



.text
  font-size: 14px





</style>