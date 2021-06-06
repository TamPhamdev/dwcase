<template>
  <Wrapper>
    <h3 class="text-center title">ITEM DROPS FROM THESE CASES:</h3>
    <div class="section-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 m-auto gap-4 py-4 md:px-0">
      <slot />
    </div>
  </Wrapper>
</template>

<script>
  export default {
    name: "ItemInCase",
  }
</script>

<style lang="scss" scoped>
  .section {
    padding: 0 5%;
    width: 100%;
    &-container {
      max-width: 1712px;
    }
  }
  .title {
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>
