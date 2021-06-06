<template>
  <div class="random-item">
    <Item
      :data="item"
      v-if="item"
    >
    </Item>
  </div>
</template>

<script>
  export default {
    name: "RandomItem",
    props: {
      image: Object
    },
    data () {
      return {
      }
    },
    computed: {
      item () {
        return this.image
      }
    },
  }
</script>

<style lang="scss" scoped>
  .random-item {
    min-width: 180px;
    margin: 5.5px;
    will-change: transform;
    backface-visibility: hidden;
  }
</style>
