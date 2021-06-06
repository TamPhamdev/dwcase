<template>
  <div class="pre-header hidden sm:hidden md:flex wrapper justify-between">
    <div class="pre-header__social flex items-baseline">
      <svg-icon name="facebook" />
      <svg-icon name="youtube" />
      <svg-icon
        name="twitter"
        style="width: 20px; height: 23px;"
      />
    </div>
    <div class="flex">

      <div
        class="pre-header__fund flex"
        v-if="isLogin"
      >
        <div
          class="pr-4 pre-header__fund--balance"
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
      <div class="pre-header__language relative">
        <svg-icon
          :name="`flag-${selectedLanguage}`"
          style="width: 1.1rem;height: 1.1rem;margin-right: 5px;position: absolute;left: 35px;bottom: 7px;"
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

    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "PreHeader",
    data () {
      return {
        selectedLanguage: null,
        options: [{ name: "EN", value: "en" }, { name: "VI", value: "vi" }]
      }
    },
    created () {
      this.selectedLanguage = this.lang
    },
    computed: {
      ...mapGetters({ wallet: 'profile/getWallet', isLogin: 'authen/isLoggedIn', lang: 'languages/getLanguage' })
    },
    methods: {
      ...mapActions('languages', ['setLanguage']),
      handleChangeLanguage (command) {
        this.setLanguage(command)
        this.$i18n.locale = command
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .pre-header {
    background-color: $background-color;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: $main-text-color;
    &__fund {
      &--balance {
        display: flex;
        align-items: center;
        color: $secondary-color;
        font-weight: bold;
      }
    }
    &__language {
      position: relative;
      .el-dropdown-link {
        font-size: 1.1rem;
        outline: none;
      }
    }

    &__social > .icon {
      margin-right: 10px;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .el-dropdown-menu__item.dropdown-language {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
</style>

<style lang="scss">
  .pre-header__language--select {
    input.el-input__inner {
      padding-right: 0;
      border: 0;
      width: 80px;
      background: transparent;
    }
  }
</style>
