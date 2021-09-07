<template>
  <div class="page">
    <div class="loading" v-if="loading">
      <v-progress-circular
        indeterminate
        color="#699551"
        size="30"
      />
    </div>
    <template v-else>
      <v-container>
        <nav class="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/shop">Shop</nuxt-link>
            </li>
            <li>Cart</li>
          </ul>
        </nav>

        <h1>Your shopping cart</h1>

        <div class="table" v-if="cart.length || (mixs.cart && mixs.cart.data && mixs.cart.data.length)">
          <v-container class="table__header">
            <v-row>
              <v-col cols="6">
                <div class="table__header-title">Products</div>
              </v-col>
              <v-col cols="2">
                <div class="table__header-price">Price</div>
              </v-col>
              <v-col cols="2">
                <div class="table__header-quantity">Quantity</div>
              </v-col>
              <v-col cols="1">
                <div class="table__header-total">Total</div>
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
          </v-container>
          <div class="table__list">
            <v-container>
              <v-row v-for="(product, ind) in cart" :key="`${product.id}+${ind}`" class="table__item">
                <v-col cols="6">
                  <div class="table__item-title">
                    <img :src="product.img" :alt="product.title">
                    <div class="table__item-title">{{ product.name }} <span>{{ weights[product.weight_id] }}</span></div>
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="table__item-price">${{ product.price }}</div>
                </v-col>
                <v-col cols="2">
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
                <v-col cols="1">
                  <div class="table__item-total">${{ product.price * product.quantity }}</div>
                </v-col>
                <v-col cols="1">
                  <v-btn icon @click="$store.dispatch('shop/deleteProductFromCart', product.id)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <!--Mix'N'Match-->
              <v-row v-for="(mix, i) in mixs.cart.data" :key="i" class="table__item table__item-mix">
                <v-col cols="6">
                  <div class="table__item-title" :class="`table__item-mix--${mix.weight}`">
                    <div class="table__item-imgGroup">
                      <img :src="product.img" :alt="product.name" v-for="(product, index) in mix.products[0]" :key="index">
                    </div>
                    <div class="table__item-titleGroup">
                      <div v-for="(product, ind) in mix.products[0]" :key="`${product.id}+${ind}`"><div style="font-weight: 700;display: inline;">{{product.quantity}}x</div> {{ product.name }} <span>{{ weights[product.weight_id] }}</span></div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="table__item-price">${{ mix.price }}</div>
                </v-col>
                <v-col cols="2">
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
                <v-col cols="1">
                  <div class="table__item-total">${{ mix.price * mix.quantity }}</div>
                </v-col>
                <v-col cols="1">
                  <v-btn icon @click="$store.commit('shop/DELETE_MIX_FROM_MIXS_CART', i)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div class="table__bottom">
            <div class="table__bottom-continue">
              <nuxt-link to="/shop">Continue shopping</nuxt-link>
            </div>
            <div class="table__bottom-checkout">
              <div>
                <span>Cart Total</span>
                <span style="color: #000">${{calculateCartTotal}}</span>
              </div>
              <div class="d-flex flex-column">
                <div>
                  <span>Delivery</span>
                  <span style="color: #000">${{calculateCartTotal >= 100 ? 0 : 10}}</span>
                </div>
                <div>
                  <span style="color: #7FAD39">Order Total</span>
                  <span style="color: #7FAD39">${{calculateTotal}}</span>
                </div>
              </div>

              <div class="d-flex flex-column">
                <div v-if="calculateCartTotal < 60" style="color: #de2b2b;font-size: 18px;font-weight: 900;margin-bottom: 6px;">Minimal cart total is 60$</div>
                <v-btn color="#7FAD39" class="white--text" block depressed :disabled="calculateCartTotal < 60" to="/shop/cart/checkout">Checkout</v-btn>
              </div>

              <div class="table__bottom-delivery">
                <nuxt-link to="/delivery" target="_blank">Delivery information</nuxt-link>
              </div>
            </div>
          </div>

        </div>
        <div v-else class="empty">
          <div>Your cart is empty</div>
          <nuxt-link to="/shop">Continue shopping</nuxt-link>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
    'CheckOutForm': () => import('@/components/shop/CheckOutForm')
  },
  data: () => ({
    loading: true
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
    await this.$store.dispatch('shop/setMixsCart');
    await this.$store.dispatch('shop/getMixProducts');
    await this.$store.dispatch('shop/getCartProducts').then(() => this.loading = false);
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
    border-bottom: 1px solid #ebebeb;
    font-weight: 900;
    font-size: 18px;

    @media(max-width: 768px) {
      font-size: 14px;

      .col-6 {
        width: 45%;
        max-width: 45%;
      }
    }
  }

  &__item {
    border-bottom: 1px solid #ebebeb;
    position: relative;

    .col {
      min-height: 110px;
      display: flex;
      align-items: center;

      @media(max-width: 768px) {
        height: auto;

        &.col-6 {
          width: 45%;
          max-width: 45%;
        }

        &:last-child {
          position: absolute;
          top: 0;
          right: 10px;
        }
      }
    }

    &-mix {

      .table__item {

        &-imgGroup {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          position: relative;
          width: 70px;
          margin-right: 20px;

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

    &-title {
      display: flex;
      align-items: center;

      @media(max-width: 768px) {
        flex-direction: column;
      }

      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }

      div {
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
      @media(max-width: 768px) {
        font-size: 14px;
      }
    }

    &-quantity {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      border: 1px solid #7FAD39;
      border-radius: 4px;
      width: 130px;

      @media(max-width: 768px) {
        flex-direction: column;
        padding: 5px;
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
        height: 28px !important;
        width: 28px !important;
        min-width: 28px !important;
        border-radius: 0 !important;
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 50px;

    @media(max-width: 768px) {
      flex-direction: column;
    }

    &-continue {
      @media(max-width: 768px) {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      a {
        color: #6f6f6f;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 14px;
      }
    }

    &-checkout {
      display: flex;
      flex-direction: column;
      width: 445px;

      @media(max-width: 768px) {
        width: auto;
      }

      div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        span:last-child {
          color: #dd2222;

          @media(max-width: 768px) {
            margin-left: 30px;
          }
        }
      }

      span {
        font-weight: 900;
        font-size: 18px;
      }
    }

    &-delivery {
      font-size: 14px;
      font-weight: 900;
      text-decoration: underline;
      margin-top: 10px;

      @media(max-width: 768px) {
        display: flex;
        justify-content: center !important;
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
