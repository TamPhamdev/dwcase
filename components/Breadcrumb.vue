<template>
  <div>
    <div
      v-for="item in breadcrumbsLinks"
      class="flex"
    >
      <span>Home</span>
      <span>
        {{item.name}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    computed: {
      breadcrumbsLinks () {
        let tmp = []
        if (this.$route.matched) {
          this.$route.matched.forEach(link => {
            tmp.push(Object.assign({ meta: { title: 'Title not found in meta' } }, link))
          })
        }
        if (tmp.length === 0) {
          tmp.push({ path: '/', name: 'Home' })
        }
        return tmp
      }
    }
  }
</script>
