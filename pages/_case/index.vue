<template>
  <div class="wrapper case-open" ref="scroll_to">
    <div class="text-center">
      <h1 class="breadcrumb">
        <div class="flex items-center justify-center flex-wrap text-center">
          <span class="breadcrumb-primary">
            <nuxt-link to="/" class="link">{{ $t('title.home') }}</nuxt-link>
          </span>
          <svg-icon name="arrow-right" class="mx-4" />
          <span class="uppercase whitespace-nowrap"> test</span>
        </div>
      </h1>
    </div>
    <div class="case-open__container flex flex-col py-8">
      <ItemsWon
        v-if="openResult"
        @tryagain="tryagain"
        :results="listItemsWon"
      />
      <div
        class="case-open__inner flex flex-1 justify-center flex-col items-center"
      >
        <div
          class="case-open__actions flex justify-between flex-1 pb-4 w-full flex-wrap"
          v-show="!isOpenCase && !openResult"
        >
          <div class="case-open__actions--expanded">
            <span>{{ $t('button.case') }}</span>
            <el-button
              size="mini"
              :class="[listOpens === item ? 'button-action' : null]"
              type="primary"
              style="margin-bottom: 10px"
              @click.stop="changeQuantityCases(item)"
              v-for="(item, index) in 5"
              :key="index"
              >{{ item }}</el-button
            >
          </div>
          <div class="case-open__actions--system flex">
            <div class="flex flex-col pr-4">
              <el-switch
                v-model="type"
                active-color="#000"
                inactive-color="#000"
              ></el-switch>
              <p class="opacity-50 text-xs" v-show="type">
                {{ $t('button.fast') }}
              </p>
              <p class="opacity-50 text-xs" v-show="type === false">
                {{ $t('button.normal') }}
              </p>
            </div>
            <div class="relative">
              <svg-icon
                @click="toggleSound"
                name="sound"
                class="button__sound"
                style="width: 1.2rem; height: 1.2rem; cursor: pointer"
              />
              <p class="button__sound--toggle" v-show="!isEnabledSound"></p>
            </div>
          </div>
        </div>

        <div class="w-full offsetWidth" ref="offsetWidth">
          <transition-group
            name="fadeDown"
            mode="out-in"
            tag="div"
            class="w-full"
          >
            <div
              class="w-full"
              v-for="(item, index) in caseQuantity"
              :key="index + 1"
            >
              <!-- <transition
              name="fadeScale"
              mode="out-in"
              :key="index"
            > -->
              <CaseOpen
                :animation="isAnimation"
                v-show="!isOpenCase && !openResult"
                :data="detail"
              />
              <!-- </transition> -->
            </div>
          </transition-group>
          <transition name="fadeScale">
            <div class="relative section-opencase" v-show="isOpenCase">
              <CaseOpenAnimation
                v-for="(item, index) in listOpens"
                :key="index + 1"
                :offsetWidth="offsetWidth"
                :data="listItems"
                :itemWon="listItemsWon[index]"
                :isOpenCase="isOpenCase"
              />
            </div>
          </transition>
        </div>
      </div>
      <div class="text-center">
        <h3 class="font-bold text-2xl mb-4 total_price" v-if="!openResult">
          ${{ totalPrice }}
        </h3>
        <el-button
          v-if="!openResult && isLogin"
          class="uppercase text-center"
          type="primary"
          :disabled="loadingBtn"
          @click.stop="handleOpencase"
        >
          {{ loadingBtn ? $t('button.opening') : $t('button.open') }}
        </el-button>

        <a
          v-if="!isLogin"
          :href="`${$store.state.API_WEB}login${$store.state.REDIRECT_URL}${currentPath}`"
          class="uppercase text-center el-button el-button--primary login-steam"
        >
          {{ $t('button.signin') }}
        </a>
      </div>
    </div>

    <ItemContainer>
      <template #header>
        <h1>{{ $t('title.items_in') }} {{ detail.name }}</h1>
      </template>
      <Item
        v-for="item in detail.items"
        :key="item.id"
        hasFooter
        :data="item"
      />
    </ItemContainer>
  </div>
</template>
<script>
import { timeStamp } from '@/settings'
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import mockData from '@/data.json'
export default {
  name: 'CaseDetail',
  async asyncData({ params, $repositories }) {
    let detail = {}
    const id = params.case
    try {
      const { data } = await fetch(
        `https://api.farmskins.com/case/drop?case_id=${id}&lang=en`
      )
      detail.items = data
    } catch (error) {
      console.log('error :>> ', error)
    }
    return { idCase: params.case, detail: detail }
  },

  data() {
    return {
      listOpens: 1,
      detail: {},
      listItemsWon: [],
      listItems: [],
      type: false,
      isOpenCase: false,
      openResult: false,
      loadingBtn: false,
      // List numbers index items winning will appear
      safeNumber: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      offsetHeight: 0,
      offsetWidth: 0,
      isAnimation: true,
      volumeSetting: 0.2,
      openSound: null,
      rollingSound: null,
    }
  },
  mounted() {
    this.offsetHeight = this.$refs?.scroll_to?.offsetHeight
    this.rollingSound = new Audio(require('@/assets/affect/vfx-coin.mp3'))
    this.openSound = new Audio(require('@/assets/affect/opencase.mp3'))

    this.$nextTick(() => {
      this.onResize()
    })
    window.addEventListener(
      'resize',
      debounce(() => {
        this.onResize()
      }, 100)
    )
  },
  created() {
    this.transformItems()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    isLogin() {
      return true
    },
    totalPrice() {
      return this.caseQuantity * this.detail.price
    },
    caseQuantity() {
      return this.listOpens
    },
    ...mapGetters({
      currentPath: 'setting/getCurrentPath',
      isEnabledSound: 'setting/isEnabledSound',
    }),
  },
  methods: {
    toggleSound() {
      this.$store.dispatch('setting/toggleSound')
    },
    onResize() {
      this.offsetWidth = this.$refs?.offsetWidth?.clientWidth
      // Prevent user resize window while opening
      if (this.isOpenCase) {
        this.handleResetState()
      }
    },
    randomNumber(min, max) {
      let num = Math.floor(Math.random() * this.safeNumber.length)
      return this.safeNumber.splice(num, 1)
    },

    shuffle(a) {
      if (a.length < 40) {
        let missingItem = 40 - a.length
        for (let t = 0; t < missingItem; t++) {
          a.push(a[Math.floor(Math.random() * a.length)])
        }
      }
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },

    tryagain(data) {
      this.listOpens = 1
      this.listItemsWon = []
      this.openResult = this.isOpenCase = data
    },

    async handleOpencase() {
      let timeSetting = 1
      window.scrollTo(0, 375)
      this.rollingSound.volume = this.openSound.volume = this.volumeSetting

      // Should display animation or not
      if (!this.type) {
        this.isOpenCase = !this.isOpenCase
        timeSetting = timeStamp + 0.5
        this.isAnimation = true
      }
      this.isAnimation = false
      this.listItemsWon = await this.handleRequestOpenCase()

      // Check to play audio
      if (
        !this.type &&
        this.isOpenCase &&
        this.listItemsWon &&
        this.isEnabledSound
      ) {
        this.openSound.play()
        setTimeout(() => {
          this.rollingSound.play()
        }, 1000)
      }
      //TODO: Reset state, improve logic later
      setTimeout(() => {
        this.handleResetState()
      }, timeSetting * 1000 + 400)
    },

    handleResetState() {
      this.loadingBtn = this.isOpenCase = false
      this.isAnimation = this.openResult = true
      if (this.openSound !== undefined) {
        this.openSound.pause()
        this.openSound.currentTime = 0
      }
      if (this.openSound !== undefined) {
        this.rollingSound.pause()
        this.rollingSound.currentTime = 0
      }
      this.safeNumber = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
    },
    async handleRequestOpenCase() {
      this.loadingBtn = true
      try {
        // const {
        //   data: { data },
        // } = await this.$repositories.cases.open({
        //   id: this.idCase,
        //   count: this.caseQuantity,
        // })
        console.log('mockData :>> ', mockData.cases)
        let data = mockData.cases
        // Generate random index by item
        const indexItemsWon = Object.keys(data)
          .map((e) => this.randomNumber())
          .flat()
        // Replace list item by item won & append index
        return Object.values(data).map((item, index) => {
          this.listItems.splice(indexItemsWon[index], 1, item)
          return {
            ...item,
            idx: indexItemsWon[index],
          }
        })

        // Update  wallet user
        this.$store.dispatch('profile/setBalance', data?.wallet)
      } catch ({ response }) {
        this.loadingBtn = false
        this.$toast('error', response?.data?.message)
      }
    },

    changeQuantityCases(item) {
      this.quantity = item
      this.listOpens = item
    },

    async transformItems() {
      let cloneItems = await JSON.parse(JSON.stringify(this.detail.items))
      this.listItems = await this.shuffle(cloneItems)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/_variables.scss';
@import '~@/assets/styles/_mixin.scss';
.case-open {
  margin-top: 1rem;
  border-top: 2px solid $primary-color;
  &__container {
  }
  &__inner {
    overflow: hidden;
    // padding: 1rem 0;
  }
  &__actions {
    height: 50px;
    max-width: 547px;
    &--system {
      @include phone {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.fadeDown-enter-active,
.fadeDown-leave-active {
  transform: translateY(0px);
  transition: all 0.3s;
}
.fadeDown-enter,
.fadeDown-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
.fadeScale-leave-active {
  transition: opacity 0.3s;
}
.fadeScale-leave-to {
  opacity: 0;
}
.section-opencase {
  overflow: hidden;
}
.login-steam {
  &:hover,
  :focus {
    background-color: $primary-color;
    outline: none;
  }
}
.button-action {
  background-color: #000f64 !important;
}
.total_price {
  color: $secondary-color;
}
.button__sound {
  &--toggle {
    position: absolute;
    transform: rotate(135deg);
    top: 9px;
    width: 20px;
    color: rgb(204, 204, 204);
    height: 1px;
    z-index: -1;
    border-bottom: 1px solid rgb(204, 204, 204);
  }
}
</style>
