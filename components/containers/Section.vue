<template>
  <div class="section">
    <TitleSection :title="data" />
    <div class="section-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 m-auto gap-4 py-4 md:px-0">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Section",
    props: { title: String },
    computed: {
      data () {
        return this.title
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .section {
    padding: 0 5%;
    width: 100%;
    &-container {
      max-width: 1712px;
    }
  }
</style>
