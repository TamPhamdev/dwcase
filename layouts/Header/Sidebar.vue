<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      class="sidebar"
      v-if="show"
    >
      <div
        class="sidebar__container"
        v-click-outside="toggle"
      >
        <div class="sidebar__head-close text-right">
          <i
            class="el-icon-close cursor-pointer text-2xl "
            :class="{closeAnimation:animation}"
            @click.stop="toggle"
          ></i>
        </div>
        <div class="sidebar__body">
          <div
            class="sidebar__body-item"
            @click="handleClick"
            v-for="(item,index) in menuList"
            :key="index"
          >
            <MenuItem :data="item" />
          </div>
        </div>
        <div class="sidebar__footer">
          <Profile
            class="w-full self-end"
            v-if="isLogin"
            :data="profile"
            sidebar
          />

          <el-button
            v-else
            type="primary"
            @click="handleLogin(`${$store.state.API_WEB}login${$store.state.REDIRECT_URL}${currentPath}`)"
            class="w-full self-end"
          >
            {{$t('button.signin')}}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  export default {
    name: "Sidebar",
    components: {
      MenuItem: () => import('./MenuItem'),
    },
    data () {
      return {
        animation: false,
        menuList: [
          { name: "Lobby", icon: "menu-lobby" },
          { name: "Topup", icon: "menu-coin" },
          { name: "Claim", icon: "menu-claim" },
          { name: "Contact", icon: "menu-contact" },
          { name: "about", icon: "menu-about" },
        ]
      }
    },
    methods: {
      ...mapActions('setting', ['toggleSidebar']),
      handleLogin (path) {
        window.location.replace(path)
      },
      handleClick () {
        if (this.open) {
          this.toggleSidebar()
        }
      },
      toggle () {
        this.animation = true
        setTimeout(() => {
          this.toggleSidebar()
          this.animation = false
        }, 200)
      }
    },
    props: {
      open: Boolean,
    },
    computed: {
      ...mapGetters({ isLogin: 'authen/isLoggedIn', profile: 'profile/getterProfile', currentPath: 'setting/getCurrentPath' }),
      show () {
        return this.open
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 100%;
    overflow-y: auto;
    max-width: 300px;
    position: fixed;
    z-index: 36;
    top: 0;
    right: 0;
    background: #010935;
    border-left: 1px solid #292929;
    height: 100vh;
    &__footer {
      padding: 0 1rem;
      width: 100%;
      height: 100%;
      display: flex;
    }
    &__container {
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
    &__body {
      padding-top: 10%;
    }
    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      top: 0;
      right: 300px;
      background: rgba(0, 0, 0, 0.5);
      transition: opacity 1s ease;
    }
  }
  .closeAnimation {
    transform: rotate(90deg);
    transition: transform 0.2s linear;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(280px);
  }
</style>
