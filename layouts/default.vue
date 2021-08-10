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
    <DialogRestrictions v-if="dialogRestrictions" />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    windowWidth: null,
    dialogProductAdded: false,
    dialogRestrictions: false
  }),
  components: {
    'MiniCart': () => import('@/components/shop/MiniCart'),
    'HeaderMobile': () => import('@/components/HeaderMobile'),
    'ProductAddedToCart': () => import('@/components/shop/ProductAddedToCart'),
    'DialogRestrictions': () => import('@/components/DialogRestrictions'),
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  mounted() {
    if(this.$cookies.get('age_confirmed') !== undefined && this.$cookies.get('age_confirmed')) {
      this.dialogRestrictions = false;
    } else {
      this.dialogRestrictions = true;
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
    this.$root.$on('close-dialog-restrictions', () => this.dialogRestrictions = false);
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("resize", this.setWindowWidth);
    }
  },
}
</script>
