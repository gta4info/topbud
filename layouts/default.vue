<template>
  <v-app app>
    <template>
      <HeaderNew v-if="windowWidth > 600"/>
      <HeaderMobileNew v-else/>
    </template>
    <v-main app>
      <nuxt/>
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
    dialogRestrictions: false,
    dialogProductAdded: false,
  }),
  components: {
    'DialogRestrictions': () => import('@/components/DialogRestrictions'),
  },
  watch: {
    $route (to, from){
      let all = Array.prototype.slice.call(document.querySelectorAll('*')).filter(function(el){return el.offsetHeight !== el.scrollHeight})

      for (let i=0, max=all.length; i < max; i++) {
        all[i].scroll(0,0);
      }
    }
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    },
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
