<template>
  <v-app app v-if="!loading">
    <Header v-if="$vuetify.breakpoint.mdAndUp" :breadcrumbs="breadcrumbs"/>
    <HeaderMobile v-else/>
    <v-main app>
<!--      <ticker v-if="$vuetify.breakpoint.smAndDown"/>-->
      <nuxt/>
      <Footer/>
    </v-main>
    <DialogRestrictions v-if="dialogRestrictions" />
  </v-app>
</template>

<script>
export default {
  name: 'new',
  components: {
    'DialogRestrictions': () => import('@/components/DialogRestrictions'),
    'ticker': () => import('@/components/Ticker'),
  },
  data: () => ({
    windowWidth: null,
    dialogRestrictions: false,
    loading: true,
    breadcrumbs: []
  }),
  watch: {
    $route (to, from){
      let all = Array.prototype.slice.call(document.querySelectorAll('*')).filter(function(el){return el.offsetHeight !== el.scrollHeight})

      for (let i=0, max=all.length; i < max; i++) {
        all[i].scroll(0,0);
      }
    },
    '$vuetify.breakpoint.width'() {
      if(this.$vuetify.breakpoint.width > 0) {
        this.loading = false;
      }
    }
  },
  async mounted() {
    if(this.$cookies.get('age_confirmed') !== undefined && this.$cookies.get('age_confirmed')) {
      this.dialogRestrictions = false;
    } else {
      this.dialogRestrictions = true;
    }

    await this.$store.dispatch('shop/getCartProducts');
  },
  created () {
    this.$root.$on('set-breadcrumbs', data => this.breadcrumbs = data);
    this.$root.$on('close-dialog-restrictions', () => this.dialogRestrictions = false);
    this.$store.commit('shop/SET_CART_LENGTH');
    this.$store.commit('shop/SET_MIXS_CART');
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
