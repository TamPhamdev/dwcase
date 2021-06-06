<template>
  <div class="not-found">

    <h1>403</h1>
    <h2>Not this time, access forbidden!</h2>
    <NuxtLink
      to="/"
      class="not-found__content--link"
    >
      <h3>Back to homepage</h3>
    </NuxtLink>
  </div>
</template>

<script>
  export default {
    layout: "custom",
    name: "Test403",
  }
</script>

<style lang="scss" scoped>
  .not-found {
    position: relative;
    &__content--link {
      text-align: center;
    }
  }
  .whistle {
    width: 20%;
    fill: #f95959;
    margin: 100px 40%;
    text-align: left;
    transform: translate(-50%, -50%);
    transform: rotate(0);
    transform-origin: 80% 30%;
    animation: wiggle 0.2s infinite;
  }

  @keyframes wiggle {
    0% {
      transform: rotate(3deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(3deg);
    }
  }
  h1 {
    margin-top: 100px;
    margin-bottom: 20px;
    color: #facf5a;
    text-align: center;
    font-size: 90px;
    font-weight: 800;
  }
  h2 {
    color: #455d7a;
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
  }
  h3 {
    color: #455d7a;
    text-decoration: underline;
  }
</style>
