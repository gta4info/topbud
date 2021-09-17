<template>
  <div class="page">
    <v-container>
      <nav class="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop">Shop</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop/cart">Cart</nuxt-link>
          </li>
          <li>Order number</li>
        </ul>
      </nav>

      <h1>Order number</h1>

      <div class="orderSuccess">
        <v-icon size="80" color="#28A745">mdi-check-circle-outline</v-icon>
        <div>Your order ID: <span>{{$route.query.order}}</span></div>
        <div>Thanks for shopping with TOPBUD Store!</div>
        <nuxt-link to="/shop">Continue shopping</nuxt-link>
      </div>
    </v-container>
  </div>
</template>

<script>

export default {
  scrollToTop: true,
  head: {
    title: 'Order number | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Your shopping cart with TOPBUD store'
      }
    ]
  },
  created () {
    if(!this.$route.query.order) {
      this.$router.push({name: 'shop-cart'});
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderSuccess {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px 0 100px;

    div {
      font-size: 18px;
      margin-top: 40px;

      span {
        font-weight: 900;
        color: #28A745;
      }
    }

    a {
      font-size: 18px;
      text-decoration: underline;
      margin-top: 10px;
    }
  }
</style>
