<template>
  <div class="profile flex flex-col w-56 h-20">
    <img
      v-if="!isSidebar"
      class="absolute"
      style="top:-15px; left: 0;z-index: -1;"
      src="@/assets/sprite/svg/Path.svg"
      alt=""
    >
    <div
      class="px-5 pt-4"
      :title="profile &&profile.steamNickname"
    >
      <div
        class="flex pb-2 items-center"
        :class="[isSidebar ? 'flex-row': 'flex-col']"
      >
        <div
          v-if="!isSidebar"
          class="profile__avatar cursor-pointer"
          @click="goProfile"
        >
          <img
            :src="profile.avatarUrl"
            alt=""
          />
        </div>
        <div
          class="flex items-center"
          :class="[isSidebar ? 'pl-3' : null]"
        >
          <span
            v-if="isSidebar"
            class="pr-3"
          >{{$t('profile.welcome')}} </span>
          <span
            class="profile__name cursor-pointer"
            :style="isSidebar ? 'font-weight: 400;  font-size: 1.3rem;  letter-spacing: 0.1rem; line-height: 1.2rem;' : null"
            @click="goProfile"
          >{{profile.steamNickname}}</span>

          <span class="profile__logout flex items-center ml-2">
            <a
              :href="`${$store.state.API_WEB}logout${$store.state.REDIRECT_URL}`"
              class="relative "
              style="z-index: 1;"
            >
              <svg-icon
                name="logout"
                style="width: 1rem; height: 1rem;"
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    props: { data: Object, sidebar: Boolean },
    computed: {
      profile () {
        return this.data
      },
      isSidebar () {
        return this.sidebar
      }
    },
    methods: {
      goProfile () {
        this.$router.push({ path: `/profile/${this.profile.id}` })
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_mixin.scss';
  @import '~@/assets/styles/_variables.scss';
  .profile {
    height: fit-content;
    font-weight: bold;
    font-size: 1.2rem;
    &__avatar > img {
      width: 40px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    &__name {
      @include text;
      white-space: nowrap;
      max-width: 80px;
      font-size: 0.8em;
    }
    &__logout {
      &:hover {
        color: $main-text-color;
      }
    }
  }
</style>
