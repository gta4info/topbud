<template>
  <div class="card">
    <nuxt-link
      :to="{name: 'category-cslug-sslug-pslug', params: {
        cslug: $route.params.cslug ? $route.params.cslug : product.search.cslug,
        sslug: $route.params.sslug ? $route.params.sslug : (product.search ? (product.search.sslug ? product.search.sslug : 'product') :'product'),
        pslug: product.slug
      }}"
      class="card__header"
    >
      <img :src="product.img" :alt="product.name">
      <div class="card__title">{{product.name}}</div>
    </nuxt-link>
    <div class="card__bottom">
      {{selectedWeight}}
      {{product.prices}}
      <v-menu v-model="menu" content-class="card__weights" offset-y close-on-content-click>
        <template v-slot:activator="{on}">
          <div v-on="on" class="card__weights-input" :class="{active: menu}">
            <template v-if="product.prices.find(item => item.weight_id === selectedWeight)">
              <span class="card__weights-input--weight">{{ weights[product.prices.find(item => item.weight_id === selectedWeight).weight_id] }}</span>
              <div>
                <span class="card__weights-input--oldPrice" v-if="product.prices.find(item => item.weight_id === selectedWeight).deal_price">${{ product.prices.find(item => item.weight_id === selectedWeight).price }}</span>
                <span class="card__weights-input--price">${{ product.prices.find(item => item.weight_id === selectedWeight).deal_price ? product.prices.find(item => item.weight_id === selectedWeight).deal_price : product.prices.find(item => item.weight_id === selectedWeight).price }}</span>
              </div>
            </template>
          </div>
        </template>
        <div class="card__weights-list">
          <div
            v-for="price in product.prices"
            @click="selectedWeight = price.weight_id"
            :class="{active: selectedWeight === price.weight_id}"
          >
            <span class="card__weights-input--weight">{{ weights[price.weight_id] }}</span>
            <div>
              <span class="card__weights-input--oldPrice" v-if="price.deal_price">${{ price.price }}</span>
              <span class="card__weights-input--price">${{ price.deal_price ? price.deal_price : price.price }}</span>
            </div>
          </div>
        </div>
      </v-menu>
      <div class="card__bottom-line">
        <input type="text" class="card__quantity" v-model="selectedQuantity"/>
        <button v-ripple @click="addToCart">
          <v-icon color="#fff">mdi-cart</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      weights: 'shop/weights'
    })
  },
  data() {
    return {
      selectedQuantity: 1,
      selectedWeight: this.product.selected_weight,
      menu: false
    }
  },
  methods: {
    addToCart() {
      let cart = [];
      if(this.$cookies.get('cart')) {
        cart = this.$cookies.get('cart');
      }

      let obj = {
        product_id: this.product.prices.find(item => item.weight_id === this.selectedWeight).id,
        weight: this.selectedWeight,
        amount: this.selectedQuantity,
      };

      let sameProductExists = cart.find(item => item.product_id === obj.product_id && item.weight === obj.weight);

      if(!sameProductExists) {
        cart.push(obj);
      } else {
        sameProductExists.amount = this.selectedQuantity;
      }

      this.$cookies.set('cart', cart);

      this.$store.commit('shop/SET_CART_LENGTH');
    },
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    border: 1px solid #E9E9E9;
    border-radius: 8px;
    padding: 15px;
    overflow: hidden;
    position: relative;

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 186px;
      width: 100%;
      transition: .3s;
      overflow: hidden;
      color: #000;

      &:hover {
        img {
          transform: scale(1.2);
        }
        .card__title {
          bottom: 25px;
        }
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        background: linear-gradient(180deg, transparent 0%, transparent 40%, #fff 100%);
      }

      img {
        max-width: 100%;
        max-height: 100%;
        transition: .3s;
      }
    }

    &__title {
      font-weight: 900;
      font-size: 16px;
      margin-top: 15px;
      transition: .3s;
      z-index: 1;
      bottom: 15px;
      position: absolute;
      width: calc(100% - 30px);
      text-align: center;
    }

    &__bottom {
      margin-top: 20px;
      width: 100%;

      &-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        input, button {
          height: 30px;
          border: 1px solid #AAAAAA;
          border-radius: 4px;
          outline: none;
        }

        input {
          padding: 0 12px;
          width: 80px;
          margin-right: 20px;
        }

        button {
          flex-grow: 1;
          background: #28A745;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    &__weights {
      border-radius: 0 0 4px 4px;
      box-shadow: none;
      border: 1px solid #AAAAAA;
      border-top: 0;

      &-input {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 14px;
        height: 30px;
        border: 1px solid #AAAAAA;
        padding: 4px 25px 4px 12px;
        border-radius: 4px;
        cursor: pointer;
        position: relative;

        &:before {
          content: '⯆';
          position: absolute;
          right: 6px;
          transition: .3s;
          color: #AAAAAA;
          font-size: 12px;
        }

        &.active {
          &:before {
            transform: rotate(180deg);
          }
        }

        &--weight {
          margin-right: auto;
        }

        &--oldPrice {
          text-decoration: line-through;
        }

        &--price {
          color: #28A745;
          font-weight: 900;
          margin-left: 4px;
        }
      }

      &-list {
        display: flex;
        flex-direction: column;
        background: #fff;
        z-index: 1;
        border-radius: 0;

        div {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 6px 12px;
          cursor: pointer;

          &.active {
            background: #5897FB;
            color: #fff;
          }
        }
      }
    }
  }
</style>
