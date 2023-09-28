<script setup>


import router from "@/router";

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
      @keyup.enter = 'getFilm;router.push({ path: "/Home" })'
      placeholder="Please input"

  />
</template>

<style lang="sass" scoped>

.input
  padding: 10px 90px 5px 30px
  display: flex
  height: 50px
  font-size: 24px


</style>