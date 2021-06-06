<template>
  <div class="relative">
    <Header />
    <main class="main">
      <Nuxt :nuxt-child-key="$route.fullPath" />
    </main>
    <Footer />
    <span class="version">build:{{version}}-{{commitSha}}</span>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import Header from "./Header/Header"
  import Footer from "./Footer/Footer"
  import throttle from "lodash.throttle"
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        commitSha: process.env.NUXT_ENV_CURRENT_GIT_SHA
      }
    },
    components: {
      Header,
      Footer
    },
    head () {
      return {
        bodyAttrs: {
          class: this.isSidebarOpen ? 'overflow-y-hidden' : null
        }
      }
    },
    computed: {
      version () {
        return this.$store.state.APP_VERSION
      },
      ...mapGetters({ isSidebarOpen: 'setting/isOpened' })
    },

    methods: {
      ...mapActions('page', ['setVisibleStickyMenu']),
      handleScroll () {
        this.setVisibleStickyMenu(window.scrollY)
      }
    },
    created () {
      if (process.client) {
        window.addEventListener('scroll', throttle(this.handleScroll, 200))
      }
    },
    beforeDestroy () {
      if (process.client) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .version {
    font-size: 0.6em;
    color: #4c4c4c;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .main {
    padding: 40px 0;
  }
</style>
