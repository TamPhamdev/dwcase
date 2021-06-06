<template>
  <div
    class="case-container"
    ref="case_container"
  >
    <div
      class="case-inner flex"
      :style="customStyle"
      :class="[openCase  ?'rolling'  : null]"
    >
      <RandomItem
        v-for="(item,index) in listItems"
        v-if="item"
        :image="item"
        :key="index"
      />
    </div>
    <div class="case-maker"></div>
  </div>
</template>

<script>
  import { timeStamp } from "@/settings"
  import cases from "@/mock.json"
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  export default {
    name: "CaseOpenAnimation",
    components: { VueSlickCarousel },
    props: {
      itemWon: {
        type: Object,
      },
      isOpenCase: {
        type: Boolean,
        required: true
      },
      data: { type: Array },
      offsetWidth: { type: Number },
    },
    watch: {
      'itemWon.idx': {
        handler (newVal) {
          if (newVal && this.isOpenCase === true) {
            this.winCaseIndex = newVal
            this.markerOffset = this.width / 2 - 5
          }
        },
        immediate: true
      },
      isOpenCase: {
        handler (newVal) {
          if (newVal == false) {
            this.resetState()
          }
        },
      }
    },
    computed: {
      width () {
        return this.offsetWidth
      },
      listItems () {
        return this.data
      },
      openCase () {
        return this.isOpenCase
      },
      customStyle () {
        return {
          'transform': `translateX(${this.finalSpinnerPosition * 0.9}px) translateZ(0) scale(0.9, 0.835)`,
          'transition': `transform ${timeStamp}s cubic-bezier(0.31, 0.9985, 0.31, 0.9985)`,
        }
      },
      finalSpinnerPosition: {
        get: function () {
          let offset = Math.random() + 0.01;
          return ((-this.caseWidthBoxSizing * this.winCaseIndex + this.markerOffset) - (offset * this.caseWidth))
        },
        set: function () {
        }
      }

    },
    data () {
      return {
        cases: cases,
        caseWidthBoxSizing: 191,
        caseWidth: 180,
        markerOffset: 0,
        // finalSpinnerPosition: 0,
        winCaseIndex: 0
      }
    },
    methods: {
      resetState () {
        this.finalSpinnerPosition = 0
        this.winCaseIndex = null
      },

    },
  }


</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  $dark-color: #20222b;
  .rolling {
    will-change: transform;
    backface-visibility: hidden;
    // transition: transform 9.5s cubic-bezier(0.31, 0.9985, 0.31, 0.9985);
  }
  .case-inner {
  }
  .case-container {
    position: relative;
    margin-bottom: 10px;
    &:before {
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from($dark-color),
        color-stop(5%, $dark-color),
        color-stop(45%, rgba(201, 201, 201, 0)),
        color-stop(55%, rgba(214, 214, 214, 0)),
        color-stop(95%, $dark-color),
        to($dark-color)
      );
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      pointer-events: none;
      position: absolute;
      content: '';
    }
  }
  .case-maker {
    &:before,
    &:after {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      z-index: 4;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      border-style: solid;
    }
    &:before {
      top: -1px;
      border-width: 7px 8px 0 8px;
      border-color: $primary-color transparent transparent transparent;
    }
    &:after {
      bottom: -1px;
      border-width: 0 8px 7px 8px;
      border-color: transparent transparent $primary-color transparent;
    }
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(233, 77, 139, 0.08)),
      color-stop(51%, $primary-color),
      to(rgba(233, 77, 139, 0.08))
    );
    position: absolute;
    left: calc(50% - 5px);
    width: 2px;
    height: 100%;
    top: 0;
    user-select: none;
  }
</style>
