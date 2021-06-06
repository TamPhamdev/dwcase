<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1>The page you tried to access does not exist! </h1>
      <NuxtLink
        to="/"
        class="not-found__content--link"
      >Back to homepage</NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageNotFound",
    layout: "custom",
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .not-found {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('~@/assets/images/bg-404.jpg');
    background-size: cover;
    &__content {
      margin: auto;
      position: relative;
      text-align: center;
      padding-top: 28vh;
      max-width: 500px;
      h1 {
        font-size: 1.6rem;
        color: #fff;
      }
      &--link {
        font-size: 1.2rem;
        letter-spacing: 2px;
        text-decoration: underline;
        color: rgb(65, 9, 9);
      }
    }
  }
</style>
