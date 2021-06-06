<template>
  <div class="flex flex-wrap">
    <Section
      v-for="(item, index) in cases"
      :key="index"
      :title="item.title"
      class="trending"
    >
      <Case
        v-for="(data, dataIndex) in item.cases"
        :data="data"
        :key="dataIndex"
      />
    </Section>

    <Wrapper>
      <Stat :data="stats" />
    </Wrapper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { tokenName } from '@/settings'
import Stat from '@/layouts/Header/Stat'
import mockData from '@/data.json'
export default {
  name: 'Home',
  components: { Stat },
  data() {
    return {
      cases: null,
    }
  },
  computed: {
    // ...mapGetters({ cases: 'case/getCases', stats: 'stat/getStats' }),
  },

  methods: {
    async getAllCases() {
      try {
        this.cases = mockData.goods.sections
        console.log('data :>> ', mockData)
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
    // ...mapActions('case', ['getAllCases']),
  },
  created() {
    this.getAllCases()
  },
}
</script>

<style lang="scss" scoped>
.trending {
  // background-image: url('~@/assets/images/trending.jpg');
  background-size: cover;
  background-position: top;
}
.battle {
  background-image: url('~@/assets/images/battle_cases.png');
  background-size: cover;
  background-position: top;
}
</style>
