<script>
  export default {
    name: "Wrapper",
    render (createElement) {
      const wrapper = createElement('div', { class: 'wrapper w-full' }, this.$slots.default)
      return wrapper
    }
  }
</script>
