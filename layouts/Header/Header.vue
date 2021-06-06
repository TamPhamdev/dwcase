<template>
  <div class="dw-container">
    <StickyMenu :class="stickyMenu" />
    <Sidebar :open.sync="toggleOpen" />
    <header class="header">
      <PreHeader />
      <div class="header__container relative ">
        <div class="pre-header__language hidden relative ">
          <svg-icon
            :name="`flag-${selectedLanguage}`"
            style="width: 1.1rem;height: 1.1rem;margin-right: 5px;position: absolute;left: 35px;top: 32px;"
          />
          <el-select
            v-model="selectedLanguage"
            size="small"
            class="pre-header__language--select"
            placeholder=""
            @change="handleChangeLanguage"
          >

            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
              <div class="flex items-center">
                <svg-icon
                  :name="`flag-${item.value}`"
                  style="width: 1rem; height: 1rem;margin-right: 10px;"
                /> {{item.name}}
              </div>
            </el-option>
          </el-select>
        </div>
        <div class="header-logo ">
          <Logo />
        </div>
        <Login :isLogin="isLogin" />

        <Profile
          class="header-signin"
          :data="profile"
          v-show="isLogin"
        />
        <div class="main-nav pt-6">
          <Hamburger
            @click.native.stop="toggle"
            class="block md:hidden"
          />
        </div>
      </div>
      <div
        class="wrapper-mobile block sm:hidden"
        :style="isLogin ? 'height: 100px': 'height: 60px;'"
      >
        <div
          class="profile-mobile"
          v-if="isLogin"
        >
          <div
            class="profile-mobile__info"
            @click="goProfile"
            :title="profile &&profile.steamNickname"
          >

            <div class="flex  p-2 items-center justify-between">
              <div class="profile-mobile__avatar flex">
                <img
                  :src="profile.avatarUrl"
                  alt=""
                />
                <span class="profile-mobile__name">{{profile.steamNickname}}</span>
              </div>
              <div class="flex items-center">
                <span class="profile-mobile__logout flex items-center ml-2">
                  <a
                    :href="`${$store.state.API_WEB}logout${$store.state.REDIRECT_URL}`"
                    class="relative "
                    style="z-index: 1;"
                  >
                    <svg-icon
                      name="logout"
                      style="width: 1.3rem; height: 1.3rem;"
                    />
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div class="profile-mobile__wallet">
            <div class="flex justify-between w-full">
              <div class="flex items-center">
                <span>$</span>
                <span
                  v-if="profile && profile.wallet"
                  class="pr-1"
                >{{profile.wallet.balance}}</span>
                <span v-if="profile && profile.wallet">{{profile.wallet.currencyCode}}</span>
              </div>
              <nuxt-link to="/topup">
                <el-button
                  size="small"
                  type="primary"
                >Add fund</el-button>
              </nuxt-link>
            </div>
          </div>
        </div>
        <a
          :href="`${$store.state.API_WEB}login${$store.state.REDIRECT_URL}${currentPath}`"
          v-else
        >
          <div class="flex signin-mobile">
            <svg-icon
              name="steam"
              style="width: 2rem; height: 2rem;"
            />
            <h3 class="uppercase">Sign in with STEAM</h3>
          </div>
        </a>
      </div>
    </header>

    <Wrapper>
      <div class="wrapper-main">
        <Recent />
      </div>
    </Wrapper>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import StickyMenu from "./StickyMenu";
  import Hamburger from "./Hamburger";
  import Stat from "./Stat";
  import Recent from "./Recent";
  import Menu from "./Menu";
  import PreHeader from "./PreHeader";
  import Sidebar from "./Sidebar";
  import Logo from "./Logo";
  import Login from "./Login";
  import Profile from "@/components/Profile"
  export default {
    name: "Header",
    data () {
      return {
        isVisibleStickyMenu: false,
        selectedLanguage: null,
        options: [{ name: "EN", value: "en" }, { name: "VI", value: "vi" }]
      }
    },
    components: {
      Hamburger,
      Stat,
      Recent,
      StickyMenu,
      Menu,
      Profile,
      PreHeader,
      Sidebar,
      Logo,
      Login
    },
    created () {
      this.selectedLanguage = this.lang
    },

    // async fetch () {
    //   console.log('v :>> ');
    //   // Check login
    //   let isLogin = await this.$store.getters['authen/isLoggedIn']
    //   if (isLogin) {
    //     await this.$store.dispatch('profile/getProfile')
    //   }
    // },
    computed: {
      ...mapGetters({ profile: 'profile/getterProfile', toggleOpen: 'setting/isOpened', isLogin: 'authen/isLoggedIn', currentPath: 'setting/getCurrentPath', lang: 'languages/getLanguage' }),
      stickyMenu () {
        return this.isVisibleStickyMenu ? 'sticky-menu-active' : 'sticky-menu'
      },
      currentScrollY () {
        return this.$store.getters["page/getVisibleStickyMenu"];
      }
    },

    watch: {
      currentScrollY (val) {
        if (val > 100) {
          this.isVisibleStickyMenu = true;
        } else {
          this.isVisibleStickyMenu = false;
        }
      }
    },
    methods: {
      ...mapActions('setting', ['toggleSidebar']),
      ...mapActions('languages', ['setLanguage']),
      handleChangeLanguage (command) {
        this.setLanguage(command)
        this.$i18n.locale = command
      },
      toggle () {
        this.toggleSidebar()
      },
      goProfile () {
        this.$router.push({ path: `/profile/${this.profile.id}` })
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .dw-container {
    margin: auto;
  }
  .header {
    width: 100%;
    background-color: #2c2828;
    &-logo {
      padding-top: 0.9rem;
    }
    &__container {
      background-image: url('~@/assets/images/bg-header.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      top: 10px;
      position: relative;
      transform: translateY(-10px);
      padding: 0 5%;
      min-height: 200px;
      display: flex;
      justify-content: space-between;
      @include phone {
        min-height: 100px;
      }
    }

    &-signin {
      color: #c5c3c0;
      position: relative;
      @include phone {
        display: none;
      }
    }
  }
  .wrapper-main {
    position: relative;
    border-top: 1px solid rgba(236, 194, 20, 0.5);
    border-radius: 10px;
    overflow: hidden;
    background: rgba(26, 28, 36, 0.8);
  }
  .sticky-menu {
    transform: translateY(-200px);
    transition: transform 0.3s linear;
    &-active {
      transform: translateY(0px);
      transition: transform 0.3s linear;
    }
  }
  .wrapper-mobile {
    width: 100%;
    padding: 0 5%;
    margin-bottom: 10px;
    background: #1c1e26;
  }
  .profile-mobile {
    border-radius: 10px;
    border: 1px solid #67676759;
    height: 100%;
    &__info {
      cursor: pointer;
      position: relative;
      &:hover {
        color: #fff;
      }
      &:before {
        @include pseudo;
        background: #fff;
        opacity: 0.03;
      }
    }
    &__avatar {
      img {
        width: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
    &__name {
      @include text;
    }
    &__logout {
      color: #ccc;
      &:hover {
        color: #fff;
      }
    }
    &__wallet {
      padding: 0 0.5rem;
      height: 50%;
      display: flex;
      align-items: center;
      font-weight: bold;
    }
  }
  .signin-mobile {
    height: 100%;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    background: linear-gradient(180deg, #7eb23a, #4c6d1f);
    text-align: center;
    h3 {
      font-size: 1.7rem;
      margin: auto;
      font-weight: 600;
    }
  }
  .pre-header__language {
    padding-top: 1.5rem;
    @include phone {
      display: block;
    }
  }
</style>
