<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Product added to cart</span>
        <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text class="d-flex flex-column align-center py-12" style="font-size: 16px;">
        <div @click="closeDialog" style="cursor: pointer;">Continue shopping</div>
        <div style="font-size: 13px;" class="my-2">- or -</div>
        <nuxt-link to="/shop/cart" class="black--text" @click.native="closeDialog">go to cart</nuxt-link>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ProductAddedToCart",
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeDialog() {
      this.$root.$emit('close-product-added-to-cart-dialog');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
