<template>
  <Wrapper>
    <h1 class="breadcrumb ">
      <div class="flex items-center justify-center flex-wrap text-center">
        <span class="breadcrumb-primary">
          <nuxt-link
            to="/"
            class="link"
          >{{$t('title.home')}}</nuxt-link>
        </span>
        <svg-icon
          name="arrow-right"
          class="mx-4"
        /> <span>{{$t('history.item')}}</span>
      </div>
    </h1>
    <ItemContainer>

      <Item
        v-for="item in list.content"
        :key="item.id"
        hasFooter
        :data="item.item"
      />
      <template
        #footer
        style="height: 50px;"
      >
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :total="list.totalElements"
          :page-size="list.size"
          @current-change="pageChange"
          background
          :hide-on-single-page="true"
        >
        </el-pagination>
      </template>
    </ItemContainer>
  </Wrapper>
</template>
// TODO: change pager-count to responsive
<script>
  export default {
    name: "Items",
    async asyncData ({ $repositories, $toast }) {
      let list
      try {
        const { data } = await $repositories.items.getAllItems({ page: 0, size: 30, gameId: 730 })
        list = data.data
      } catch (error) {
        console.log('error :>> ', error);
        // $toast('error', response.data.message)
      }
      return { list }
    },
    data () {
      return {
        items: [],

      }
    },
    methods: {
      async getAllItems () {
        try {
          const { data } = await this.$repositories.items.getAllItems({ page: this.list.page, size: this.list.size, gameId: 730 })
          this.list = await data.data
        } catch ({ response }) {
          this.$toast('error', response.data.message)
        }
      },

      pageChange (page) {
        this.list.page = page - 1
        this.getAllItems()
      }
    },

    created () {
      this.items = this.list
    }
  }
</script>

<style lang="scss" scoped>
</style>
