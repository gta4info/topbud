<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <v-container>
      <div class="product">
        <div class="product__images">
          <div class="product__images-list">
            <img :src="product.img" :alt="product.name" @click="mainImage = product.img" v-ripple :class="{active: mainImage === product.img}">
          </div>
          <img class="product__images-main" :src="mainImage" :alt="product.name">
        </div>
        <div class="product__right">
          <div class="product__title">{{ product.name }}</div>
          <div class="product__category">
            {{ category.name }}
            <template v-if="sub"> / {{ sub.name }}</template>
          </div>

          <div class="product__quality" v-if="product.cbd || product.thc">
            <div class="product__quality-item" v-if="product.thc">
              <div>
                <div class="product__quality-item--title">THC</div>
                <div class="product__quality-item--indicator thc">
                  <div :style="{width: calculateIndicatorWidthThc}"></div>
                </div>
              </div>
              <div>{{product.thc}}</div>
            </div>
            <div class="product__quality-item" v-if="product.cbd">
              <div>
                <div class="product__quality-item--title">CBD</div>
                <div class="product__quality-item--indicator cbd">
                  <div :style="{width: calculateIndicatorWidthCbd}"></div>
                </div>
              </div>
              <div>{{product.cbd}}</div>
            </div>
          </div>

          <div class="product__subtitle">Size</div>
          <div class="product__weights">
            <div
              class="product__weight"
              :class="{active: selectedWeight === price.weight_id}"
              v-for="(price, i) in product.prices"
              :key="i"
              @click="selectedWeight = price.weight_id"
            >
              <div class="product__weight-btn">{{weights[price.weight_id]}}</div>
              <div class="product__weight-price">${{price.deal_price ? price.deal_price : price.price}}</div>
              <div class="product__weight-old" v-if="price.deal_price">${{price.price}}</div>
            </div>
          </div>
          <div class="product__subtitle">Amount</div>
          <div class="product__amount">
            <v-btn depressed @click="selectedAmount -= 1">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <div>{{selectedAmount}}</div>
            <v-btn depressed @click="selectedAmount += 1">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div class="product__purchase-wrapper">
            <v-btn class="product__purchase" @click="addToCart" depressed>Add to cart (${{calculateSum}})</v-btn>
          </div>
        </div>
      </div>
      <div class="information">
        <div class="information__head">
          <div
            v-for="tab in tabs"
            :key="tab"
            @click="selectedTab = tab"
            :class="{'active': selectedTab === tab}"
            class="information__tab"
          >
            {{tab}}
          </div>
        </div>

        <div class="information__content">
          <div :class="{'active': selectedTab === 'About This Product'}" v-html="product.description"></div>
<!--          <div :class="{'active': selectedTab === 'Reviews'}">Reviews</div>-->
        </div>
      </div>

      <div class="related" v-if="false">
        <h4 class="related__title">Related products</h4>
        <v-container>
          <v-row v-if="related.length">
            <v-col sm="12" md="3" v-for="product in related" :key="product.id">
              <nuxt-link :to="{name: 'category-cslug-pslug', params: {cslug: product.cslug, pslug: product.pslug}}" class="relatedCard">
                <div class="relatedCard__header">
                  <img :src="require(`@/assets/images/${product.image}`)" :alt="product.title">
                  <div class="relatedCard__header-hidden">
                    <v-btn icon @click="addToWishList">
                      <v-icon size="20">mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon @click="addToCart">
                      <v-icon size="20">mdi-cart</v-icon>
                    </v-btn>
                  </div>
                </div>
                <h5 class="relatedCard__title">{{product.title}}</h5>
                <div class="relatedCard__price">${{product.price}}</div>
              </nuxt-link>
            </v-col>
          </v-row>
          <p v-else class="text-center">No related products was found</p>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head() {
    return {
      title: `Weed delivery 🚬 ${this.product.name} in Toronto, best prices`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `TOPBUD store offer to you a ${this.product.name} weeds in Toronto ✔ Best prices ✔ Weed delivery`
        }
      ]
    }
  },
  async asyncData({$axios, params, store, error}) {
    let category = store.state.shop.categories.find(item => item.slug === params.cslug);

    if(category == undefined) {
      return error({ statusCode: 404 })
    }

    let sub = category.subs.length ? category.subs.find(item => item.slug === params.sslug) : null;

    let url = `/product/${params.pslug}?cid=${category.id}`;
    if(params.sslug !== 'product') {
      url += `&sid=${sub.id}`;
    }

    const product = await $axios.$get(url);

    if(!product) {
      return error({ statusCode: 404 })
    }

    product.img = `https://topbudstore.com/${product.img}`;
    let mainImage = product.img;
    let selectedWeight = product.prices[0].weight_id;

    let breadcrumbs;

    if(sub) {
      breadcrumbs = [
        {
          link: '/',
          title: 'home'
        },
        {
          link: '/shop',
          title: 'categories'
        },
        {
          link: `/category/${category.slug}`,
          title: category.name.toLowerCase()
        },
        {
          link: `/category/${category.slug}/${sub.slug}`,
          title: sub.name.toLowerCase()
        },
        {
          link: null,
          title: product.name
        },
      ]
    } else {
      breadcrumbs = [
        {
          link: '/',
          title: 'home'
        },
        {
          link: '/shop',
          title: 'categories'
        },
        {
          link: `/category/${category.slug}`,
          title: category.name.toLowerCase()
        },
        {
          link: null,
          title: product.name
        },
      ]
    }

    product.thc = product.thc.replace(/[THC:]/g, '').replace(/ /g, '')
    product.cbd = product.cbd.replace(/[CDB:]/g, '').replace(/ /g, '')

    return { selectedWeight, product, category, sub, mainImage, breadcrumbs }
  },
  data: () => ({
    related: [],
    tabs: ['About This Product'],
    selectedTab: 'About This Product',
    selectedEmotion: null,
    selectedWeight: null,
    selectedAmount: 1,
    minAmount: 1,
    maxAmount: 9999
  }),
  watch: {
    selectedAmount() {
      this.checkSelectedAmount();
    },
  },
  methods: {
    checkSelectedAmount() {
      if(this.selectedAmount > this.maxAmount) {
        this.selectedAmount = this.maxAmount;
      }
      if(this.selectedAmount < this.minAmount) {
        this.selectedAmount = this.minAmount;
      }
    },
    addToCart() {
      let cart = [];
      if(this.$cookies.get('cart')) {
        cart = this.$cookies.get('cart');
      }

      let obj = {
        product_id: this.product.prices.find(item => item.weight_id === this.selectedWeight).id,
        weight: this.selectedWeight,
        amount: this.selectedAmount,
      };

      let sameProductExists = cart.find(item => item.product_id === obj.product_id && item.weight === obj.weight);

      if(!sameProductExists) {
        cart.push(obj);
      } else {
        sameProductExists.amount = this.selectedAmount;
      }

      this.$cookies.set('cart', cart);

      this.$store.commit('shop/SET_CART_LENGTH');

      // this.$root.$emit('show-product-added-to-cart-dialog');
      this.$toast.success('Product was added to cart!', {duration: 1500})
    },
    addToWishList() {
      alert('Added to wishlist!')
    },
    sendEmotion(value) {
      alert(value + ' emotion sent!')
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories',
      weights: 'shop/weights',
    }),
    calculateSum() {
      let weight = this.product.prices.find(item => item.weight_id === this.selectedWeight);
      let optionPrice = weight.deal_price ? weight.deal_price : weight.price;
      return optionPrice * this.selectedAmount;
    },
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
    }
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
  }
}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;

    @media(max-width: 768px) {
      flex-direction: column;
    }

    &__images {
      display: flex;
      flex-shrink: 0;
      margin-right: 40px;

      @media(max-width: 768px) {
        margin-right: 0;
        justify-content: center;
        margin-bottom: 30px;
      }

      &-list {
        display: flex;
        flex-direction: column;

        @media(max-width: 768px) {
          display: none;
        }

        img {
          width: 66px;
          height: 66px;
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid #E6E6E6;
          cursor: pointer;

          &:not(:last-of-type) {
            margin-bottom: 17px;
          }

          &.active {
            border-color: #008DE3;
            cursor: default;
          }
        }
      }

      &-main {
        width: 370px;
        height: 370px;
        margin-left: 20px;
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid #E6E6E6;

        @media(max-width: 768px) {
          max-width: 100%;
          width: auto;
          height: auto;
          margin-left: 0;
          max-height: 260px;
        }
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-size: 36px;
      font-weight: 700;
      color: #333333;
      margin-bottom: 5px;

      @media(max-width: 768px) {
        font-size: 24px;
        text-align: center;
      }
    }

    &__category {
      font-size: 24px;
      font-weight: 700;
      color: #D1D1D1;
      margin-bottom: 32px;

      @media(max-width: 768px) {
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
      }
    }

    &__quality {
      margin: 6px 0 30px;
      display: flex;

      @media(max-width: 768px) {
        margin: 0 0 20px;
      }

      &-item {
        display: flex;

        &:not(:last-of-type) {
          margin-right: 54px;
        }

        > div:first-of-type {
          display: flex;
          flex-direction: column;
        }

        > div:last-of-type {
          font-size: 20px;
          font-weight: 700;
          color: #008DE3;
          margin-left: 10px;
        }

        &--title {
          letter-spacing: 0.26em;
          color: #333333;
          font-weight: 700;
          font-size: 20px;
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

    &__weights {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    &__weight {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:not(:last-of-type) {
        margin-right: 20px;
      }

      &.active {

        .product__weight-btn {
          background: #21AA5B;
          color: #ffffff;
        }
      }

      &-btn {
        background: #E9E9E9;
        height: 35px;
        border-radius: 25px;
        font-weight: 700;
        font-size: 14px;
        color: #333333;
        padding: 0 20px;
        transition: .3s;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      &-price {
        font-weight: 500;
        font-size: 18px;
        color: #21aa5b;
      }

      &-old {
        font-weight: 700;
        font-size: 12px;
        color: #B1B1B1;
        position: relative;
        display: flex;
        align-items: center;
        line-height: 1;

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background: #ff4b55;
        }
      }
    }

    &__subtitle {
      font-size: 20px;
      font-weight: 900;
    }

    &__amount {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      margin-top: 20px;
      border: 1px solid #21AA5B;
      align-self: flex-start;
      border-radius: 4px;
      width: 170px;

      @media(max-width: 768px) {
        width: 100%;
      }

      div {
        flex-grow: 1;
        text-align: center;
        font-size: 18px;
        font-weight: 900;
      }

      .v-btn {
        height: 28px !important;
        width: 28px !important;
        min-width: 28px !important;
        border-radius: 0 !important;
      }
    }

    &__purchase {
      height: 56px !important;
      width: 330px;
      background: #21AA5B !important;
      color: #fff;

      @media(max-width: 768px) {
        font-weight: 700;
        width: 100%;
        font-size: 18px;
      }

      &-wrapper {
        margin-top: 30px;
        display: flex;
        align-items: center;
      }
    }

    &__emotions {
      display: flex;
      margin-top: 20px;

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;

        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }

  .information {

    &__head {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
    }

    &__tab {
      font-weight: 900;
      color: #999;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;

      //&:first-child {
        &:before {
          content: '';
          position: absolute;
          right: calc(100% + 20px);
          height: 1px;
          width: 400px;
          background: #cecece;

          @media(max-width: 768px) {
            display: none;
          }
        }
      //}

      //&:last-child {
        &:after {
          content: '';
          position: absolute;
          left: calc(100% + 20px);
          height: 1px;
          width: 400px;
          background: #cecece;

          @media(max-width: 768px) {
            display: none;
          }
        }
      //}

      &:not(:last-child) {
        margin-right: 40px;
      }

      &.active {
        color: #000;
        cursor: default;
      }
    }

    &__content {

      div {
        display: none;

        &.active {
          display: block;
        }
      }
    }
  }

  .related {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    &__title {
      align-self: center;
      font-size: 32px;
      font-weight: 900;
      margin-bottom: 40px;
      padding-bottom: 12px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        width: 80px;
        background: #7fad39;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .relatedCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;

    &__header {
      position: relative;
      width: 270px;
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(#000, .2);
        opacity: 0;
        transition: .3s;
      }

      &:hover {
        &:before {
          opacity: 1;
        }

        .relatedCard__header-hidden {
          top: 0;
        }
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }

      &-hidden {
        position: absolute;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 20px;
        width: 100%;
        height: 100%;
        top: 100%;
        transition: .3s;
        z-index: 1;

        .v-btn {
          background: #fff !important;
          border: 1px solid #999;
          transition: .3s !important;

          &:not(:last-child) {
            margin-right: 10px;
          }

          &:hover {
            background: #7FAD39 !important;
            color: #fff !important;

            .v-icon {
              transform: rotate(360deg);
              color: #fff;
            }
          }
        }
      }
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    &__price {
      font-size: 20px;
      font-weight: 900;
    }
  }
</style>
