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
      <v-container class="breadcrumbs-wrapper">
        <nav class="breadcrumbs">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
            <li><nuxt-link :to="{name: 'category-cslug', params: {cslug: $route.params.cslug}}">{{ category.name }}</nuxt-link></li>
            <li v-if="sub && Object.keys(sub).length"><nuxt-link :to="{name: 'category-cslug-sslug', params: {cslug: $route.params.cslug, sslug: $route.params.sslug}}">{{ sub.name }}</nuxt-link></li>
            <li>{{ product.name }}</li>
          </ul>
        </nav>
        <div class="product">

          <div class="cardMobile__row" v-if="$vuetify.breakpoint.smAndDown">
            <div class="cardMobile__content">
              <div class="card__title cardMobile__title">{{product.name}}</div>
              <div class="cardMobile__text">
                <span v-if="product.cbd">CBD: {{product.cbd.replace('CBD:', '')}}</span>
                <span v-if="product.thc">THC: {{product.thc.replace('THC:', '')}}</span>
              </div>
              <div class="cardMobile__text" style="font-weight: 700; margin-top: 6px;" v-if="product.prices.length > 1">
                From ${{product.prices[0].price}} - To ${{product.prices[product.prices.length-1].price}}
              </div>
              <div class="cardMobile__text" style="font-weight: 700; margin-top: 6px;" v-else>
                ${{product.prices[0].price}}
              </div>
            </div>
            <div class="cardMobile__img">
              <img :src="product.img" :alt="product.name">
            </div>
          </div>

          <div class="product__left">
            <img :src="product.img" :alt="product.name">
          </div>
          <div class="product__right">
            <h1>{{ product.name }}</h1>
            <div class="product__subtitle">Choose weight</div>
            <v-radio-group v-model="selectedWeight">
              <v-radio :value="option.weight_id" v-for="(option, i) in product.prices" :key="i">
                <template v-slot:label>
                  <div class="d-flex">
                    <span style="font-weight: 500;">{{weights[option.weight_id]}}</span>
                    <template v-if="option.deal_price">
                      <span class="ml-3" style="font-weight: 900;text-decoration: line-through">(${{option.price}}</span>
                      <span class="green--text ml-2" style="font-weight: 900;">${{option.deal_price}})</span>
                    </template>
                    <span class="green--text ml-3" style="font-weight: 900;" v-else>(${{option.price}})</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
            <div class="product__subtitle">Select amount</div>
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
<!--              <v-btn icon @click="addToWishList">-->
<!--                <v-icon>mdi-heart-outline</v-icon>-->
<!--              </v-btn>-->
            </div>
<!--            <div class="product__emotions">-->
<!--              <button @click="sendEmotion('relaxed')">-->
<!--                <v-icon size="46" color="#2173B3">mdi-emoticon-wink-outline</v-icon>-->
<!--                Relaxed-->
<!--              </button>-->
<!--              <button @click="sendEmotion('happy')">-->
<!--                <v-icon size="46" color="#F5AB24">mdi-emoticon-happy-outline</v-icon>-->
<!--                Happy-->
<!--              </button>-->
<!--              <button @click="sendEmotion('euphoric')">-->
<!--                <v-icon size="46" color="#F69058">mdi-emoticon-cool-outline</v-icon>-->
<!--                Euphoric-->
<!--              </button>-->
<!--            </div>-->
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
            <div :class="{'active': selectedTab === 'Product information'}" v-html="product.description"></div>
<!--            <div :class="{'active': selectedTab === 'Reviews'}">-->
<!--              Reviews-->
<!--            </div>-->
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
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head() {
    return {
      title: `Weed delivery 🚬 ${this.product.name} in Toronto, best prices — TOPBUD store`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `TOPBUD store offer to you a ${this.product.name} weeds in Toronto ✔ Best prices ✔ Weed delivery`
        }
      ]
    }
  },
  components: {
    'TopBar': () => import('@/components/shop/TopBar')
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
    let selectedWeight = product.prices[0].weight_id;
    let loading = false;

    return { selectedWeight, product, loading, category, sub }
  },
  data: () => ({
    related: [],
    tabs: ['Product information'],
    selectedTab: 'Product information',
    selectedEmotion: null,
    selectedWeight: null,
    selectedAmount: 1,
    minAmount: 1,
    maxAmount: 9999,
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
    }
  },
}
</script>

<style lang="scss" scoped>
  .product {
    display: flex;
    align-items: center;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;

    @media(max-width: 768px) {
      flex-direction: column;
    }

    &__left {
      margin-right: 60px;
      border: 1px solid #CECECE;
      border-radius: 8px;
      width: 300px;
      height: 300px;
      @media(max-width: 768px) {
        display: none;
      }

      img {
        max-width: 300px;
        height: auto;
        border-radius: 8px;
        @media(max-width: 768px) {
          margin-bottom: 30px;
        }
      }
    }

    &__right {
      display: flex;
      flex-direction: column;

      @media(max-width: 768px) {
        align-items: center;
      }

      h1 {
        margin-bottom: 40px;
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
      border: 1px solid #7FAD39;
      align-self: flex-start;
      border-radius: 4px;
      width: 170px;
      @media(max-width: 768px) {
        align-self: center;
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
      height: 50px !important;
      background: #7FAD39 !important;
      color: #fff;

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

  .cardMobile {
    &__row {
      display: flex;
      width: 100%;
      margin: 15px 0;
      align-items: center;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    &__img {
      width: 75px;
      height: 75px;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__title {
      justify-content: flex-start;
      text-align: left;
      width: 100%;
      font-weight: 700;
    }

    &__text {
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;

      span {

        &:not(:last-of-type) {
          position: relative;
          padding-right: 3px;
          margin-right: 3px;
          display: flex;

          &:before {
            content: ',';
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
</style>
