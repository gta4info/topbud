<template>
  <v-container>
    <div class="cart">
      <div v-for="product in cart" :key="product.id">
        Category: {{product.category.title}}, Product: {{product.title}}
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cart: 'shop/cart'
    })
  }
}
</script>

<style scoped>

</style>
