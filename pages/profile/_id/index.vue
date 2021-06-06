<template>
  <Wrapper class="">
    <div>
      <div class="flex justify-center">

        <h1 class="breadcrumb ">
          <div class="flex items-center justify-center flex-wrap">
            <span class="breadcrumb-primary">
              <nuxt-link
                to="/"
                class="link"
              >{{$t('title.home')}}</nuxt-link>
            </span>
            <svg-icon
              name="arrow-right"
              class="mx-4"
            /> <span class="uppercase whitespace-nowrap"> {{profileData.steamNickname}}</span>
          </div>
        </h1>
      </div>
      <div class="profile-trade grid grid-cols-6 lg:grid-cols-5 gap-4">
        <div class="profile-trade__wrapper col-span-6 lg:col-span-3 flex ">
          <div style="min-width: 120px;">
            <img
              class="profile-trade__avatar"
              :src="profileData.avatarUrl"
              alt=""
            >
          </div>
          <div class="w-full pl-4">
            <div>

              <el-input
                class="input_url"
                :disabled="loading"
                placeholder="Please input trade url"
                v-model="trade_url"
              >
                <template slot="append">
                  <el-button
                    type="primary"
                    :loading="loading"
                    @click.stop="handleSaveURLOffer"
                  >{{$t('button.save')}}</el-button>
                </template>
              </el-input>
            </div>
            <div class="profile-trade__link mt-3">
              <p> <i class="el-icon-warning-outline pr-3"></i>{{$t('profile.note_url')}}</p>
              <a
                href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
                class="uppercase font-semibold profile-trade__link-offer"
                target="_blank"
              >{{ $t('profile.trade_url') }}</a>
            </div>
          </div>
        </div>
        <div class="profile-trade__wrapper col-span-3 lg:col-span-1">
          <h3 class="title">{{$t('profile.title_social')}}</h3>
          <p class="title-lighter">{{$t('profile.subtitle_social')}}</p>
          <div class="flex">
            <div class="profile-trade__icon mr-3">
              <svg-icon name="twitter1" />
            </div>
            <div class="profile-trade__icon mr-3">
              <svg-icon name="mail" />
            </div>
          </div>
        </div>
        <div class="profile-trade__wrapper col-span-3 lg:col-span-1 flex items-center flex-col justify-around">
          <nuxt-link
            to="/topup"
            class="w-full"
          >
            <el-button
              class="w-full uppercase font-bold profile-trade__btn"
              type="primary"
            >
              {{$t('button.addfund')}}
            </el-button>
          </nuxt-link>
          <nuxt-link
            to="/topup"
            class="w-full"
          >
            <el-button
              class="w-full uppercase m-0 font-bold"
              style="margin:0;padding: 1rem;font-weight: bold;"
              type="warning"
              plain
            > {{$t('button.skin')}}</el-button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- History -->
    <History
      :data="histories"
      @historyPageChange="historyPageChange"
    />
    <!-- Inventories -->
    <ItemContainer class="mt-5">
      <template #header>
        <div class="flex justify-between w-full">
          <h3 class="uppercase title_myitems">{{$t('title.my_items')}}</h3>
          <div>
            <el-select
              class="select-secondary"
              v-model="status"
              placeholder="Select"
              @change="handleChangeStatus"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="$t(`status.${item.label.toLowerCase()}`)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </template>
      <template #default>
        <Item
          v-for="(item,index) in itemsInventory"
          v-if="itemsInventory"
          :data="item"
          hasFooter
          hasAction
          @updateList="getAllItems"
          :key="item.id + index +1 +item.name  + item.id_action"
        >
        </Item>

        </div>
      </template>
      <template
        #footer
        style="height: 50px;"
      >
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :total="inventories.totalElements"
          :page-size="inventories.size"
          hide-on-single-page
          @current-change="pageChange"
          background
        >
        </el-pagination>
        <!-- <h1
          class="text-center"
          v-show="!itemsInventory.length"
        >No data</h1> -->
      </template>
    </ItemContainer>
    </div>
  </Wrapper>
</template>

<script>
  import { mapGetters } from "vuex"
  import History from "../components/History"
  export default {
    middleware: "auth",
    name: "Profile",
    fetchOnServer: false,
    components: {
      History
    },
    async fetch () {
      try {
        const { data } = await this.$repositories.items.getAllItems({ gameId: 730, page: 0, size: 42, })
        const history = await this.$repositories.profile.getHistories({ page: 0, size: 20 })
        this.histories = history.data.data
        this.inventories = data.data
      }
      catch (error) {
        console.log('response :>> ', error);
      }
    },
    data () {
      return {
        loading: false,
        trade_url: "",
        inventories: [],
        histories: [],
        status: null,
        options: [
          {
            label: "All",
            value: null,
          },
          {
            label: "Pending",
            value: "Pending",
          },
          {
            label: "Processing",
            value: "Processing",
          },
          {
            label: "Accepted",
            value: "Accepted",
          },
          {
            label: "Sold",
            value: "Sold",
          },
          {
            label: "Upgraded",
            value: "Upgraded",
          },
          {
            label: "Opened",
            value: "Opened",
          },
          {
            label: "Contract",
            value: "Contract",
          },
        ],
      }
    },
    methods: {
      handleChangeStatus () {
        this.inventories.number = 0
        this.getAllItems()
      },

      pageChange (page) {
        this.inventories.number = page - 1
        this.getAllItems()
      },
      historyPageChange (page) {
        this.histories.number = page - 1
        this.getAllHistory()
      },
      async getAllItems () {
        try {
          const { data } = await this.$repositories.items.getAllItems({ page: this.inventories.number, size: this.inventories.size, gameId: 730, status: this.status })
          this.inventories = data.data
        } catch ({ response }) {
          this.$toast('error', response.data.message)
        }
      },

      async getAllHistory () {
        try {
          const { data } = await this.$repositories.profile.getHistories({ page: this.histories.number, size: this.histories.size, })
          this.histories = data.data
        } catch (response) {
          // this.$toast('error', response.data.message)
        }
      },

      async handleSaveURLOffer () {
        try {
          this.loading = true
          const { data } = await this.$repositories.profile.saveURL(this.trade_url)
          this.loading = false
          this.$toast('success', "Save URL success")
        } catch ({ response }) {
          this.$toast('error', response.data.message)
          this.loading = false
        }
      }
    },
    created () {

      this.trade_url = this.profileData.steamTradeUrl
    },
    computed: {
      itemsInventory () {
        return this.inventories?.content?.map(e => ({ ...e.item, status: e.status, id_action: e.id }))
      },
      ...mapGetters({ profileData: 'profile/getterProfile', }),

    },

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  @import '~@/assets/styles/_mixin.scss';
  .title_myitems {
    font-size: 1.17rem;
    font-weight: bold;
  }
  .profile {
    &-trade {
      &__wrapper {
        padding: 1rem;
        border-top: 1px solid #2c303e;
        border-bottom: 1px solid #0f1014;
        border-radius: 10px;
        background: rgba(26, 29, 36, 0.8);
        .title {
          font-size: 1.17rem;
          font-weight: bold;
          &-lighter {
            color: #717171;
          }
        }
      }
      &__btn {
        padding: 1rem;
        font-weight: bold;
        &:hover {
          color: #fff;
        }
      }
      &__avatar {
        border-radius: 10px;
        width: 120px;
        height: 120px;
      }
      &__link-offer {
        color: $primary-color;
        &:hover {
          text-decoration: underline;
        }
      }
      &__icon {
        @include flex-center;
        cursor: pointer;
        outline: none;
        color: $main-text-color;
        background: #151820;
        border-radius: 10px;
        border: 2px solid transparent;
        padding: 0.3rem;
        transition: all 0.2s ease-in-out;
        > svg {
          padding: 0.3rem;
          width: 2.5rem;
          height: 2.5rem;
        }
        &:hover {
          transition: all 0.2s ease-in-out;
          border: 2px solid $primary-color;
          color: $primary-color;
        }
      }
    }
    .input_url {
      >>> .el-input-group__append {
        background-color: $primary-color;
        color: $main-text-color;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
<style lang="scss">
  @import '~@/assets/styles/_variables.scss';
  .el-select.select-secondary {
    input.el-input__inner {
      background-color: transparent;
      color: #fff;
      border-color: $primary-color;
    }
    .el-input.el-select__caret {
      color: $secondary-color;
    }
  }
</style>
