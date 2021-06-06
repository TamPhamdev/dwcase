<template>
  <div class="w-full item-won">
    <Wrapper class="item-won__wrapper">
      <div class="w-full flex-col  item-won__container">
        <h2 class="uppercase text-3xl font-extrabold text-center mb-6">{{$t('title.your_win')}}</h2>
        <!-- Card -->
        <div
          style="min-height: 300px;margin-bottom: 30px;"
          class="flex justify-center flex-wrap"
        >
          <transition-group
            name="fadeScale"
            tag="div"
            mode="out-in"
            style="transition: all 0.3s;"
            class="flex flex-wrap justify-center"
          >
            <CardWon
              class=" mx-2 my-4"
              v-for="(item,index) in listItems"
              @handleSellItem="handleSellItem"
              :key="item.id+index+1+item.name"
              :data="item"
            />
          </transition-group>
        </div>
        <div class="item-won__selectable text-center">
          <el-button
            type="primary"
            v-if="maxLength > 1"
            class="item-won__selectable--btn"
            @click.stop="handleSellAllItems"
          >{{$t('button.sell_all')}} ${{totalPrice}} </el-button>
          <el-button
            type="warning"
            class="item-won__selectable--btn"
            @click.stop="openAgain"
          >{{$t('button.tryagain')}} </el-button>
        </div>
      </div>
    </Wrapper>
  </div>
</template>
<script>
  export default {
    name: "ItemWon",
    props: { results: { type: Array, required: true } },
    watch: {
      maxLength: {
        handler (newVal) {
          if (newVal == 0) {
            setTimeout(() => {
              this.openAgain()
            }, 300)
          }
        }
      }
    },
    methods: {
      async handleSellItem ({ id, price }) {
        try {
          const { data: { data } } = await this.$repositories.items.sell(id)
          this.listItems.splice(this.listItems.findIndex(item => item.id == id), 1)
          this.$store.dispatch('profile/setBalance', data?.wallet)
          this.$toast('success', `Items sold for ${price}`)
        } catch ({ response }) {
          this.$toast('error', response.data.message)
        }
      },



      openAgain () {
        this.$emit('tryagain', false)
      },

      async handleSellAllItems () {
        try {
          const { data: { data } } = await this.$repositories.items.sellMultiple({ ids: this.ids })
          this.$toast('success', `Items sold for ${this.totalPrice}`)
          this.$store.dispatch('profile/setBalance', data?.wallet)
        } catch ({ response }) {
          this.$toast('error', response.data.message)
        }
      }
    },
    computed: {
      ids () {
        return this.listItems.map(e => e.id)
      },
      maxLength () {
        return this.listItems.length
      },
      listItems () {
        return this.results
      },
      totalPrice () {
        return this.listItems.reduce((a, b) => { return a + b.sellPrice }, 0).toFixed(2)
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';

  .item-won {
    &__wrapper {
      @include phone {
        padding: 0;
      }
    }
    &__selectable {
      &--btn {
        min-width: 200px;
        @include phone {
          width: 80%;
          margin: 0 0 1em 0;
        }
        &-white {
          color: $main-text-color !important;
        }
      }
    }
  }
  .fadeScale-leave-active {
    transform: translateY(-40px);
    transition: all 0.2s;
  }
  .fadeScale-leave-to {
    opacity: 0;
  }
</style>
