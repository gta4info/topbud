<template>
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
    <div class="table" v-if="cart.length">
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
        <v-container class="table__list">
          <v-row v-for="product in cart" :key="product.id" class="table__item">
            <v-col cols="6">
              <div class="table__item-title">
                <img :src="require(`@/assets/images/${product.image}`)" :alt="product.title">
                <div class="table__item-title">{{ product.title }} <span>{{ product.weight }}</span></div>
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
              <v-btn icon>
                <v-icon small @click="$store.commit('shop/DELETE_PRODUCT_IN_CART', product.id)">mdi-close</v-icon>
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
            <span>${{calculateCartTotal}}</span>
          </div>
          <v-btn color="#7FAD39" class="white--text" block depressed @click="checkout">Checkout</v-btn>
        </div>
      </div>

    </div>
    <div v-else class="empty">
      <div>Your cart is empty</div>
      <nuxt-link to="/shop">Continue shopping</nuxt-link>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cart: 'shop/cart'
    }),
    calculateCartTotal() {
      let total = 0;
      this.cart.map(item => {
        total += item.quantity * item.price;
      })

      return total;
    }
  },
  methods: {
    checkout() {
      alert('Checkout!')
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;

  &__header {
    border-bottom: 1px solid #ebebeb;
    font-weight: 900;
    font-size: 18px;
  }

  &__item {
    border-bottom: 1px solid #ebebeb;

    .col {
      height: 110px;
      display: flex;
      align-items: center;
    }

    &-title {
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }

      div {
        font-size: 16px;

        span {
          margin-left: 10px;
          color: #cecece;
        }
      }
    }

    &-price {
      font-weight: 900;
      font-size: 18px;
    }

    &-total {
      font-weight: 900;
      font-size: 18px;
    }

    &-quantity {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      border: 1px solid #7FAD39;
      border-radius: 4px;
      width: 130px;

      div {
        flex-grow: 1;
        text-align: center;
        font-size: 16px;
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

    &-continue {
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

      div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        span:last-child {
          color: #dd2222;
        }
      }

      span {
        font-weight: 900;
        font-size: 18px;
      }
    }
  }
}

.breadcrumbs {
  display: flex;
  justify-content: center;
  margin: 10px 0 50px;

  ul {
    display: flex;

    li {
      font-size: 16px;
      display: flex;
      align-items: center;
      letter-spacing: 0.5px;

      &:last-child {
        color: #7FAD39;
      }

      &:not(:last-child) {
        padding-right: 15px;
        margin-right: 10px;
        position: relative;

        &:before {
          content: '›';
          position: absolute;
          right: 0;
          font-size: 22px;
          height: 100%;
          line-height: 1;
        }
      }

      a {
        color: #000;
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
