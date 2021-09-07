<template>
  <div>
    <HeaderNew v-if="windowWidth > 600"/>
    <HeaderMobileNew v-else/>
    <v-main app :style="windowWidth < 768 ? 'margin-top: 85px !important;' : 'margin-top: 0 !important;'">
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
@media (min-width: 1264px) {
  .container--fluid {
    padding: 0 !important;
  }
}
</style>
