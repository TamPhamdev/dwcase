<template>
  <div class="">
    <ul class="flex flex-cols sm:flex-row justify-around menu-footer py-6">
      <li class="menu-footer__item"> {{ $t('footer.faq') }}</li>

      <li class="menu-footer__item">{{ $t('footer.contact') }}</li>
      <li class="menu-footer__item">
        <NuxtLink to="/items"> {{ $t('footer.items') }}</NuxtLink>
      </li>
      <li class="menu-footer__item"> {{ $t('footer.termandcondition') }}</li>
      <li class="menu-footer__item">{{ $t('footer.leaderboard') }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "FooterMenu"
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .menu-footer {
    flex-wrap: wrap;
    &__item {
      padding: 1rem;
      white-space: nowrap;
      cursor: pointer;
      text-underline-position: under;
      text-decoration: underline;
      text-decoration-color: $primary-color;
    }
  }
</style>
