<template>
  <div>
    <HeaderNew v-if="windowWidth > 600"/>
    <HeaderMobileNew v-else/>
    <v-main app>
      <nuxt/>
    </v-main>
    <FooterNew/>
  </div>
</template>

<script>
export default {
  name: 'new',
  data: () => ({
    windowWidth: null
  }),
  methods: {
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  created () {
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 1904px) {
  .container:not(.container--fluid) {
    max-width: 1400px !important;
  }
  .container--fluid {
    padding: 0 !important;
  }
}
</style>
