<template>
  <div class="page">
    <v-container>
      <h1>Mix'N'Match</h1>
      <nav class="breadcrumbs">
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/shop">Shop</nuxt-link></li>
          <li><nuxt-link to="/shop/deals">OZ Deals</nuxt-link></li>
          <li>Mix'N'Match</li>
        </ul>
      </nav>

      <div class="pack">
        <v-container>
          <v-row class="d-flex flex-wrap">
            <v-col cols="12" sm="12" md="7">
              <div>
                <v-container class="pack__content">
                  <v-row class="md">
                    <Filters :min="min" :max="max" :range="[]" :search="search" inline/>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="pack__title">Choose products</div>
                    </v-col>
                  </v-row>
                  <v-row class="pack__products">
                    <v-col
                      md="4"
                      sm="12"
                      cols="6"
                      v-for="product in productsFiltered"
                      :key="product.id"
                    >
                      <PackProductCard :product="product" :key="product.id" :selectedWeight="selectedWeight" :selected="product.selected"/>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="5">
              <div class="pack__options-wrapper">

                <v-btn class="pack__optionsMobile-btn" depressed height="60" block color="#7FAD39" @click="showCombineOptions = true">Combine options</v-btn>

                <div class="pack__options" :class="{active: showCombineOptions}">
                  <div class="pack__options-content">
                    <div class="pack__options-group">
                      <v-btn icon class="pack__optionsMobile-close" @click="showCombineOptions = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <div class="pack__title">Combine options</div>
                      <div class="pack__options-weights">
                        <div class="pack__options-title">Choose weight</div>
                        <div class="pack__options-weights--items">
                          <div
                            class="pack__options-weights--item"
                            :class="{active: selectedWeight === 2}"
                            @click="selectedWeight = 2"
                          >
                            1 oz
                          </div>
                          <div
                            class="pack__options-weights--item"
                            :class="{active: selectedWeight === 4}"
                            @click="selectedWeight = 4"
                          >
                            1/2 oz
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pack__options-group">
                      <div class="pack__options-title">Fill slots with products</div>
                      <div class="pack__options-slots">
                        <template v-if="selectedWeight === 2">
                          <div
                            class="pack__options-slot"
                            v-for="(product, i) of mixsSelected[2]"
                            :key="product.id"
                          >
                            <template v-if="Object.keys(product).length">
                              <div class="pack__options-slot--image">
                                <img :src="product.img" :alt="product.name">
                              </div>
                              <div class="pack__options-slot--content">
                                <div class="pack__options-slot--name">{{product.name}}</div>
                                <div class="pack__options-slot--price">${{product.deal_price}} x{{product.quantity}} = ${{product.deal_price * product.quantity}}</div>

                                <div class="pack__options-slot--quantity">
                                  <v-btn
                                    width="20"
                                    height="20"
                                    x-small
                                    depressed
                                    @click="changeAmountForProduct(i, product, product.quantity - 1)"
                                  >
                                    <v-icon small>mdi-minus</v-icon>
                                  </v-btn>
                                  <div class="mx-2">{{product.quantity}}</div>
                                  <v-btn
                                    width="20"
                                    height="20"
                                    x-small
                                    depressed
                                    @click="changeAmountForProduct(i, product, product.quantity + 1)"
                                  >
                                    <v-icon small>mdi-plus</v-icon>
                                  </v-btn>
                                </div>

                              </div>
                              <div class="pack__options-slot--remove">
                                <v-btn icon @click="removeFromSelected(i, product.id)"><v-icon>mdi-close</v-icon></v-btn>
                              </div>
                            </template>
                            <div class="pack__options-slot--empty" v-else>
                              <div>1/2 oz</div>
                              <span>Empty slot</span>
                            </div>
                          </div>
                        </template>
                        <template v-if="selectedWeight === 4">
                          <div
                            class="pack__options-slot"
                            v-for="(product, i) of mixsSelected[4]"
                            :key="i"
                          >
                            <template v-if="Object.keys(product).length">
                              <div class="pack__options-slot--image">
                                <img :src="product.img" :alt="product.name">
                              </div>
                              <div class="pack__options-slot--content">
                                <div class="pack__options-slot--name">{{product.name}}</div>
                                <div class="pack__options-slot--price">${{product.deal_price}} x{{product.quantity}} = ${{product.deal_price * product.quantity}}</div>

                                <div class="pack__options-slot--quantity">
                                  <v-btn
                                    x-small
                                    depressed
                                    @click="changeAmountForProduct(i, product, product.quantity - 1)"
                                  >
                                    <v-icon small>mdi-minus</v-icon>
                                  </v-btn>
                                  <div class="mx-2">{{product.quantity}}</div>
                                  <v-btn
                                    x-small
                                    depressed
                                    @click="changeAmountForProduct(i, product, product.quantity + 1)"
                                  >
                                    <v-icon small>mdi-plus</v-icon>
                                  </v-btn>
                                </div>

                              </div>
                              <div class="pack__options-slot--remove">
                                <v-btn icon @click="removeFromSelected(i, product.id)"><v-icon>mdi-close</v-icon></v-btn>
                              </div>
                            </template>
                            <div class="pack__options-slot--empty" v-else>
                              <div>1/4 oz</div>
                              <span>Empty slot</span>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="pack__options-group">
                      <div class="pack__options-title">Mix'N'Match total</div>
                      <div class="pack__cart">
                        <div class="pack__cart-saved"><span>${{calculateMixPrice.sum}}</span></div>
                        <v-btn
                          depressed
                          color="#7FAD39"
                          class="pack__cart-btn"
                          :disabled="mixs.selected[selectedWeight].filter(item => Object.keys(item).length).length < 2"
                          @click="addToCart"
                        >
                          Add to cart
                        </v-btn>
                        <div class="pack__cart-saved mt-5">You've just saved with Mix'N'Match: <span style="font-size: 18px;">${{calculateMixPrice.saved}}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'pack',
  head: {
    title: "Weed delivery 🚬 in Toronto, Mix'N'Match, best prices — TOPBUD store",
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: "TOPBUD store offer to you Mix'N'Match in Toronto ✔ Best prices ✔ Weed delivery"
      }
    ]
  },
  components: {
    'PackProductCard': () => import('@/components/shop/PackProductCard'),
    'Filters': () => import('@/components/shop/Filters'),
  },
  async asyncData({$axios, store}) {
    let min = 0;
    let max = 0;
    const first = await $axios.$get('/deals/mixs/2/0/0');
    let fProducts = first.products.map(item => {
      if(min > item.deal_price || min === 0) min = item.deal_price;
      if(max < item.deal_price || max === 0) max = item.deal_price;
      item.img = 'https://topbudstore.com/' + item.img;
      return item;
    })
    store.commit('shop/SET_MIXS', {
      type: 2,
      products: fProducts
    })

    const second = await $axios.$get('/deals/mixs/4/0/0');
    let sProducts = second.products.map(item => {
      if(min > item.deal_price) min = item.deal_price;
      if(max < item.deal_price) max = item.deal_price;
      item.img = 'https://topbudstore.com/' + item.img;
      return item;

    })

    store.commit('shop/SET_MIXS', {
      type: 4,
      products: sProducts
    })

    min = Math.round(min) - 1;
    max = Math.round(max) + 1;

    return {min, max};
  },
  data: () => ({
    selectedWeight: 2,
    search: '',
    showCombineOptions: false
  }),
  watch: {
    min() {
      this.getFilteredProducts();
    },
    max() {
      this.getFilteredProducts();
    },
  },
  computed: {
    ...mapGetters({
      mixs: 'shop/mixs',
      mixsSelected: 'shop/mixsSelected'
    }),
    calculateMixPrice() {
      let sum = 0;
      let saved = 0;

      this.mixs.selected[this.selectedWeight].filter(item => item.id).map(item => {
        if(Object.keys(item).length) {
          sum = sum + item.deal_price * item.quantity;
          saved = saved + (item.price * item.quantity - item.deal_price * item.quantity)
        }
      })

      return {
        sum: sum,
        saved: saved
      };
    },
    productsFiltered() {
      return this.mixs[this.selectedWeight].filter(item => {
        let re = new RegExp(this.search, 'ig');
        if(item.name.match(re)) {
          return item;
        } else {
          if(!this.search) {
            return item;
          }
        }
      })
    },
  },
  methods: {
    async changeAmountForProduct(key, product, quantity) {
      await this.$store.dispatch('shop/changeMixProductAmount', {key: key, product: product, quantity: quantity, type: this.selectedWeight})
        .then(res => {
          if(res === true) {
            this.mixs.selected[this.selectedWeight].find(item => item.id === product.id).quantity = quantity;
          }
        })
    },
    async getFilteredProducts() {
      await this.$axios
        .get(`/deals/mixs/2/${this.min}/${this.max}`)
        .then(res => {
          res.data.products.map(item => {
            item.img = 'https://topbudstore.com/' + item.img;
            item.selected = false;
            return item;
          })
          this.$store.commit('shop/SET_MIXS', {
            type: 2,
            products: res.data.products
          })
        });
      await this.$axios
        .get(`/deals/mixs/4/${this.min}/${this.max}`)
        .then(res => {
          res.data.products.map(item => {
            item.img = 'https://topbudstore.com/' + item.img;
            item.selected = false;
            return item;
          })
          this.$store.commit('shop/SET_MIXS', {
            type: 4,
            products: res.data.products
          })
        });
    },
    removeFromSelected(key, id) {
      this.$store.commit('shop/DELETE_PRODUCT_FROM_SELECTED_MIXS', {
        type: this.selectedWeight,
        key: key,
        id: id
      })
    },
    addToCart() {
      let products = [];
      let mixs = [];
      if(this.$cookies.get('mixs')) {
        this.$cookies.get('mixs').data.map(item => {
          mixs.push(item);
        })
      }

      products.push(this.mixs.selected[this.selectedWeight].filter(item => item.id));

      mixs.push({
        weight: this.selectedWeight,
        price: this.calculateMixPrice.sum,
        quantity: 1,
        products: products
      })

      this.$cookies.set('mixs', {
        data: mixs
      });

      this.$store.commit('shop/CLEAR_SELECTED_MIXS', {type: this.selectedWeight});

      this.$store.commit('shop/SET_MIXS_CART');
      // this.$root.$emit('show-product-added-to-cart-dialog');
      this.$toast.success("Mix'N'Match was added to cart!", {duration: 1500})
    }
  },
  created () {
    this.$root.$on('change-filter-range', data => {
      this.min = data.min;
      this.max = data.max;
    })
    this.$root.$on('change-filter-search-query', data => {
      this.search = data;
    })
  }
}
</script>

<style lang="scss" scoped>
  .pack {

    @media(max-width: 768px) {
      margin: 0 -12px;

      &__content {
        display: flex;
        flex-direction: column;
        padding-top: 0;

        .pack__title {
          margin-bottom: 10px;
          text-align: center;
        }
      }
    }

    &__products {
      @media(max-width: 768px) {
        max-height: 568px;
        overflow-y: auto;
      }
    }

    &__title {
      font-size: 22px;
      font-weight: 900;
    }

    &__options {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      border-left: 1px solid #E9E9E9;
      height: 100%;

      @media(max-width: 768px) {
        position: fixed;
        top: 105vh;
        left: 0;
        right: 0;
        background: #fff;
        border-radius: 20px 20px 0 0;
        box-shadow: 0px -3px 6px 0px rgba(0,0,0,0.25);
        z-index: 1;
        transition: .5s ease-in-out;
        padding-left: 0;
        overflow-y: scroll;
        padding-bottom: 25vh;

        &.active {
          top: 25vh;
        }
      }

      .pack__title {
        text-align: center;
      }

      &-content {
        position: sticky;
        top: 100px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;

        @media(max-width: 768px) {
          max-height: 100%;
          top: 0;
          position: relative;
        }
      }

      &-title {
        margin-bottom: 10px;
        font-weight: 900;
        text-align: center;
      }

      &-group {
        margin-top: 20px;

        @media(max-width: 768px) {
          &:first-of-type {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 1;
            margin-top: 0;
            padding-top: 20px;
          }
        }
      }

      &-weights {
        display: flex;
        flex-direction: column;
        align-items: center;

        &--items {
          display: flex;
          align-items: center;
          background: #e9e9e9;
          border-radius: 30px;
          margin-bottom: 20px;
        }

        &--item {
          height: 40px;
          padding: 0 30px;
          font-weight: 900;
          display: flex;
          align-items: center;
          transition: .3s;
          cursor: pointer;

          &.active {
            background: #7FAD39;
            cursor: default;
            color: #fff;
          }

          &:first-child {
            border-radius: 30px 0 0 30px;
          }

          &:last-child {
            border-radius: 0 30px 30px 0;
          }
        }
      }

      &-slots {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 404px;
        overflow-y: auto;
        padding-bottom: 4px;
      }

      &-slot {
        width: 300px;
        display: flex;
        align-items: center;
        min-height: 92px;
        margin: 8px 0 0;
        padding: 12px;
        border-radius: 16px;
        box-shadow: rgb(6 5 50 / 24%) 0 1px 2px;
        position: relative;

        &--image {
          min-width: 68px;
          width: 68px;
          height: 68px;
          margin-right: 8px;
          border-radius: 16px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        &--name {
          font-weight: 900;
        }

        &--price {
          font-weight: 900;
          color: #7FAD39;
        }

        &--content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        &--quantity {
          display: flex;
          align-items: center;
          border: 1px solid #7FAD39;
          border-radius: 4px;
          margin-top: 6px;
          padding: 4px;

          .v-btn {
            min-width: 20px !important;
          }
        }

        &--remove {
          position: absolute;
          top: 0;
          bottom: 0;
          right: -18px;
          margin: auto 0;
          display: flex;
          align-items: center;

          .v-btn {
            background: #eeeeee !important;
          }
        }

        &--empty {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;

          div {
            width: 68px;
            height: 68px;
            margin-right: 8px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 16px;
            background: #eeeeee;
          }

          span {
            font-weight: 900;
          }
        }
      }

      &Mobile {

        &-btn {
          color: #fff !important;
          border-radius: 30px;
          margin-top: 10px;
          display: none;
          font-size: 18px;

          @media(max-width: 768px) {
            display: flex;
          }
        }

        &-close {
          position: absolute;
          top: 18px;
          right: 20px;
        }
      }
    }

    &__cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @media(max-width: 768px) {
        padding-bottom: 20px;
      }

      &-totals {
        font-weight: 600;

        span {
          font-weight: 900;
          color: #7FAD39;
        }
      }

      &-saved {
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          font-size: 22px;
          font-weight: 900;
          color: #7FAD39;
        }
      }

      &-btn {
        margin-top: 10px;
        width: 300px;
        height: 60px !important;
        color: #fff;
        font-weight: 900;
      }
    }
  }

  .md {
    display: flex;

    @media(max-width: 768px) {
      display: none;
    }
  }
</style>
