<template>
  <v-app app>
    <HeaderNew v-if="windowWidth > 600"/>
    <HeaderMobileNew v-else/>
    <v-main app>
      <nuxt/>
      <FooterNew/>
    </v-main>
    <DialogRestrictions v-if="dialogRestrictions" />
  </v-app>
</template>

<script>
export default {
  scrollToTop: true,
  name: 'new',
  components: {
    'DialogRestrictions': () => import('@/components/DialogRestrictions'),
  },
  data: () => ({
    windowWidth: null,
    dialogRestrictions: false
  }),
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
  created () {
    this.$store.commit('shop/SET_CART_LENGTH');
    this.$store.commit('shop/SET_MIXS_CART');
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
    }
    this.$root.$on('close-dialog-restrictions', () => this.dialogRestrictions = false);
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener("resize", this.setWindowWidth);
    }
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1264px) {
  .container--fluid {
    padding: 0 !important;
  }
}
</style>
