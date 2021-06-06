<template>
  <footer class="wrapper footer">

    <FooterMenu />
    <div class="flex flex-col md:flex-row  flex-wrap justify-between  py-8">
      <div class="footer__term-conditions w-1/4">
        <p>© 2016—2020 DWCASE.COM</p>
        <p>WiseAvant OÜ as an administrator of the Website adopts these Terms of Use that specifies User’s rights and obligations and constitute a legally binding agreement for both parties. These Terms of Use affect User’s rights and impose certain obligations while using the Website, so the User must read them carefully.</p>
      </div>
      <div class="footer__payment w-2/4">
        <img
          src="@/assets/images/payments.png"
          alt=""
        >
      </div>
      <div class=" w-1/4 flex justify-end footer__customer">
        <img
          src="@/assets/images/footer-customer.png"
          alt=""
        >
      </div>
    </div>
  </footer>
</template>

<script>
  import FooterMenu from "./FooterMenu"
  export default {
    name: "Footer",
    components: { FooterMenu }

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_mixin.scss';
  @import '~@/assets/styles/_variables.scss';
  .footer {
    color: rgb(173, 165, 155);
    background-image: initial;
    background-color: $background-color;
    &__term-conditions {
      font-size: 0.8rem;
      min-width: 25%;
      text-align: left;
      padding-right: 1rem;
      @include wide {
        width: 100%;
        margin-bottom: 30px;
        text-align: center;
      }
    }
    &__payment {
      padding: 0 30px;
      max-width: 100%;
      @include tablet {
        max-width: 620px;
      }
      @include large {
        width: 668px;
      }
      @include desktop {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      @include wide {
        min-width: 70%;
        padding: 0;
      }
    }
    &__customer {
      min-width: 220px;
      @include phone {
        display: none;
      }
      @include desktop {
        justify-content: center;
        width: 100%;
        margin: 30px 0 10px 0;
      }
    }
  }
</style>

