<template>
  <div class="stat wrapper-main__content grid gap-x-4 gap-y-12 grid-cols-2  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5  py-5">
    <div
      class="column-stat md:p-0 flex items-center justify-center"
      v-for="(item,index) in lists"
      :key="index"
    >
      <div class="flex-1">
        <svg-icon
          v-if="item.icon"
          :name="item.icon"
          class="stat__icon"
        />
      </div>
      <div class="flex-1">
        <p class="uppercase font-bold text-lg text-center stat__value">{{item.value}}</p>
        <p class="stat__label uppercase font-bold tracking-widest text-center">{{item.name}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Stat",
    props: {
      data: { type: Object, }
    },
    data () {
      return {
        icons: ['blocked', 'play', 'up-arrow', 'target', 'case', 'contract', 'knife', 'gun', 'gun-long', 'battle']
      }
    },
    computed: {
      lists () {
        const regex = /total/gi;
        let temp = []
        let counter = 0
        for (const prop in this.data) {
          temp.push({ name: prop.replace(regex, ''), value: this.data[prop], icon: this.icons[counter] })
          counter += 1
        }
        return temp
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .stat {
    margin-bottom: 35px;
    padding: 60px 0;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 28%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 74%,
      rgba(255, 255, 255, 0) 0%
    );
    border-image-slice: 1;
    border-top: 2px solid #65a3ff;
    &__icon {
      width: 50px;
      height: 50px;
      margin-left: auto;
      margin-right: 10px;
      color: $secondary-color;
    }
    &__value {
      font-size: 2rem;
      color: $secondary-color;
      text-shadow: 0 0 30px $secondary-color;
    }
    &__label {
      font-size: 12px;
      opacity: 0.7;
      -webkit-text-fill-color: rgba(255, 255, 255, 0.7);
    }
    .column-stat {
      position: relative;
      background-position: left center;
      background: radial-gradient(rgb(110 104 72 / 20%), transparent 50%);
    }
    .column-stat--total {
      &:before {
        background-image: url('~@/assets/images/stat-grey.png');
      }
    }
    .column-stat--knives {
      &:before {
        background-image: url('~@/assets/images/stat-yellow.png');
      }
    }
    .column-stat--covert {
      &:before {
        background-image: url('~@/assets/images/stat-red.png');
      }
    }
    .column-stat--classified {
      &:before {
        background-image: url('~@/assets/images/stat-pink.png');
      }
    }
    .column-stat--restricted {
      &:before {
        background-image: url('~@/assets/images/stat-purple.png');
      }
    }
    .column-stat--milspec {
      &:before {
        background-image: url('~@/assets/images/stat-blue.png');
      }
    }
  }
</style>
