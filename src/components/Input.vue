<script setup>


const props = defineProps({
  getFilm:{
    type:Function,
    required:true
  }
})

</script>

<template>
  <el-input

      @keyup.enter = 'getFilm'
      placeholder="Please input"
  />
</template>

<style lang="sass" scoped>

</style>