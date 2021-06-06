<template>
  <div class="wrapper-history relative">
    <transition
      name="rotate"
      :key="displayDiv"
    >
      <i
        class="icon el-icon-arrow-down cursor-pointer"
        :class="[displayDiv ?'rotate' : null]"
        style="position: absolute; right: 40px; top: 30px;z-index: 10;"
        @click.stop="handleCollapse"
      ></i>
    </transition>
    <el-tabs class="history mt-5 ">
      <el-tab-pane
        style="padding:0 5% 5%;"
        :label="$t('title.purchase_history')"
      >

        <el-table
          v-show="displayDiv"
          ref="table"
          class="table-history"
          :data="lists"
          :header-cell-style="{ background: 'rgb(38 42 53)',  color: '#f0f0f0'}"
          row-class-name="test"
          style="width: 100%;background-color: #2B2D36;margin-bottom: 20px;"
        >

          <el-table-column
            prop="box_name"
            :label="$t('history.box')"
          >
            <template slot-scope="scope">
              <NuxtLink :to="`/${scope.row.id}`">
                {{scope.row.box_name}} +1
              </NuxtLink>
            </template>
          </el-table-column>
          <el-table-column
            prop="item_name"
            :label="$t('history.item')"
          >
            <template slot-scope="scope">
              <NuxtLink :to="`/items/${scope.row.id}`">
                {{scope.row.item_name}} +1
              </NuxtLink>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            :label="$t('history.price')"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              ${{scope.row.price}}
            </template>
          </el-table-column>
        </el-table>

        <!-- Pagination -->
        <el-pagination
          v-show="displayDiv"
          class="pagination "
          layout="prev, pager, next"
          :total="histories.totalElements"
          :page-size="histories.size"
          @current-change="pageChange"
          background
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "HistoryTab",
    props: { data: { type: [Array, Object] } },
    data () {
      return {
        displayDiv: false,
        computedHeight: 0
      }
    },
    computed: {
      histories () {
        return this.data
      },
      lists () {
        return this.data.content
      }
    },
    mounted () {
      this.initHeight()
    },

    methods: {
      initHeight: function () {
        // Animation here
      },
      handleCollapse () {
        this.displayDiv = !this.displayDiv
      },
      pageChange (page) {
        this.$emit("historyPageChange", page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .pagination {
    padding-left: 0px;
    margin-left: -5px;
    padding-top: 20px;
  }
  .history.el-tabs {
    background-color: rgba(26, 29, 36, 0.8);
    border-radius: 10px;

    .el-tabs__nav-wrap {
      &.el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }
  .icon {
    transition: all 0.3s;
  }
  .icon.rotate {
    transform: rotate(180deg);
  }
</style>
<style lang="scss">
  @import '~@/assets/styles/_variables.scss';
  .table-history {
    .test {
      color: $main-text-color;
      opacity: 0.9;
      background-color: rgba(26, 29, 36, 0.19);
    }
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #212e3e6d !important;
  }
  .el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #56565685;
  }
  .el-table {
    &:before {
      display: none;
    }
  }
</style>
