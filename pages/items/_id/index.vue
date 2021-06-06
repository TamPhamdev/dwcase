<template>
  <Wrapper>
    <div class="flex justify-center">

      <h1 class="breadcrumb ">
        <div class="flex items-center justify-center flex-wrap">
          <span class="breadcrumb-primary">
            <nuxt-link
              to="/items"
              class="link"
            >{{$t('history.item')}}</nuxt-link>
          </span>

        </div>
      </h1>
    </div>
    <TitleSection
      :title="detail.itemName"
      size="1em"
    />
    <div
      class="items-container grid grid-cols-1  md:grid-cols-3 gap-4 p-8"
      style="border-radius: 5px; margin-top: 40px;"
    >
      <div
        class="col-span-1 flex justify-center"
        :style="rarity"
        style="background: transparent radial-gradient(closest-side at 50% 50%, #101846 0%, #00041B 100%) 0% 0% no-repeat padding-box;border-radius:5px;height: fit-content; "
      >
        <img
          style="width: 78%;"
          v-if="img_url"
          :src="`${$store.state.APP_IMAGE}${img_url}`"
          alt=""
        >
      </div>
      <div class="col-span-2 flex flex-col lg:flex-row">
        <div class="flex-1 header">
          <h1 class="header__name">{{detail.itemName}}</h1>
          <transition
            name="fadeUp"
            mode="out-in"
          >
            <h4
              class="header__exterior"
              :key="exteriors_name"
            >{{exteriors_name}}</h4>
          </transition>
        </div>
        <div class="flex-1 flex-col items-table">
          <div class="flex">
            <span class="items-table__text">Exterior</span>
            <span class="regular items-table__text items-table__text-right">Regular</span>
            <span class="stattrak items-table__text items-table__text-right">
              StatTrak™</span>
          </div>
          <div
            class="flex row "
            style="padding: 5px;"
            :class="[item.type  === exteriors_name? 'table_stat': null]"
            v-for="(item,index) in exteriors"
            :key="index"
            @click="handleImageByExterior(item)"
          >
            <span class="items-table__text">{{item.type}}</span>
            <span class="regular items-table__text items-table__text-right"><span
                class="currency"
                v-if="item.price"
              >$</span> {{item.price}}</span>
            <span
              class="stattrak items-table__text items-table__text-right"
              :style="item.stattrak_price ? null :  'padding-right: 28px' "
            ><span
                class="currency stattrak"
                v-if="item.stattrak_price"
              >$</span> {{item.stattrak_price ? item.stattrak_price : '-'}} </span>
          </div>
        </div>
      </div>
    </div>
    <ItemsInCase class="mt-8">
      <Case
        v-for="item in itemsInCase"
        :data="item"
        :key="item.id"
      />
    </ItemsInCase>
  </Wrapper>
</template>

<script>

  export default {
    name: "ItemDetail",
    async asyncData ({ params, $repositories }) {
      let detail
      let itemsInCase
      let id = params.id
      try {
        const { data } = await $repositories.items.getDetail(id)
        const cases = await $repositories.items.itemInCase(id)
        detail = data.data
        itemsInCase = cases.data.data
      } catch (error) {
      }
      return { detail, similarItems: detail?.similarItems, itemsInCase }
    },
    data () {
      return {
        lists: [],
        exteriors: [],
        img_url: "",
        exteriors_name: "",
        rarity_color: ""
      }
    },

    computed: {
      rarity () {
        return {
          'background-image': `radial-gradient(circle, #${this.rarity_color},  #051937)`
          // 'border-left': `2px solid #${this.rarity_color}`
        }
      },
      getItems () {
        if (this.regularList.length > 0) {
          if (this.statTrakList.length > 0) {

            let list = []
            this.regularList.map((item, index) => {
              this.statTrakList.forEach(stat => {
                if (item.type === stat.type) {
                  list.push({ ...item, stattrak_price: stat.stattrak_price, st_icon: stat.st_icon, })
                }
              })
            })
            return list
          } else {
            return this.regularList
          }
        }
      },
      regularList () {
        const regex = /\((.*?)\)/;
        return this.similarItems.map(item => {
          if (!item.name.includes('StatTrak')) {
            return {
              type: regex.exec(item.name)?.[1],
              price: item.sell_price,
              icon: item.icon_url,
              color: item.name_color
            }
          }
        }).filter(e => e)
      },
      statTrakList () {
        const regex = /\((.*?)\)/;
        return this.similarItems.map(item => {
          if (item.name.includes('StatTrak')) {
            return {
              type: regex.exec(item.name)?.[1],
              stattrak_price: item.sell_price,
              st_icon: item.icon_url
            }
          }
        }).filter(e => e)
      },
      // typeExteriors () {
      //   // const regex = /(?<=\()(.*?)(?=\))/;
      //   const regex = /\((.*?)\)/;
      //   return [...new Set(this.similarItems.map(item => regex.exec(item.name)?.[1]))]
      // },
    },
    async created () {
      this.exteriors = this.getItems
      this.img_url = this.exteriors[0]?.icon
      this.exteriors_name = this.exteriors[0]?.type
      this.rarity_color = this.exteriors[0]?.color
    },

    methods: {
      handleImageByExterior (item) {
        if (!item) return
        this.img_url = item.icon
        this.exteriors_name = item.type
        this.rarity_color = item.color
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .header {
    @include phone {
      text-align: center;
    }
    &__name {
      padding-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
    &__exterior {
      font-size: 1rem;
      font-weight: 600;
      color: #9a9a9a;
    }
  }
  .items-table {
    padding-left: 1rem;
    @include tablet {
      padding-top: 28px;
    }
    @include large {
      padding-left: 0;
    }
    &__text {
      width: 33.333%;
      &-right {
        text-align: right;
      }
    }
  }
  .items-container {
    background: #0b0e1f;
  }
  .regular {
    color: $secondary-color;
  }
  .stattrak {
    color: #f28e20;
  }
  .row {
    opacity: 0.9;
    &:hover {
      background: #cccccc18;
      border-radius: 5px;
      transition: opacity 0.3s;
      opacity: 1;
    }
    font-size: 0.9rem;
    cursor: pointer;
  }
  .table_stat {
    background: #cccccc1c;

    border-radius: 5px;

    // margin: 0 -10px;
    transform: translateY(0px);
    transition: transform 1s ease-in-out;
  }
  .fadeUp-enter-active {
    transition: all 0.3s ease;
  }
  .fadeUp-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .fadeUp-enter,
  .fadeUp-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
