<template>
  <div class="page">
    <v-container>
      <div class="orderSuccess">
        <img src="@/static/images/order-success.png" alt="">
        <img src="@/static/images/order-success-thumb.png" alt="">
        <div>Order Created</div>
        <div>ID: <span>{{$route.query.order}}</span></div>
        <v-btn to="/shop" depressed height="50" width="320" color="#21AA5B">Back To Categories</v-btn>
        <v-btn to="/shop/deals" depressed height="50" width="320" color="#21AA5B">Look At Our Deals</v-btn>
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
  data: () => ({
    breadcrumbs: [
      {
        link: '/',
        title: 'home'
      },
      {
        link: '/shop',
        title: 'shop'
      },
      {
        link: null,
        title: 'Order created'
      },
    ]
  }),
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
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
      color: #21AA5B;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;

      &:last-of-type {
        margin-bottom: 37px;
      }
    }

    img:first-of-type {
      margin-bottom: 38px;
      margin-left: -14px;
    }

    img:last-of-type {
      margin-bottom: 7px;
    }

    .v-btn {
      text-transform: none;
      color: #ffffff;
      font-weight: 700;
      font-size: 20px;
      margin-top: 30px;
    }
  }
</style>
