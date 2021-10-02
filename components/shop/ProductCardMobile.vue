<template>
  <nuxt-link
    class="card"
    :to="{name: 'category-cslug-sslug-pslug', params: {
      cslug: $route.params.cslug ? $route.params.cslug : product.search.cslug,
      sslug: $route.params.sslug ? $route.params.sslug : (product.search ? (product.search.sslug ? product.search.sslug : 'product') :'product'),
      pslug: product.slug
    }}"
  >
    <div class="card__content">
      <div class="card__category" v-if="categories.find(c => c.id === product.category_id).subs.length">
        {{categories.find(c => c.id === product.category_id).subs.find(s => s.id === product.subcategory_id).name}}
      </div>
      <div class="card__category" v-else>{{categories.find(c => c.id === product.category_id).name}}</div>
      <div class="card__title">{{product.name}}</div>
      <div class="card__quality" v-if="product.cbd || product.thc">
        <div class="card__quality-item" v-if="product.thc">
          <div>
            <div class="card__quality-item--title">THC</div>
            <div class="card__quality-item--indicator thc">
              <div :style="{width: calculateIndicatorWidthThc}"></div>
            </div>
          </div>
          <div>{{product.thc}}</div>
        </div>
        <div class="card__quality-item" v-if="product.cbd">
          <div>
            <div class="card__quality-item--title">CBD</div>
            <div class="card__quality-item--indicator cbd">
              <div :style="{width: calculateIndicatorWidthCbd}"></div>
            </div>
          </div>
          <div>{{product.cbd}}</div>
        </div>
      </div>
      <div class="d-flex">
        <v-btn @click.prevent="addToCart" class="card__addToCart" :disabled="isInCart || disabledToAdd[selectedWeight]" depressed>
          <v-icon color="#fff" size="20">mdi-cart-outline</v-icon>
        </v-btn>
        <div class="card__price" v-if="product.prices.find(item => item.weight_id === selectedWeight)">
          <span class="card__price-old" v-if="product.prices.find(item => item.weight_id === selectedWeight).deal_price">${{ product.prices.find(item => item.weight_id === selectedWeight).price }}</span>
          <span class="card__price-price">${{ product.prices.find(item => item.weight_id === selectedWeight).deal_price ? product.prices.find(item => item.weight_id === selectedWeight).deal_price : product.prices.find(item => item.weight_id === selectedWeight).price }}</span>
          <span class="card__price-weight">/ {{ weights[selectedWeight] }}</span>
        </div>
      </div>
    </div>
    <div class="card__header">
      <div class="img" ref="images">
        <img :src="product.img" :alt="product.name" ref="image">
      </div>
    </div>
    <div class="card__header-badges">
      <div class="card__header-badge new" v-if="product.new">New</div>
      <div class="card__header-badge deal" v-if="product.deal">Sale</div>
    </div>
  </nuxt-link>
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
      weights: 'shop/weights',
      categories: 'shop/categories',
      cart: 'shop/cart'
    }),
    calculateIndicatorWidthThc() {
      let data = this.product.thc.split('-').map(item => {
        item = item.trim();
        return item;
      });

      return parseInt(data[data.length - 1]) + '%'
    },
    calculateIndicatorWidthCbd() {
      let data = this.product.cbd.split('-').map(item => {
        item = item.trim();
        return item;
      });

      return parseInt(data[data.length - 1]) + '%'
    },
    isInCart() {
      return this.cart.find(item => item.id === this.product.prices.find(p => p.weight_id === this.selectedWeight).id);
    }
  },
  data() {
    return {
      selectedQuantity: 1,
      selectedWeight: this.product.prices[0].weight_id,
      menu: false,
      disabledToAdd: {}
    }
  },
  watch: {
    product: {
      handler() {
        this.selectedWeight = this.product.prices[0].weight_id;
        this.product.prices.map(item => {
          this.disabledToAdd[item.weight_id] = !!this.cart.find(item => item.id === this.product.prices.find(p => p.weight_id === this.selectedWeight).id);
        })
      },
      deep: true
    }
  },
  methods: {
    addToCart(event) {
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

      this.$set(this.disabledToAdd, this.selectedWeight, true);

      this.$toast.success('Product was added to cart!', {duration: 1500})
    },
  },
  created () {
    this.product.thc = this.product.thc.replace(/[THC:]/g, '').replace(/ /g, '')
    this.product.cbd = this.product.cbd.replace(/[CDB:]/g, '').replace(/ /g, '')
  },
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    color: #000;
    border-top: 1px solid #D2D2D2;
    position: relative;
    padding: 10px 0;

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    &__category {
      color: #d1d1d1;
      font-size: 10px;
      font-weight: 700;
    }

    &__quality {
      margin-top: -6px;
      margin-bottom: 13px;
      display: flex;

      &-item {
        display: flex;

        &:not(:last-of-type) {
          margin-right: 32px;
        }

        > div:first-of-type {
          display: flex;
          flex-direction: column;
        }

        > div:last-of-type {
          font-size: 12px;
          font-weight: 500;
          color: #333333;
          margin-left: 4px;
        }

        &--title {
          letter-spacing: 0.26em;
          color: #333;
          font-weight: 700;
          font-size: 12px;
          margin-bottom: 4px;
        }

        &--indicator {
          height: 3px;
          width: 38px;
          position: relative;
          background-image: url('~/static/images/indicator-empty.png');

          div {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          &.thc {

            div {
              background-image: url('~/static/images/indicator-thc.png');
            }
          }

          &.cbd {

            div {
              background-image: url('~/static/images/indicator-cbd.png');
            }
          }
        }
      }
    }

    &__price {
      display: flex;
      font-weight: 700;

      &-price {
        font-size: 16px;
        color: #21AA5B;
        position: relative;
        display: flex;
        align-items: center;
      }

      &-old {
        font-size: 16px;
        color: #B1B1B1;
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 10px;

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #FF4B55;
          z-index: 1;
        }
      }

      &-weight {
        font-size: 16px;
        color: #333333;
        line-height: 1;
        align-self: center;
        margin-left: 6px;
      }
    }

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      margin-right: 16px;

      .img {
        overflow: hidden;
        height: 60px;
        width: 60px;
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
        position: absolute;
        top: -1px;
        right: 20px;
      }

      &-badge {
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 12px;
        padding: 3px 12px;
        white-space: nowrap;
        z-index: 1;
        border-radius: 0 0 5px 5px;
        text-transform: uppercase;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &.deal {
          background: #FF4B55;
        }
        &.new {
          background: #21AA5B;
        }
      }
    }

    &__title {
      font-weight: 700;
      font-size: 14px;
      width: 100%;
      margin: 3px 0 8px;
      color: #333;
      line-height: 1.4;
      padding-right: 20px;
    }

    &__addToCart {
      width: 40px !important;
      height: 25px !important;
      min-width: 25px !important;
      background: #21AA5B !important;
      padding: 0 !important;
      border-radius: 5px !important;
      margin-right: 10px;

      &:disabled {
        background: #B8B8B8 !important;
      }
    }

    &__weights {
      border-radius: 0 0 4px 4px;
      border: 1px solid #e6e6e6;
      border-top: 0;

      &-input {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        height: 56px;
        border-top: 1px solid #e6e6e6;
        padding: 0 20px;
        cursor: pointer;
        position: relative;
        margin-top: auto;
        flex-shrink: 0;

        &:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-right: 2px solid #000;
          border-bottom: 2px solid #000;
          right: 20px;
          transform: rotate(45deg);
          transition: .3s;
          margin-top: -3px;
        }

        &.active {
          &:before {
            transform: rotate(225deg);
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
