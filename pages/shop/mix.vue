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
              <div class="pack__products">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <div class="pack__title">Choose products</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      md="4"
                      sm="12"
                      v-for="product in mixs[selectedWeight]"
                      :key="product.id"
                    >
                      <PackProductCard :product="product" :key="product.id" :selectedWeight="selectedWeight"/>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="5">
              <div class="pack__options">
                <div class="pack__options-content">
                  <div class="pack__options-group">
                    <div class="pack__title">Combine options</div>
                    <div class="pack__options-weights">
                      <div class="pack__options-title">Choose weight</div>
                      <div class="pack__options-weights--items">
                        <div
                          class="pack__options-weights--item"
                          :class="{active: selectedWeight === 2}"
                          @click="selectedWeight = 2"
                        >
                          1/2 oz
                        </div>
                        <div
                          class="pack__options-weights--item"
                          :class="{active: selectedWeight === 4}"
                          @click="selectedWeight = 4"
                        >
                          1/4 oz
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
                          v-for="(product, i) of mixs.selected[2]"
                          :key="i"
                        >
                          <template v-if="Object.keys(product).length">
                            <div class="pack__options-slot--image">
                              <img :src="product.img" :alt="product.name">
                            </div>
                            <div class="pack__options-slot--content">
                              <div class="pack__options-slot--name">{{product.name}}</div>
                              <div class="pack__options-slot--price">${{product.deal_price}}</div>
                            </div>
                            <div class="pack__options-slot--remove">
                              <v-btn icon @click="removeFromSelected(i)"><v-icon>mdi-close</v-icon></v-btn>
                            </div>
                          </template>
                          <div class="pack__options-slot--empty" v-else>
                            <div>?</div>
                            <span>Empty slot</span>
                          </div>
                        </div>
                      </template>
                      <template v-if="selectedWeight === 4">
                        <div
                          class="pack__options-slot"
                          v-for="(product, i) of mixs.selected[4]"
                          :key="i"
                        >
                          <template v-if="Object.keys(product).length">
                            <div class="pack__options-slot--image">
                              <img :src="product.img" :alt="product.name">
                            </div>
                            <div class="pack__options-slot--content">
                              <div class="pack__options-slot--name">{{product.name}}</div>
                              <div class="pack__options-slot--price">${{product.deal_price}}</div>
                            </div>
                            <div class="pack__options-slot--remove">
                              <v-btn icon @click="removeFromSelected(i)"><v-icon>mdi-close</v-icon></v-btn>
                            </div>
                          </template>
                          <div class="pack__options-slot--empty" v-else>
                            <div>?</div>
                            <span>Empty slot</span>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="pack__options-group">
                    <div class="pack__options-title">Mix'N'Match totals</div>
                    <div class="pack__cart">
                      <div class="pack__cart-saved">You've just saved with Mix'N'Match: <span>${{calculateMixPrice.saved}}</span></div>
                      <v-btn
                        depressed
                        color="#7FAD39"
                        class="pack__cart-btn"
                        :disabled="mixs.selected[selectedWeight].filter(item => Object.keys(item).length).length < selectedWeight"
                        @click="addToCart"
                      >
                        Add to cart (${{calculateMixPrice.sum}})
                      </v-btn>
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
    'PackProductCard': () => import('@/components/shop/PackProductCard')
  },
  async asyncData({$axios, store}) {
    const first = await $axios.$get('/deals/mixs/2');
    let fProducts = first.products.map(item => {
      item.img = 'https://topbudstore.com/' + item.img;
      return item;
    })
    store.commit('shop/SET_MIXS', {
      type: 2,
      products: fProducts
    })

    const second = await $axios.$get('/deals/mixs/4');
    let sProducts = second.products.map(item => {
      item.img = 'https://topbudstore.com/' + item.img;
      return item;
    })

    store.commit('shop/SET_MIXS', {
      type: 4,
      products: sProducts
    })
  },
  data: () => ({
    selectedWeight: 2,
  }),
  computed: {
    ...mapGetters({
      mixs: 'shop/mixs'
    }),
    calculateMixPrice() {
      let sum = 0;
      let saved = 0;

      this.mixs.selected[this.selectedWeight].map(item => {
        if(Object.keys(item).length) {
          sum = sum + item.deal_price;
          saved = saved + (item.price - item.deal_price)
        }
      })

      return {
        sum: sum,
        saved: saved
      };
    }
  },
  methods: {
    removeFromSelected(key) {
      this.$store.commit('shop/DELETE_PRODUCT_FROM_SELECTED_MIXS', {
        type: this.selectedWeight,
        key: key
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

      products.push(this.mixs.selected[this.selectedWeight]);

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
      this.$root.$emit('show-product-added-to-cart-dialog');
    }
  },
}
</script>

<style lang="scss" scoped>
  .pack {

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

      .pack__title {
        text-align: center;
      }

      &-content {
        position: sticky;
        top: 100px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
      }

      &-title {
        margin-bottom: 10px;
        font-weight: 900;
        text-align: center;
      }

      &-group {
        margin-top: 20px;
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
            font-size: 22px;
            background: #eeeeee;
          }

          span {
            font-weight: 900;
          }
        }
      }
    }

    &__cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

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
</style>
