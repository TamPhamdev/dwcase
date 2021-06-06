<template>
  <Wrapper>
    <div class="flex justify-center">
      <h1 class="breadcrumb ">
        <div class="flex items-center justify-center flex-wrap">
          <span class="breadcrumb-primary">
            <nuxt-link
              :to="`profile/${profileData.id}`"
              class="link"
            >{{profileData.steamNickname}}</nuxt-link>
          </span>
          <svg-icon
            name="arrow-right"
            class="mx-4"
          /> <span class="uppercase whitespace-nowrap"> {{$t('title.topup_balance')}}</span>
        </div>
      </h1>
    </div>

    <Box>
      <div class="grid  grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-8">
        <div class="method">
          <img
            class="method__image"
            src="@/assets/sprite/svg/pay-visa.svg"
            alt=""
          >
          <p class="method__name">Credits card</p>
        </div>
        <div class="method">
          <img
            class="method__image"
            src="@/assets/sprite/svg/pay-g2a.svg"
            alt=""
          >
          <p class="method__name">G2A</p>
        </div>
        <div class="method">
          <img
            class="method__image"
            src="@/assets/sprite/svg/pay-giftcard.svg"
            alt=""
          >
          <p class="method__name">Gift card</p>
        </div>
        <div class="method">
          <img
            class="method__image"
            src="@/assets/sprite/svg/pay-promocode.svg"
            alt=""
          >
          <p class="method__name">Promocode</p>
        </div>
        <div class="method">
          <img
            class="method__image"
            src="@/assets/sprite/svg/pay-wechat.svg"
            alt=""
          >
          <p class="method__name">Wechat</p>
        </div>

      </div>
    </Box>
  </Wrapper>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "TopUp",
    middleware: "auth",
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({ profileData: 'profile/getterProfile', }),
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .method {
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    border: 1px solid#2d2f39;
    transition: all 0.3s;
    &:hover {
      border-color: $main-text-color;
      transition: all 0.3s;
    }
    &__image {
      width: 100%;
      max-width: 110px;
      max-height: 45px;
      margin: auto;
      margin-top: 10px;
    }
    &__name {
      padding-top: 10px;
      text-align: center;
      min-height: 40px;
      font-size: 0.8em;
      opacity: 0.9;
      color: $main-text-color;
    }
  }
</style>
