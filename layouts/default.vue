<template>
  <v-app app>
    <Header v-if="windowWidth > 600"/>
    <HeaderMobile v-else/>
    <v-main app>
      <nuxt />
    </v-main>
    <Footer />
    <MiniCart />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    windowWidth: null,
  }),
  components: {
    'MiniCart': () => import('@/components/shop/MiniCart'),
    'HeaderMobile': () => import('@/components/HeaderMobile'),
  },
  async mounted () {
    await this.$store.dispatch('shop/getWeights');
    await this.$store.dispatch('shop/getCategories');
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  created() {
    this.$store.commit('shop/SET_CART_LENGTH');
    this.windowWidth = window.outerWidth;
    if (window !== undefined) {
      window.addEventListener("resize", this.setWindowWidth);
    }
  },
  destroyed() {
    if (window !== undefined) {
      window.removeEventListener("resize", this.setWindowWidth);
    }
  },
}
</script>
