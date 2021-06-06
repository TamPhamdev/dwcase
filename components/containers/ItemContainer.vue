<template>
  <Box>
    <div class="item-container">
      <div
        class="item-container__header flex justify-between"
        v-if="$slots['header']"
      >
        <div class="item-container__header-content">
          <slot name="header" />
        </div>
      </div>
      <div class="item-container__body grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        <slot />
      </div>
      <div
        class="item-container__footer"
        :style="hasFooterSlot"
      >
        <slot name="footer" />
      </div>
    </div>
  </Box>
</template>

<script>
  export default {
    name: "ItemContainer",
    computed: {

      hasFooterSlot () {
        return !!this.$slots['footer'] ? 'min-height: 50px;' : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .item-container {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      background: rgba(26, 29, 36, 0.8);
      background-size: cover;
    }
    &__header {
      border-bottom: 1px solid #ccc;
      &-content {
        width: 100%;
        text-transform: uppercase;
        z-index: 1;
        padding: 1rem 0rem;
      }
    }
    &__body {
      padding-top: 1rem;
    }
  }
</style>

