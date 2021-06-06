<template>
  <nuxt-link to="/topup">
    <div class="menu-item ">
      <div class="menu-item__title">
        <span class="block"></span>
        <div class="menu-item__title-text flex items-center">
          <svg-icon
            :name="menuItem.icon"
            width="150"
            height="150"
            class="menu-item__icon"
          /> <span class="ml-3">{{$t(`sidebar.${menuItem.name.toLowerCase()}`)}}</span>
        </div>

      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    name: "MenuItem",
    props: {
      data: Object,
      required: true
    },
    computed: {
      menuItem () {
        return this.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .menu-item {
    cursor: pointer;
    height: fit-content;
    padding: 1.5rem 1rem;
    transition: all 0.2s;
    margin: 0 1rem;
    display: flex;
    width: 250px;
    align-items: center;
    color: #d6d6d6;
    &:hover > .menu-item__title {
      color: $main-text-color;
    }
    &__icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    &__title {
      text-align: left;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 1.3rem;
      letter-spacing: 0.1rem;
      line-height: 1.2rem;

      white-space: nowrap;
      position: relative;

      width: 100%;
      display: flex;
      height: 100%;
      &-text {
        margin-left: 0.5rem;
        animation: mainFadeIn 1s forwards;
        animation-delay: 0.8s;
        opacity: 0;
      }
      .block {
        width: 0%;
        height: 1.5rem;
        position: absolute;
        background-color: $primary-color;
        animation: mainBlock 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
        display: flex;
      }
    }
  }
  @keyframes mainBlock {
    0% {
      width: 0%;
      left: 0;
    }
    50% {
      width: 90%;
      left: 0;
    }
    100% {
      width: 0%;
      left: 90%;
    }
  }
  @keyframes mainFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
