<template>
  <v-app app>
    <template>
      <HeaderNew v-if="windowWidth > 600"/>
      <HeaderMobileNew v-else/>
    </template>
    <v-main app>
      <nuxt />
      <FooterNew />
    </v-main>
    <DialogRestrictions v-if="dialogRestrictions" />
  </v-app>
</template>

<script>
export default {
  scrollToTop: true,
  data: () => ({
    windowWidth: null,
    dialogProductAdded: false,
    dialogRestrictions: false
  }),
  components: {
    'DialogRestrictions': () => import('@/components/DialogRestrictions'),
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    },
    scrollFix: function(hashbang) {
      location.hash = hashbang;
    }
  },
  mounted() {
    setTimeout(() => this.scrollFix(this.$route.hash), 1);

    if(this.$cookies.get('age_confirmed') !== undefined && this.$cookies.get('age_confirmed')) {
      this.dialogRestrictions = false;
    } else {
      this.dialogRestrictions = true;
    }
  },
  created() {
    this.$store.commit('shop/SET_CART_LENGTH');
    this.$store.commit('shop/SET_MIXS_CART');
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
