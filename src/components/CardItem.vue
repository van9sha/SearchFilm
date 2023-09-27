<script setup>
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
  }
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div :style="`background-image: url(${filmSearch?.primaryImage?.url})`" class="image"></div>
      </div>
    </template>
    <h5>{{ filmSearch?.originalTitleText?.text }}</h5>
  </el-card>
</template>

<style lang="sass" scoped>
.box-card
  width: 200px


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