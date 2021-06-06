<template>
  <div
    class="item item-column flex justify-between flex-col"
    :style="styeRarity"
  >
    <NuxtLink
      :to="`/items/${item.id}`"
      class="flex justify-center items-center flex-col wrapper-img"
      style="height: 140px"
    >
      <img
        class="item-image"
        style="min-height: 90px"
        :src="`${$store.state.APP_IMAGE}${item.icon}`"
        alt=""
      />
    </NuxtLink>
    <!-- class="flex  relative flex-col" -->

    <div style="background-color: rgb(48 48 48 / 8%); z-index: 1">
      <p
        class="item-name p-2"
        v-if="hasFooter"
        :style="`color: ${item && item.name_color}`"
      >
        {{ item && item.title }}
      </p>
      <div
        v-if="isAction"
        class="w-full text-center"
        style="margin-top: auto; margin-bottom: 5px; padding: 0 0.5rem"
      >
        <el-button
          v-if="item.status == 'Pending'"
          @click.stop="handleClaim"
          size="mini"
          type="primary"
          class="block w-full"
          >{{ $t('button.claim') }}</el-button
        >
        <el-button
          v-if="item.status == 'Pending'"
          @click.stop="handleSell"
          style="margin-left: 0; margin-top: 3px"
          class="block w-full"
          type="warning"
          size="mini"
          >{{ $t('button.sell') }} ${{ item.sellPrice }}</el-button
        >
        <div
          v-if="item.status != 'Pending'"
          size="mini"
          class="block w-full"
          type="info"
        >
          ${{ item.sellPrice }}
        </div>
        <el-button
          v-if="item.status != 'Pending'"
          style="margin-left: 0; margin-top: 3px"
          size="mini"
          :disabled="item.status == 'Accepted' || item.status == 'Sold'"
          class="block w-full"
          type="info"
          >{{ $t(`status.${item.status.toLowerCase()}`) }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: { type: Object },
    hasFooter: { type: Boolean, default: false },
    hasIcon: { type: Boolean },
    hasAction: { type: Boolean, default: false },
  },
  data() {
    return {
      isMouseover: false,
    }
  },
  computed: {
    styeRarity() {
      return {
        'background-image': `radial-gradient(circle, #${this.item.name_color},  #051937)`,
      }
    },
    isAction() {
      return this.hasAction
    },
    item() {
      return this.data
    },
  },
  methods: {
    async handleClaim() {
      try {
        const { data } = await this.$repositories.items.accept({
          id: this.item.id_action,
        })
        this.$toast('success', `Claim success`)
        this.$emit('updateList')
      } catch ({ response }) {
        this.$toast('error', response.data.message)
      }
    },

    async handleSell() {
      try {
        const {
          data: { data },
        } = await this.$repositories.items.sell(this.item.id_action)
        // this.$store.dispatch('profile/setBalance', data?.wallet)
        this.$emit('updateList')
        this.$toast('success', `Items sold for ${this.item.sellPrice}`)
      } catch (error) {
        this.$toast('error', error.response.data.message)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/_mixin.scss';
.item {
  position: relative;
  border-radius: 4px;

  // &-column {
  //   &:before {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     border-radius: 5px;
  //     opacity: 0.5;
  //     background-size: 100% calc(100% + 10px);
  //     transform: rotate(180deg);
  //   }
  // }
  &-image {
    // filter: drop-shadow(0 0 10px #ec9b1e);
    max-width: 65%;
  }
  &-name {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    max-height: 3rem;
    height: 3rem;
    font-size: 0.8em;
    opacity: 0.9;
    color: #ccc;
    @include text;
  }
}
</style>
