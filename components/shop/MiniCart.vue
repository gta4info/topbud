<template>
  <nuxt-link to="/shop/cart" class="cart" v-if="totalLength > 0">
    <v-icon size="40">mdi-cart</v-icon>
    <div class="badge">
      {{ totalLength }}
    </div>
  </nuxt-link>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cartLength: 'shop/cartLength',
      mixs: 'shop/mixs'
    }),
    totalLength() {
      return this.cartLength + (this.mixs.cart && this.mixs.cart.data ? this.mixs.cart.data.length : 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1;
    background: #eaeaea;
    color: #dbdbdb;
    width: 60px;
    height: 60px;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;

    &:hover {
      background: #333;
      border-color: #333;

      .v-icon {
        color: #fff;
      }
    }

    .badge {
      height: 22px;
      width: 22px;
      background-color: #7fad39;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      font-weight: 600;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: -12px;
    }
  }
</style>
