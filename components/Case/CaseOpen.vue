<template>
  <div class="flex w-full case-open__content justify-center mt-2">
    <div class="case-open__item">
      <span
        v-if="!isAnimation"
        v-loading="!isAnimation"
        class="w-2/4 "
        style="height: 200px;"
      ></span>
      <img
        v-show="isAnimation"
        class="case-open__item--image"
        :src="`${$store.state.APP_IMAGE}${caseOpen.item_icon}`"
        alt=""
      >
    </div>
  </div>
</template>

<script>
  import mock from "@/mock.json"
  import box from "@/box.json"
  export default {
    name: "CaseOpen",
    props: { data: { type: Object, required: true }, animation: { type: Boolean, default: true } },
    data () {
      return {
        lists: mock,
        boxBackground: box,

      }
    },
    computed: {
      isAnimation () {
        return this.animation
      },
      caseOpen () {
        return this.data
      },
      random () {
        return Math.floor((Math.random() * 39) + 1)
      },
      generateBackgroundImage () {
        return { 'background-image': `url(${this.boxBackground[this.randomBox].url})` }
      },
      randomBox () {
        return Math.floor((Math.random() * 6) + 1)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .case-open {
    &__item {
      width: 100%;
      max-width: 547px;
      display: flex;
      justify-content: center;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('~@/assets/sprite/svg/hexagon.svg');
      &--image {
        width: 50%;
      }
    }
    &__content {
    }
  }
</style>
<style lang="scss">
  .case-open__item {
    .el-loading-mask {
      background-color: transparent;
      .el-loading-spinner {
        left: 50%;
        right: 50%;
      }
    }
  }
</style>
