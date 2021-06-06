<template>
  <NuxtLink :to="`/${detail.id}`">
    <div
      class="case text-center flex flex-col items-center"
      :title="detail.title"
    >
      <div
        class="case__main-thumb"
        :style="[generateBackgroundImage, userStyle]"
      >
        <img
          ref="image_thumb"
          class="case__main-thumb--image"
          :src="detail.front_image"
          alt=""
        />
      </div>
      <p class="case__name overflow-hidden font-bold">{{ detail.title }}</p>
      <div class="case__price flex items-center justify-center">
        <el-button
          plain
          class="case__price--btn uppercase font-bold whitespace-nowrap"
          type="warning"
        >
          <span class="uppercase pr-1.5">{{ $t('button.open') }}</span>
          {{ detail.price }} usd</el-button
        >
      </div>
      <div class="case__info-sold"></div>
    </div>
  </NuxtLink>
</template>

<script>
import box from '@/box.json'
import mock from '@/mock.json'
export default {
  name: 'Case',
  props: {
    data: { type: Object },
    hasBoxBackground: { type: Boolean, default: true },
    default: false,
  },
  data() {
    return {
      text: 'Price',
      lists: mock,
      boxBackground: box,
      color: [
        'greenyellow',
        'crimson',
        'white',
        'coral',
        'lightskyblue',
        'blueviolet',
        'pink',
        'gold',
      ],
    }
  },
  watch: {},
  computed: {
    detail() {
      return this.data ? this.data : this.lists[Math.floor(Math.random() * 10)]
    },
    userStyle() {
      return {
        '--color-image': this.color[Math.floor(Math.random() * 7 + 1)],
      }
    },
    generateBackgroundImage() {
      return (
        this.hasBoxBackground && {
          background: `url(${this.detail.image})`,
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center center',
        }
      )
    },
    random() {
      return Math.floor(Math.random() * 39 + 1)
    },
    randomBox() {
      return Math.floor(Math.random() * 6 + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes mymove {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(10px);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
}
@import '~@/assets/styles/_variables.scss';
.case {
  margin-top: 20px;
  position: relative;
  padding: 0 15px;
  cursor: pointer;
  &:hover:before {
    opacity: 1;
    transition: opacity 0.2s;
  }
  &:hover > .case__info-sold {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 0.3s, transform 0.2s;
  }
  // crimson
  &:hover > .case__main-thumb {
    img {
      filter: drop-shadow(0 0 0.5rem var(--color-image));
      animation-play-state: running;
    }
  }
  &:hover > .case__price {
    // background-color: $primary-color;
    // color: $text-black;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    transition: opacity 0.2s;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &__main-thumb {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &__name {
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    max-width: 150px;
  }
  &__price {
    padding: 0 14px;
    height: 34px;
    margin-top: 12px;
    // border: 2px solid $primary-color;
    width: fit-content;
    &--btn {
      position: relative;
      z-index: 1;
      border-radius: 40px;
    }
    span:nth-child(2) {
      padding-left: 0.5rem;
      white-space: nowrap;
    }
  }
  &__info-sold {
    margin-top: 12px;
    margin-bottom: 12px;
    transform: translateY(5px);
    transition: all 0.2s;
    font-size: 0.8em;
    opacity: 0;
  }
  &__main-thumb--image {
    max-width: 241px;
    width: 100%;
    animation: mymove 1.3s linear infinite both;
    animation-play-state: paused;
  }
}
</style>
