<script>
  export default {
    name: "Box",
    render (createElement) {
      return createElement('div', { class: 'box-wrapper' }, this.$slots.default);
    }
  }
</script>
<style lang="scss" scoped>
  .box-wrapper {
    position: relative;
    border-top: 1px solid #2c303e;
    border-bottom: 1px solid #0f1014;
    border-radius: 10px;
    padding: 1rem;
    background: #1b1e26;
  }
</style>
