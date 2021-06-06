<template>
  <header class="header-sticky">
    <div class="header-sticky__container">
      <div class="header-sticky-logo">
        <Logo />
      </div>
      <!-- <Login :isLogin="isLogin" /> -->

      <div class="main-nav flex items-center">
        <div
          class="pre-header__fund flex mr-8"
          v-if="isLogin"
        >
          <div class="info">
            <NuxtLink :to="`/profile/${profile.id}`">
              <img
                :src="profile.avatarUrl"
                alt=""
              >
            </NuxtLink>
          </div>
          <div
            class="pr-4 flex items-center wallet"
            v-if="wallet"
          >{{wallet.balance}} {{wallet.currencyCode}}</div>
          <div>
            <el-button
              size="mini"
              type="primary"
            >
              <nuxt-link to="/topup"> {{ $t('button.addfund') }}</nuxt-link>
            </el-button>
          </div>
        </div>
        <Hamburger
          @click.native.stop="toggle"
          class="block md:hidden"
        />
      </div>

    </div>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Hamburger from "./Hamburger";
  import Logo from "./Logo";
  import Login from "./Login";
  export default {
    name: "StickyMenu",
    components: { Hamburger, Logo, Login },
    computed: {
      ...mapGetters({ profile: 'profile/getterProfile', isLogin: 'authen/isLoggedIn', wallet: 'profile/getWallet', }),

    },
    methods: {
      ...mapActions('setting', ['toggleSidebar']),
      toggle () {
        this.toggleSidebar()
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .header-sticky {
    height: 80px;
    z-index: 20;
    position: fixed;
    width: 100%;
    &__container {
      padding: 0.8rem 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      width: 100%;
      z-index: 1;
      min-height: initial;
      transform: translateY(0px);
      top: 0px;
      transition: all 0.2s linear;
      background-color: $background-color;
    }
    &-logo {
      width: 100%;
      max-width: 100px;
      img {
        transition: transform 1s linear;
      }
    }
    .info {
      margin-right: 1rem;
      max-width: 30px;
      img {
        border-radius: 50%;
      }
    }
    .wallet {
      color: $secondary-color;
      font-weight: bold;
    }
  }
</style>
