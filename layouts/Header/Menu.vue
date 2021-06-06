<template>
  <div class="flex">
    <MenuItem
      v-for="item in 3"
      :key="item"
    />
  </div>
</template>

<script>
  import MenuItem from "./MenuItem"
  export default {
    name: "Menu",
    components: {
      MenuItem
    },
    
  }
</script>

<style>
</style>
