<script>
  export default {
    name: 'Animation-Case',
    props: {
      barStyle: Object,
      duration: {
        type: String,
        default: '2s'
      },
      direction: {
        type: String,
        default: 'normal'
      },
      delay: {
        type: String,
        default: '0s'
      },
      paused: {
        type: Boolean,
        default: false
      },
      stop: {
        type: Boolean,
        default: false
      },
      styleAnimation: {
        type: String,
        default: 'linear'
      }
    },
    computed: {
      customStyle () {
        return {
          ...this.barStyle,
          'animation-duration': this.duration,
          'animation-direction': this.direction,
          'animation-delay': this.delay,
          'animation-play-state': (this.paused) ? 'paused' : 'running',
          'animation-iteration-count': this.stop ? 0 : 'infinite',
          'animation-timing-function': this.styleAnimation
        }
      }
    },
    render (createElement) {
      const bar = createElement('div', { class: 'vifnslb-bar' }, this.$slots.default)
      const slider = createElement('div', { class: ['vifnslb-element grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-5'], style: this.customStyle }, [bar, bar])
      return createElement('div', { class: ['vifnslb-container'] }, [slider])
    }
  }
</script>

<style scoped>
  @keyframes moveSlideshow {
    100% {
      transform: translateX(-50%);
    }
  }
  .vifnslb-container {
    width: 100%;
    overflow: hidden;
  }
  .vifnslb-element {
    transform: translate3d(0, 0, 0); /* Hey browser, please use my GPU */
    transition: transform 9.5s cubic-bezier(0.31, 0.9985, 0.31, 0.9985);
    position: relative;
    overflow: hidden;
    /* perspective: 1000px; */
    backface-visibility: hidden;
    animation-name: moveSlideshow;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    display: flex;
    width: max-content;
    min-width: 200%;
  }
  .vifnslb-bar {
    width: 50%;
    display: flex;
  }
</style>
