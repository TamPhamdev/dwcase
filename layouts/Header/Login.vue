<template>
  <div
    class="cursor-pointer header-signin w-56 h-20 text-center"
    v-show="!hasLogin"
  >
    <img
      class="absolute"
      style="top:-15px; left: 0;z-index: -1;"
      src="@/assets/sprite/svg/Path.svg"
      alt=""
    >
    <a
      :href="`${$store.state.API_WEB}login${$store.state.REDIRECT_URL}${currentPath}`"
      style="padding-top: 10%;"
      class="flex items-center justify-center flex-col"
    >
      <svg-icon name="steam" />
      <p class="uppercase"> {{$t('button.signin').replace('STEAM', '')}}</p>
      <p class="tracking-widest uppercase font-semibold ">steam</p>
    </a>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "Login",
    props: {
      isLogin: Boolean
    },

    watch: {
      '$route.path': {
        handler (newVal) {
          this.$store.dispatch('setting/setCurrentPath', newVal)
        },
        immediate: true
      }
    },
    computed: {
      ...mapGetters({ currentPath: 'setting/getCurrentPath' }),
      hasLogin () {
        return this.isLogin
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_mixin.scss';
  .header-signin {
    color: #c5c3c0;
    position: relative;
    @include phone {
      display: none;
    }
  }
</style>
