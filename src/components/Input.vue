<script setup>


import router from "@/router";
import {Search} from "@element-plus/icons-vue";

const props = defineProps({
  getFilm:{
    type:Function,
    required:true
  }
})

</script>

<template>


    <el-input
        class="input"
        @keyup.enter = 'getFilm(); router.push({ path: "/Home" })'
        placeholder="Search film"

    />



</template>

<style lang="sass" scoped>


.input
  padding: 10px 90px 5px 30px
  height: 60px
  font-size: 24px




</style>