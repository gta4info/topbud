<template>
  <div>
<!--    <TopBar />-->
    <v-container>
      <nav class="breadcrumbs">
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/shop">Shop</nuxt-link></li>
          <li><nuxt-link :to="{name: 'category-cslug', params: {cslug: $route.params.cslug}}">{{ $route.params.cslug}}</nuxt-link></li>
          <li>{{ $route.params.pslug}}</li>
        </ul>
      </nav>
      <div class="product">
        <div class="product__left">
          <img src="@/assets/images/1.webp" alt="">
        </div>
        <div class="product__right">
          <h1>{{ $route.params.pslug}}</h1>
          <div class="product__subtitle">Choose size</div>
          <v-radio-group v-model="selectedOption">
            <v-radio :value="option.value" v-for="(option, i) in options" :key="i">
              <template v-slot:label>
                <div class="d-flex">
                  <span style="font-weight: 500;">{{option.title}}</span>
                  <span class="green--text ml-3" style="font-weight: 900;">(${{option.price}})</span>
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
            <v-btn icon @click="addToWishList">
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </div>
          <div class="product__emotions">
            <button @click="sendEmotion('relaxed')">
              <v-icon size="46" color="#2173B3">mdi-emoticon-wink-outline</v-icon>
              Relaxed
            </button>
            <button @click="sendEmotion('happy')">
              <v-icon size="46" color="#F5AB24">mdi-emoticon-happy-outline</v-icon>
              Happy
            </button>
            <button @click="sendEmotion('euphoric')">
              <v-icon size="46" color="#F69058">mdi-emoticon-cool-outline</v-icon>
              Euphoric
            </button>
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
          <div :class="{'active': selectedTab === 'Product information'}">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum labore maxime perspiciatis provident velit! Aliquam eligendi fugit nemo tempore voluptatum!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nulla tenetur totam. Asperiores, ea, praesentium.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid asperiores aspernatur cumque dicta doloremque eligendi enim ex excepturi facere, inventore ipsa ipsum iste modi nam nobis non nostrum odio officiis omnis quidem quisquam quod, repellat reprehenderit sed velit voluptate.</p>
          </div>
          <div :class="{'active': selectedTab === 'Reviews'}">
            Reviews
          </div>
        </div>
      </div>

      <div class="related">
        <h4 class="related__title">Related products</h4>
        <v-container>
          <v-row>
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
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    'TopBar': () => import('@/components/shop/TopBar')
  },
  data: () => ({
    related: [
      {
        image: 'related-1.jpg',
        title: 'Crab Pool Security',
        price: 30,
        id: 1,
        cslug: 'flower',
        pslug: 'crab_pool_security_1'
      },
      {
        image: 'related-2.jpg',
        title: 'Crab Pool Security 2',
        price: 40,
        id: 2,
        cslug: 'flower',
        pslug: 'crab_pool_security_2'
      },
      {
        image: 'related-3.jpg',
        title: 'Crab Pool Security 3',
        price: 50,
        id: 3,
        cslug: 'flower',
        pslug: 'crab_pool_security_3'
      },
      {
        image: 'related-4.jpg',
        title: 'Crab Pool Security 4',
        price: 60,
        id: 4,
        cslug: 'flower',
        pslug: 'crab_pool_security_4'
      }
    ],
    tabs: ['Product information', 'Reviews'],
    selectedTab: 'Product information',
    selectedEmotion: null,
    selectedOption: 1,
    selectedAmount: 1,
    minAmount: 1,
    maxAmount: 9999,
    options: [
      {
        value: 1,
        title: '1 oz 28g',
        price: 100
      },
      {
        value: 2,
        title: '2 oz 56g',
        price: 190
      },
      {
        value: 3,
        title: '5 oz 140g',
        price: 450
      }
    ]
  }),
  watch: {
    selectedAmount() {
      this.checkSelectedAmount();
    }
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
    async addToCart() {
      await this.$store.dispatch('shop/addToCart', {
        title: this.$route.params.pslug
      })

      alert('Added to cart!');
    },
    addToWishList() {
      alert('Added to wishlist!')
    },
    sendEmotion(value) {
      alert(value + ' emotion sent!')
    }
  },
  computed: {
    calculateSum() {
      let optionPrice = this.options.find(item => item.value === this.selectedOption).price;
      return optionPrice * this.selectedAmount;
    }
  }
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

    &__left {
      margin-right: 60px;

      img {
        max-width: 300px;
        height: auto;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;

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
      margin-right: 15px;

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

      &:first-child {
        &:before {
          content: '';
          position: absolute;
          right: calc(100% + 20px);
          height: 1px;
          width: 400px;
          background: #cecece;
        }
      }

      &:last-child {
        &:before {
          content: '';
          position: absolute;
          left: calc(100% + 20px);
          height: 1px;
          width: 400px;
          background: #cecece;
        }
      }

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
