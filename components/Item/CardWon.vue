<template>
  <kinesis-container>
    <div class="card-won">
      <div class="card-won__box text-center">
        <h3 class="card-won__price">${{detail.sellPrice}}</h3>
        <div class="card-won__img-wrap">
          <kinesis-element
            :strength="20"
            type="depth"
          >
            <img
              :src="`${$store.state.APP_IMAGE}${detail.icon}`"
              alt=""
              class="card-won--img"
            >
          </kinesis-element>
        </div>
        <div class="card-won__name">
          <p> {{detail.name}}</p>
        </div>
        <div class="card-won__actions">
          <el-button
            type="primary"
            class="card-won__actions--btn"
            @click.stop="handleSellItem"
          >{{$t('button.sell')}} ${{detail.sellPrice}}</el-button>
          <!-- <el-button
            class="card-won__actions--btn"
            @click.stop="handleClaim"
          >Claim</el-button> -->
        </div>
      </div>
    </div>
  </kinesis-container>
</template>
// TODO: animation sell truot len
// TODO animation xuat hien reward
<script>
  export default {
    name: "CardWon",
    props: { data: { type: Object, required: true } },
    data () {
      return {
      }
    },
    methods: {
      handleSellItem () {
        this.$emit('handleSellItem', { id: this.detail.id, price: this.detail.sellPrice })
      }
    },
    computed: {
      detail () {
        return this.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .card-won {
    position: relative;
    border-radius: 10px;
    height: 300px;
    width: 180px;
    max-width: 100%;

    background-image: linear-gradient(to bottom, #0f0e2b, #26254b),
      linear-gradient(
        to top,
        $secondary-color,
        rgba(57, 85, 232, 0.4),
        rgba(184, 41, 184, 0),
        rgba(255, 255, 255, 0)
      );
    &:hover img.card-won--img {
      transform: translate3d(0em, -1em, 5em);
      // , scale3d(1.3, 1.3, 1.3)
      filter: drop-shadow(0 0px 0.3rem pink);
      transition: all 0.3s;
    }
    &:before {
      content: ' ';
      width: 50px;
      border-radius: 3px;
      display: block;
      top: 0;
      height: 3px;
      position: absolute;
      z-index: 2;
      transform: translateX(125%);
      background-color: lightyellow;
    }
    &:after {
      content: '';
      right: 0;
      left: 0;
      top: 0;
      position: absolute;
      background-image: linear-gradient(
        to bottom,
        rgba(209, 39, 62, 0),
        $primary-color
      );
    }
    &__name {
      color: #9b9da5;
      opacity: 0.6;
      font-size: 0.8em;
      @include text;
    }
    &--img {
      width: 100%;
      transition: all 0.3s;
    }
    &__actions {
      padding: 0.5rem;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      right: 0;
      &--btn {
        width: 100%;
        margin: 0.25em 0.5em 0.25em 0;
      }
    }
    &__box {
      height: 100%;
      padding: 0.5rem;
    }
  }
</style>
