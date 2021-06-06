<template>
  <div class="relative">
    <div class="recent-head text-center py-4">
      <p class="uppercase font-bold tracking-widest">{{ $t('title.recent_items') }}</p>
    </div>
    <VueSlickCarousel
      @init="initHandler"
      @reInit="applyResponsiveSettings"
      v-bind="settings"
      class="recent-carousel"
    >
      <RecentItem
        v-for="(item,index) in 10"
        :key="index"
      />
    </VueSlickCarousel>
  </div>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import RecentItem from "./RecentItem";
  // optional style for arrows & dots
  // import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  export default {
    name: "RecentItems",
    components: { VueSlickCarousel, RecentItem },
    data () {
      return {
        areResonsiveSettingsApplied: false,
        settings: {
          autoplay: false,
          arrows: false,
          dots: false,
          autoplaySpeed: 100,
          speed: 1500,
          slidesToShow: 8,
          draggable: false,
          rtl: true,
          responsive: [],
          // responsive: [{ breakpoint: 1280, settings: { slidesToShow: 6 } }, { breakpoint: 1024, settings: { slidesToShow: 4 } }, { breakpoint: 768, settings: { slidesToShow: 3 } }],
        },
        responsiveSettings: [{ breakpoint: 1280, settings: { slidesToShow: 6 } }, { breakpoint: 1024, settings: { slidesToShow: 4 } }, { breakpoint: 768, settings: { slidesToShow: 3 } }],
      }
    },

    methods: {
      initHandler () {
        if (this.areResonsiveSettingsApplied === false) {
          this.applyResponsiveSettings()
        }
      },
      applyResponsiveSettings () {
        // TODO: re-render need test
        this.settings.responsive = this.responsiveSettings
        this.settings.slidesToShow = 8
        this.areResonsiveSettingsApplied = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .recent-head {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #222a3a, #29384f, #222a3a);
    }
  }
  // Remove outline when focus of carousel
  .recent-carousel {
    .slick-track div {
      &:focus {
        outline: none;
      }
    }
  }
</style>
