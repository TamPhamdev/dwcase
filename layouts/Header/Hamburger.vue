<template>
  <div class="cursor-pointer">
    <div class="stick"></div>
    <div class="stick"></div>
    <div class="stick"></div>
  </div>
</template>

<script>
  export default {
    name: "Hamburger"
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .stick {
    height: 3px;
    width: 25px;
    margin: 0.2em;
    background-color: $primary-color;
    border-radius: 4px;
  }
</style>
