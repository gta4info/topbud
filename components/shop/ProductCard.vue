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
      <div class="card__header-deal" v-if="product.deal"><span>Deal</span></div>
      <div class="card__header-badges">
        <div class="card__header-badge cbd" v-if="product.cbd">CBD: {{product.cbd}}</div>
        <div class="card__header-badge thc" v-if="product.thc">THC: {{product.thc}}</div>
      </div>
      <div class="img">
        <img :src="product.img" :alt="product.name">
      </div>
    </nuxt-link>
    <div class="card__bottom">
      <nuxt-link
        :to="{name: 'category-cslug-sslug-pslug', params: {
          cslug: $route.params.cslug ? $route.params.cslug : product.search.cslug,
          sslug: $route.params.sslug ? $route.params.sslug : (product.search ? (product.search.sslug ? product.search.sslug : 'product') :'product'),
          pslug: product.slug
        }}"
        class="card__title"
      >
        {{product.name}}
      </nuxt-link>
      <v-menu v-model="menu" content-class="card__weights" offset-y close-on-content-click>
        <template v-slot:activator="{on}">
          <div v-on="on" class="card__weights-input" :class="{active: menu}">
            <template>
              <span class="card__weights-input--weight">{{ weights[selectedWeight] }}</span>
              <div v-if="product.prices.find(item => item.weight_id === selectedWeight)">
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
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      weights: 'shop/weights'
    }),
  },
  data() {
    return {
      selectedQuantity: 1,
      selectedWeight: this.product.prices[0].weight_id,
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

      this.$root.$emit('show-product-added-to-cart-dialog');
    },
  },
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
    position: relative;
    height: 100%;

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      transition: .3s;
      color: #000;
      border-bottom: 1px solid #E9E9E9;

      .img {
        overflow: hidden;
        height: 100%;
        width: 100%;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: auto;
          transition: .3s;
        }
      }

      &:hover {
        .img {
          img {
            transform: scale(1.2);
          }
        }
      }

      &-deal {
        position: absolute;
        right: -3px;
        top: -3px;
        z-index: 1;
        overflow: hidden;
        width: 93px;
        height: 93px;
        text-align: right;

        span {
          background: linear-gradient(#f70505 0%, #8f0808 100%);
          font-size: 1.1rem;
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          font-weight: bold;
          line-height: 32px;
          transform: rotate(45deg);
          min-width: 125px;
          width: 100%;
          letter-spacing: 5px;
          display: block;
          position: absolute;
          top: 17px;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 100%;
            z-index: -1;
            border-left: 3px solid #8f0808;
            border-right: 3px solid transparent;
            border-bottom: 3px solid transparent;
            border-top: 3px solid #8f0808;
          }

          &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 100%;
            z-index: -1;
            border-right: 3px solid #8f0808;
            border-left: 3px solid transparent;
            border-bottom: 3px solid transparent;
            border-top: 3px solid #8f0808;
          }
        }
      }

      &-badges {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 18px;
        left: -5px;
      }

      &-badge {
        clip-path: polygon(100% 0%, calc(100% - 0.75rem) 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
        color: #fff;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        font-size: 12px;
        letter-spacing: 0.03rem;
        padding: 0.3rem 1rem 0.3rem 0.3rem;
        text-shadow: 1px 1px 2px rgb(150 150 150 / 50%);
        white-space: nowrap;
        z-index: 1;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &.thc {
          background: hsl(24, 100%, 50%);
        }
        &.cbd {
          background: hsl(101, 93%, 28%);
        }
      }
    }

    &__title {
      font-weight: 900;
      font-size: 16px;
      width: 100%;
      text-align: center;
      margin: 10px 0;
      display: flex;
      justify-content: center;
      color: #000;
    }

    &__bottom {
      padding: 0 15px 15px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

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
        margin-top: auto;

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
            background: #ccc;
            color: #fff;
          }
        }
      }
    }
  }
</style>
