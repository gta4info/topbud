<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <v-container>
      <v-row v-if="cart.length || (mixs.cart && mixs.cart.data && mixs.cart.data.length)">
        <v-col cols="12" md="7" sm="12">
          <div class="table">
            <v-container class="table__header">
              <v-row>
                <v-col cols="7">
                  <div class="table__header-title">
                    <img src="@/static/images/cart-table-icon.png" alt="Products">
                    Products
                  </div>
                </v-col>
                <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp">
                  <div class="table__header-title">Quantity</div>
                </v-col>
                <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp">
                  <div class="table__header-title">Price</div>
                </v-col>
                <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
              </v-row>
            </v-container>
            <div class="table__list">
              <v-container>
                <v-row v-for="(product, ind) in cart" :key="`${product.id}+${ind}`" class="table__item">
                  <v-col md="7" sm="12">
                    <div class="table__item-product">
                      <img :src="product.img" :alt="product.title">
                      <div class="table__item-title">{{ product.name }} <span>{{ weights[product.weight_id] }}</span></div>
                    </div>
                  </v-col>
                  <v-col md="2" sm="5">
                    <div class="table__item-quantity">
                      <v-btn
                        x-small
                        depressed
                        @click="$store.commit('shop/CHANGE_AMOUNT_OF_PRODUCT_IN_CART', {id: product.id, quantity: product.quantity - 1})"
                      >
                        <v-icon small>mdi-minus</v-icon>
                      </v-btn>
                      <div>{{product.quantity}}</div>
                      <v-btn
                        x-small
                        depressed
                        @click="$store.commit('shop/CHANGE_AMOUNT_OF_PRODUCT_IN_CART', {id: product.id, quantity: product.quantity + 1})"
                      >
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col md="2" sm="3">
                    <div class="table__item-total">${{ product.price * product.quantity }}</div>
                  </v-col>
                  <v-col md="1" sm="4">
                    <v-btn class="table__item-remove" icon @click="$store.dispatch('shop/deleteProductFromCart', product.id)">
                      <v-icon large color="#B1B1B1">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <!--Mix'N'Match-->
                <v-row v-for="(mix, i) in mixs.cart.data" :key="i" class="table__item table__item-mix">
                  <v-col md="7" sm="12">
                    <div class="table__item-product" :class="`table__item-mix--${mix.weight}`">
                      <div class="table__item-imgGroup">
                        <img :src="product.img" :alt="product.name" v-for="(product, index) in mix.products[0]" :key="index">
                      </div>
                      <div class="table__item-titleGroup">
                        <div v-for="(product, ind) in mix.products[0]" :key="`${product.id}+${ind}`"><div style="font-weight: 700;display: inline;">{{product.quantity}}x</div> {{ product.name }} <span>{{ weights[product.weight_id] }}</span></div>
                      </div>
                    </div>
                  </v-col>
                  <v-col md="2" sm="5">
                    <div class="table__item-quantity">
                      <v-btn
                        x-small
                        depressed
                        @click="$store.commit('shop/CHANGE_AMOUNT_OF_MIX_IN_MIXS_CART', {key: i, quantity: mix.quantity - 1})"
                      >
                        <v-icon small>mdi-minus</v-icon>
                      </v-btn>
                      <div>{{mix.quantity}}</div>
                      <v-btn
                        x-small
                        depressed
                        @click="$store.commit('shop/CHANGE_AMOUNT_OF_MIX_IN_MIXS_CART', {key: i, quantity: mix.quantity + 1})"
                      >
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col md="2" sm="3">
                    <div class="table__item-total">${{ mix.price * mix.quantity }}</div>
                  </v-col>
                  <v-col md="1" sm="4">
                    <v-btn class="table__item-remove" icon @click="$store.commit('shop/DELETE_MIX_FROM_MIXS_CART', i)">
                      <v-icon large color="#B1B1B1">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>

            <div class="table__bottom">
              <nuxt-link to="/delivery" target="_blank" class="table__bottom-delivery" v-ripple>
                <img src="@/static/images/delivery-car.png" alt="Delivery information">
                <span>Delivery Information</span>
              </nuxt-link>
              <div class="table__bottom-checkout">
                <div>
                  <span>Cart Total</span>
                  <span style="color: #333333">${{calculateCartTotal}}</span>
                </div>
                <div class="d-flex flex-column">
                  <div>
                    <span>Delivery</span>
                    <span style="color: #333333">${{calculateCartTotal >= 100 ? 0 : 10}}</span>
                  </div>
                  <div>
                    <span>Order Total</span>
                    <span style="color: #008DE3">${{calculateTotal}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </v-col>
        <v-col cols="12" md="5" sm="12">
          <CheckoutForm />
        </v-col>
      </v-row>
      <v-row v-else>
        <div class="empty">
          <div>Your cart is empty</div>
          <nuxt-link to="/shop">Continue shopping</nuxt-link>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head: {
    title: 'Cart | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Your shopping cart with TOPBUD store'
      }
    ]
  },
  components: {
    'CheckoutForm': () => import('@/components/shop/CheckoutForm')
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
        title: 'Shopping Cart'
      },
    ],
    promocodeValue: 0,
    promocodeIsPercent: true,
    promocodeApplied: false
  }),
  computed: {
    ...mapGetters({
      cart: 'shop/cart',
      mixs: 'shop/mixs',
      weights: 'shop/weights'
    }),
    calculateCartTotal() {
      let total = 0;
      this.cart.map(item => {
        total += item.quantity * item.price;
      })
      if(this.mixs.cart.data) {
        this.mixs.cart.data.map(item => {
          total += item.quantity * item.price;
        })
      }

      if(this.promocodeApplied) {
        if(this.promocodeIsPercent) {
          total = total - (total / 100 * this.promocodeValue);
        } else {
          total = total - this.promocodeValue;
        }
        total = Math.floor(total);
      }

      return total;
    },
    calculateTotal() {
      return this.calculateCartTotal + (this.calculateCartTotal >= 100 ? 0 : 10);
    }
  },
  methods: {
    checkout() {
      alert('Checkout!')
    }
  },
  async created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
    await this.$store.dispatch('shop/setMixsCart');
    await this.$store.dispatch('shop/getMixProducts');
    await this.$store.dispatch('shop/getCartProducts');

    this.$root.$on('set-promocode-cart-total', data => {
      this.promocodeApplied = data.applied;
      this.promocodeIsPercent = data.isPercent;
      this.promocodeValue = data.value;
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
}

.table {
  display: flex;
  flex-direction: column;

  &__header {
    font-size: 18px;
    margin-bottom: 20px;

    &-title {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 18px;
      color: #333;

      img {
        margin-right: 20px;
      }
    }
  }

  &__list {
    max-height: 664px;
    overflow-y: auto;
    padding-right: 10px;

    @media(max-width: 768px) {
      max-height: 410px;
    }

    &::-webkit-scrollbar-track {
      background: #EDEDED !important;
    }

    &::-webkit-scrollbar-thumb {
      background: #C4C4C4 !important;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }
  }

  &__item {
    position: relative;
    border: 1px solid #E6E6E6;
    border-radius: 10px;
    min-height: 156px;
    padding: 0 20px;

    @media(max-width: 768px) {
      padding: 22px;

      .col-sm-12 {
        flex: 1 0 100%;
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 10px;

      @media(max-width: 768px) {
        margin-bottom: 20px;
      }
    }

    .col {
      display: flex;
      align-items: center;
    }

    &-mix {

      .table__item {

        &-imgGroup {
          display: flex;
          flex-wrap: wrap;
          position: relative;
          width: 64px;
          min-height: 64px;
          margin-right: 20px;
          flex-shrink: 0;

          @media(max-width: 768px) {
            display: none;
          }

          img {
            margin-right: 0;
            width: 50%;
            height: 50%;
          }
        }

        &-titleGroup {
          display: flex;
          flex-direction: column;

          div {
            font-size: 14px;
          }
        }
      }
    }

    &-product {
      display: flex;
      align-items: center;

      img {
        width: 64px;
        height: 64px;
        margin-right: 20px;
      }
    }

    &-title {
      font-size: 16px;

      @media(max-width: 768px) {
        font-size: 12px;
      }

      span {
        margin-left: 10px;
        color: #cecece;

        @media(max-width: 768px) {
          align-self: flex-start;
          margin-left: 0;
        }
      }
    }

    &-price {
      font-weight: 900;
      font-size: 18px;
      @media(max-width: 768px) {
        font-size: 14px;
      }
    }

    &-total {
      font-weight: 900;
      font-size: 18px;
      width: 100%;
      text-align: center;

      @media(max-width: 768px) {
        font-size: 14px;
      }
    }

    &-remove {

      @media(max-width: 768px) {
        margin-left: auto;
      }
    }

    &-quantity {
      display: flex;
      align-items: center;
      padding: 5px 6px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      width: 130px;

      @media(max-width: 768px) {
        padding: 5px;
        width: 80px;
        height: 35px;
        border-radius: 25px;
      }

      div {
        flex-grow: 1;
        text-align: center;
        font-size: 16px;
        @media(max-width: 768px) {
          font-size: 14px;
        }
      }

      .v-btn {
        height: 24px !important;
        width: 24px !important;
        min-width: 24px !important;
        border-radius: 8px !important;

        @media(max-width: 768px) {
          height: 16px !important;
          width: 16px !important;
          min-width: 16px !important;
        }
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 50px;
    padding-right: 10px;

    @media(max-width: 768px) {
      flex-direction: column-reverse;
    }

    &-delivery {
      display: flex;
      flex-direction: column;
      width: 230px;
      border-radius: 5px;
      border: 1px solid #008DE3;
      align-self: flex-start;

      @media(max-width: 768px) {
        width: 100%;
        margin-top: 40px;
      }

      img {
        width: 120px;
        height: 55px;
        margin: 13px auto 12px;
      }

      span {
        color: #008DE3;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        padding: 9px 0;
        border-top: 1px solid #008DE3;
      }
    }

    &-checkout {
      display: flex;
      flex-direction: column;
      width: 220px;

      @media(max-width: 768px) {
        width: auto;
      }

      div {
        display: flex;
        justify-content: space-between;

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }

        span:last-child {
          color: #dd2222;

          @media(max-width: 768px) {
            margin-left: 30px;
          }
        }
      }

      span {
        font-weight: 700;
        font-size: 18px;
        color: #b1b1b1;
      }
    }
  }
}

.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;

  div {
    font-weight: 500;
    font-size: 26px;
    margin-bottom: 10px;
  }

  a {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 900;
    color: #6f6f6f;
  }
}
</style>
