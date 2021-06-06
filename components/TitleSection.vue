<template>
  <div class="flex items-center justify-center">
    <span class="hidden sm:flex stroke stroke-left" />
    <div class="relative flex">
      <img
        src="@/assets/sprite/svg/right.svg"
        class="img-arrow"
      >
      <h2 class="title mx-4">{{data}}</h2>
      <img
        src="@/assets/sprite/svg/right.svg"
        class="img-arrow"
      >
    </div>
    <span class="hidden sm:flex stroke stroke-right" />
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: {
      title: String,
      size: {
        type: [String, Number],
        default: '2em'
      }
    },
    computed: {
      data () {
        return this.title
      },
      styles () {
        return {
          'font-size': this.size
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .title {
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-left: -30px;
    margin-right: -30px;
    font-size: 1.6em !important;
    @include phone {
      font-size: 1.3em !important;
    }
  }
  .img-arrow {
    width: 100px;
    &:last-child {
      transform: scale(-1);
    }
  }
  .stroke {
    height: 1px;
    flex-grow: 1;
    &-left {
      margin-right: 55px;
      background: linear-gradient(
        to right,
        transparent 0%,
        $primary-color 100%,
        $primary-color 90%,
        transparent 98%,
        transparent 100%
      );
    }
    &-right {
      margin-left: 55px;
      background: linear-gradient(
        to left,
        transparent 0%,
        $primary-color 100%,
        $primary-color 90%,
        transparent 98%,
        transparent 100%
      );
    }
  }
</style>
