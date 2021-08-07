<template>
  <v-app app>
    <Header />
    <v-main app>
      <nuxt />
    </v-main>
    <Footer />
    <MiniCart />
  </v-app>
</template>

<script>
export default {
  components: {
    'MiniCart': () => import('@/components/shop/MiniCart')
  },
  async mounted () {
    await this.$store.dispatch('shop/getWeights');
    await this.$store.dispatch('shop/getCategories');
  }
}
</script>
