<template>
  <v-app app>
    <Header v-if="windowWidth > 600"/>
    <HeaderMobile v-else/>
    <v-main app>
      <nuxt />
    </v-main>
    <Footer />
    <MiniCart />
    <ProductAddedToCart :dialog="dialogProductAdded" />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    windowWidth: null,
    dialogProductAdded: false
  }),
  components: {
    'MiniCart': () => import('@/components/shop/MiniCart'),
    'HeaderMobile': () => import('@/components/HeaderMobile'),
    'ProductAddedToCart': () => import('@/components/shop/ProductAddedToCart'),
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  created() {
    this.$store.commit('shop/SET_CART_LENGTH');
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
    }

    this.$root.$on('close-product-added-to-cart-dialog', () => this.dialogProductAdded = false)
    this.$root.$on('show-product-added-to-cart-dialog', () => this.dialogProductAdded = true)
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("resize", this.setWindowWidth);
    }
  },
}
</script>
