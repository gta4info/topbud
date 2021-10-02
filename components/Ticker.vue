<template>
  <div class="ticker">
    <div class="ticker__content">
      <div>Want Same-Day Delivery? The cut-off time to order has been extended to 1:30 pm.</div>
      <template v-if="$vuetify.breakpoint.smAndDown">
        <div v-for="item of 10">Want Same-Day Delivery? The cut-off time to order has been extended to 1:30 pm.</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
name: "Ticker"
}
</script>

<style lang="scss" scoped>
@keyframes ticker {
  0% { transform: translate3d(25%, 0, 0); }
  100% { transform: translate3d(-25%, 0, 0); }
}

.ticker {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6C76F;
  z-index: 1;
  position: relative;
  overflow: hidden;

  @media(max-width: 768px) {
    margin-bottom: 10px;
  }

  &__content {
    display: flex;
  }

  div {
    color: #004B5A;
    font-weight: 700;
    font-size: 12px;

    @media(max-width: 768px) {
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      white-space: nowrap;
      animation-name: ticker;
      animation-duration: 60s;
    }

    &:not(:first-of-type) {
      margin-left: 4px;
    }
  }
}
</style>
