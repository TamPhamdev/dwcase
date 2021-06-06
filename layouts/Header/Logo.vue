<template>
  <NuxtLink
    to="/"
    class="header-logo__link"
  >
    <h1>DW</h1>
    <h2>Case</h2>
  </NuxtLink>
</template>

<script>
  export default {
    name: "Logo"

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  .header-logo__link {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
    h1 {
      color: $primary-color;
    }
  }
</style>
