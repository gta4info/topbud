<template>
  <div class="page mix">
    <div class="goBack" @click="$router.back()">Go back</div>
    <v-container v-if="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-col cols="3">
          <Filters :min="min" :max="max" :search="search"/>
        </v-col>
        <v-col cols="9">
          <v-container class="py-0">
            <v-row class="sticky">
              <v-col cols="12">
                <div class="sorting">
                  <v-select
                    v-model="selectedSorting"
                    :items="sorting"
                    value="value"
                    text="text"
                    outlined
                    height="30"
                    dense
                    hide-details
                  />
                </div>
              </v-col>
              <v-col cols="12">
                <div class="mnm">
                  <div class="mnm__title">Choose size</div>
                  <div class="mnm__options">
                    <div
                      class="mnm__option"
                      :class="{active: selectedWeight === 1}"
                      @click="selectedWeight = 1"
                    >
                      56g
                    </div>
                    <div
                      class="mnm__option"
                      :class="{active: selectedWeight === 2}"
                      @click="selectedWeight = 2"
                    >
                      28g
                    </div>
                    <div
                      class="mnm__option"
                      :class="{active: selectedWeight === 4}"
                      @click="selectedWeight = 4"
                    >
                      14g
                    </div>
                  </div>
                  <div class="mnm__pack" v-if="mixs.selected[selectedWeight].length >= 1">
                    <div class="mnm__pack-items">
                      <div
                        class="mnm__pack-item"
                        v-for="(product, i) in mixsSelected[selectedWeight].filter(item => Object.keys(item).length)"
                        :key="i"
                        v-if="i < 2"
                      >
                        <img :src="product.img" :alt="product.name">
                      </div>
                      <div class="mnm__pack-count" v-if="mixsSelected[selectedWeight].filter(item => Object.keys(item).length).length - 2 > 0">+{{mixsSelected[selectedWeight].filter(item => Object.keys(item).length).length - 2}}</div>
                    </div>
                    <div class="mnm__pack-totals">
                      <div class="mnm__pack-totals--oldPrice">${{calculateMixPrice.old}}</div>
                      <div class="mnm__pack-totals--price">${{calculateMixPrice.sum}} <span class="mnm__pack-totals--weight"> / {{calculateMixPrice.weight}}g</span></div>
                    </div>
                    <v-btn class="mnm__editBtn" depressed @click="mixModal = !mixModal">Edit Pack</v-btn>
                  </div>
                  <div class="mnm__modal" v-if="mixModal" v-click-outside="onClickOutsideModal">
                    <div class="mnm__modal-title">Products in pack:</div>
                    <div class="mnm__modal-products">
                      <div
                        class="mnm__modal-product"
                        v-for="(product, i) in mixsSelected[selectedWeight].filter(item => Object.keys(item).length)"
                        :key="product.id"
                      >
                        <div class="mnm__modal-product--img">
                          <img :src="product.img" :alt="product.name">
                        </div>
                        <div class="mnm__modal-product--info">
                          <div class="mnm__modal-product--name">{{product.name}}</div>
                        </div>
                        <div class="mnm__modal-product--quantity">
                          <v-btn
                            x-small
                            depressed
                            @click="changeAmountForProduct(i, product, product.quantity + 1)"
                          >
                            <v-icon small color="#C4C4C4">mdi-plus</v-icon>
                          </v-btn>
                          <div>{{product.quantity}}</div>
                          <v-btn
                            x-small
                            depressed
                            @click="changeAmountForProduct(i, product, product.quantity - 1)"
                          >
                            <v-icon small color="#C4C4C4">mdi-minus</v-icon>
                          </v-btn>
                        </div>
                        <div class="mnm__modal-product--total">
                          <div class="mnm__modal-product--weight">{{calculateProductTotalWeight(product.id)}}</div>
                          <div class="mnm__modal-product--price">${{product.quantity * product.deal_price}}</div>
                        </div>
                        <div class="mnm__modal-product--remove">
                          <v-btn icon @click="removeFromSelected(i, product.id)" color="#B1B1B1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                        </div>
                      </div>
                    </div>
                    <div class="mnm__modal-totals">
                      <div class="mnm__modal-totals--item">
                        <div class="mnm__modal-totals--title">You Save:</div>
                        <div class="mnm__modal-totals--sum">${{calculateMixPrice.saved}}</div>
                      </div>
                      <div class="mnm__modal-totals--item">
                        <div class="mnm__modal-totals--title">Pack Total:</div>
                        <div class="mnm__modal-totals--sum">${{calculateMixPrice.sum}}</div>
                      </div>
                      <v-btn
                        depressed
                        color="#21AA5B"
                        class="mnm__modal-checkout"
                        @click="addToCart"
                        :disabled="!allowAddToCart"
                      >
                        Add to cart
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="mnm__title">Choose atleast two products</div>
              </v-col>
              <template v-if="productsFiltered.length">
                <v-col style="padding: 16px 5px;" cols="4" v-for="product in productsFiltered" :key="product.id">
                  <PackProductCard :product="product" :key="product.id" :selectedWeight="selectedWeight" :selected="product.selected"/>
                </v-col>
              </template>
              <v-col cols="12" v-else>
                <p>No products was found!</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mix__mobileWrapper" :style="mixs.selected[selectedWeight].length >= 1 ? 'padding-bottom: 66px' : ''" v-else>
      <div class="mnm">
        <div class="mnm__title">Choose size</div>
        <div class="mnm__options">
          <div
            class="mnm__option"
            :class="{active: selectedWeight === 1}"
            @click="selectedWeight = 1"
          >
            56g
          </div>
          <div
            class="mnm__option"
            :class="{active: selectedWeight === 2}"
            @click="selectedWeight = 2"
          >
            28g
          </div>
          <div
            class="mnm__option"
            :class="{active: selectedWeight === 4}"
            @click="selectedWeight = 4"
          >
            14g
          </div>
        </div>
      </div>

      <FiltersMobile :min="min" :max="max" :search="search"/>

      <div class="sorting" style="margin: 18px 0;">
        <v-select
          v-model="selectedSorting"
          :items="sorting"
          value="value"
          text="text"
          outlined
          height="30"
          dense
          hide-details
        />
      </div>

      <div class="mnm__title" style="margin-bottom: 15px;">Choose atleast two products</div>

      <div class="mix__products" v-if="productsFiltered.length">
        <div v-for="product in productsFiltered" :key="product.id">
          <PackProductCardMobile :product="product" :key="product.id" :selectedWeight="selectedWeight" :selected="product.selected"/>
        </div>
      </div>
      <p v-else>No products was found!</p>

      <div class="mnm__pack" v-if="mixs.selected[selectedWeight].length >= 1">
        <div class="mnm__pack-items">
          <div
            class="mnm__pack-item"
            v-for="(product, i) in mixsSelected[selectedWeight]"
            :key="i"
            v-if="i < 2"
          >
            <img :src="product.img" :alt="product.name">
          </div>
          <div class="mnm__pack-count" v-if="mixsSelected[selectedWeight].filter(item => Object.keys(item).length).length - 2 > 0">+{{mixsSelected[selectedWeight].filter(item => Object.keys(item).length).length - 2}}</div>
        </div>
        <div class="mnm__pack-totals">
          <div class="mnm__pack-totals--oldPrice">${{calculateMixPrice.old}}</div>
          <div class="mnm__pack-totals--price">${{calculateMixPrice.sum}} <span class="mnm__pack-totals--weight"> / {{calculateMixPrice.weight}}g</span></div>
        </div>
        <v-btn class="mnm__editBtn" depressed @click="mixModal = !mixModal">Edit Pack</v-btn>
      </div>
      <div class="mnm__modal" v-if="mixModal" v-click-outside="onClickOutsideModal">
        <v-btn icon class="mnm__modal-close" @click="mixModal = false">
          <v-icon size="24">mdi-close</v-icon>
        </v-btn>
        <div class="mnm__modal-title">Products in pack:</div>
        <div class="mnm__modal-products">
          <div
            class="mnm__modal-product"
            v-for="(product, i) in mixsSelected[selectedWeight].filter(item => Object.keys(item).length)"
            :key="product.id"
          >
            <div>
              <div class="mnm__modal-product--img">
                <img :src="product.img" :alt="product.name">
              </div>
              <div class="mnm__modal-product--info">
                <div class="mnm__modal-product--name">{{product.name}}</div>
              </div>
            </div>
            <div>
              <div class="mnm__modal-product--quantity">
                <v-btn
                  x-small
                  depressed
                  @click="changeAmountForProduct(i, product, product.quantity - 1)"
                >
                  <v-icon small color="#C4C4C4">mdi-minus</v-icon>
                </v-btn>
                <div>{{product.quantity}}</div>
                <v-btn
                  x-small
                  depressed
                  @click="changeAmountForProduct(i, product, product.quantity + 1)"
                >
                  <v-icon small color="#C4C4C4">mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="mnm__modal-product--total">
                <div class="mnm__modal-product--weight">{{calculateProductTotalWeight(product.id)}}</div>
                <div class="mnm__modal-product--price">${{product.quantity * product.deal_price}}</div>
              </div>
              <div class="mnm__modal-product--remove">
                <v-btn icon @click="removeFromSelected(i, product.id)" color="#B1B1B1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="mnm__modal-totals">
          <div class="mnm__modal-totals--item">
            <div class="mnm__modal-totals--title">You Save:</div>
            <div class="mnm__modal-totals--sum">${{calculateMixPrice.saved}}</div>
          </div>
          <div class="mnm__modal-totals--item">
            <div class="mnm__modal-totals--title">Pack Total:</div>
            <div class="mnm__modal-totals--sum">${{calculateMixPrice.sum}}</div>
          </div>
          <v-btn
            depressed
            color="#21AA5B"
            class="mnm__modal-checkout"
            @click="addToCart"
            :disabled="!allowAddToCart"
          >
            Add to cart
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
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
    'PackProductCardMobile': () => import('@/components/shop/PackProductCardMobile'),
    'Filters': () => import('@/components/shop/Filters'),
    'FiltersMobile': () => import('@/components/shop/FiltersMobile'),
  },
  async asyncData({$axios, store}) {
    let max1 = 0;
    let min1 = 0;
    let max2 = 0;
    let min2 = 0;
    let max4 = 0;
    let min4 = 0;

    const first = await $axios.$get('/deals/mixs/2/0/0');
    let fProducts = first.products.map(item => {
      if(min2 > item.deal_price || min2 === 0) min2 = item.deal_price;
      if(max2 < item.deal_price || max2 === 0) max2 = item.deal_price;
      item.img = 'https://topbudstore.com/' + item.img;
      item.selected = false;
      return item;
    })
    store.commit('shop/SET_MIXS', {
      type: 2,
      products: fProducts
    })

    const second = await $axios.$get('/deals/mixs/4/0/0');
    let sProducts = second.products.map(item => {
      if(min4 > item.deal_price || min4 === 0) min4 = item.deal_price;
      if(max4 < item.deal_price || max4 === 0) max4 = item.deal_price;
      item.img = 'https://topbudstore.com/' + item.img;
      item.selected = false;
      return item;
    })

    store.commit('shop/SET_MIXS', {
      type: 4,
      products: sProducts
    })

    const third = await $axios.$get('/deals/mixs/1/0/0');
    let tProducts = third.products.map(item => {
      if(min1 > item.deal_price || min1 === 0) min1 = item.deal_price;
      if(max1 < item.deal_price || max1 === 0) max1 = item.deal_price;
      item.img = 'https://topbudstore.com/' + item.img;
      item.selected = false;
      return item;
    })
    store.commit('shop/SET_MIXS', {
      type: 1,
      products: tProducts
    })

    min1 = Math.round(min1) - 1;
    max1 = Math.round(max1) + 1;
    min2 = Math.round(min2) - 1;
    max2 = Math.round(max2) + 1;
    min4 = Math.round(min4) - 1;
    max4 = Math.round(max4) + 1;

    let min = {
      1: min1,
      2: min2,
      4: min4
    }
    let max = {
      1: max1,
      2: max2,
      4: max4
    }

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: '/shop',
        title: 'shop'
      },
      {
        link: null,
        title: 'Mix’N’Match'
      },
    ]

    return {min, max, breadcrumbs};
  },
  data: () => ({
    mixModal: false,
    selectedWeight: 1,
    search: '',
    selectedSorting: 1,
    sorting: [
      {
        text: 'Price: Low to High',
        value: 1
      },
      {
        text: 'Price: High to Low',
        value: 2
      }
    ]
  }),
  watch: {
    mixs: {
      handler() {
        if(this.mixs.selected[this.selectedWeight].length === 0) {
          this.mixModal = false;
        }
      },
      deep: true
    },
    min: {
      handler() {
        this.getFilteredProducts();
      },
      deep: true
    },
    max: {
      handler() {
        this.getFilteredProducts();
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters({
      mixs: 'shop/mixs',
      mixsSelected: 'shop/mixsSelected'
    }),
    allowAddToCart() {
      let total = 0;
      this.mixsSelected[this.selectedWeight].map(item => {
        total += item.quantity;
      })
      return total >= 2;
    },
    calculateMixPrice() {
      let sum = 0;
      let old = 0;
      let saved = 0;

      this.mixs.selected[this.selectedWeight].filter(item => item.id).map(item => {
        if(Object.keys(item).length) {
          sum = sum + item.deal_price * item.quantity;
          old = old + (item.price * item.quantity);
          saved = saved + (item.price * item.quantity - item.deal_price * item.quantity);
        }
      })

      let weight, weightTotal = 0;
      if(this.selectedWeight === 1) {
        weight = 28
      }
      if(this.selectedWeight === 2) {
        weight = 14
      }
      if(this.selectedWeight === 4) {
        weight = 7
      }

      this.mixs.selected[this.selectedWeight].filter(item => item.id).map(i => {
        weightTotal = weightTotal + i.quantity * weight
      })

      return {
        sum: sum,
        old: old,
        weight: weightTotal,
        saved: saved
      };
    },
    productsFiltered() {
      let bySearch = this.mixs[this.selectedWeight].filter(item => {
        let re = new RegExp(this.search, 'ig');
        if(item.name.match(re)) {
          return item;
        } else {
          if(!this.search) {
            return item;
          }
        }
      });

      if(this.selectedSorting === 1) {
        return bySearch.sort((a, b) => {return a.price - b.price})
      }

      if(this.selectedSorting === 2) {
        return bySearch.sort((a, b) => {return b.price - a.price})
      }
    },
  },
  methods: {
    onClickOutsideModal() {
      this.mixModal = false;
    },
    calculateProductTotalWeight(id) {
      return this.mixsSelected[this.selectedWeight].find(item => item.id === id).weight
    },
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
        .get(`/deals/mixs/1/${this.min[1]}/${this.max[1]}`)
        .then(res => {
          res.data.products.map(item => {
            item.img = 'https://topbudstore.com/' + item.img;
            item.selected = false;
            return item;
          })
          this.$store.commit('shop/SET_MIXS', {
            type: 1,
            products: res.data.products
          })
        });
      await this.$axios
        .get(`/deals/mixs/2/${this.min[2]}/${this.max[2]}`)
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
        .get(`/deals/mixs/4/${this.min[4]}/${this.max[4]}`)
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

      this.mixModal = false;

      this.$toast.success("Mix'N'Match was added to cart!", {duration: 1500})
    }
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
    this.$root.$on('change-filter-range', data => {
      this.min[this.selectedWeight] = data.min;
      this.max[this.selectedWeight] = data.max;
    })
    this.$root.$on('change-filter-search-query', data => {
      this.search = data;
    })
  }
}
</script>

<style lang="scss" scoped>

  .sticky {
    position: sticky;
    top: 0;
    background: #ffffff;
    z-index: 2;
  }

  .mnm {
    display: flex;
    align-items: center;
    height: 50px;

    @media(max-width: 768px) {
      position: relative;
      top: 0;
      height: 31px;
      margin-bottom: 18px;
    }

    &__title {
      color: #333333;
      font-size: 24px;
      font-weight: 700;

      @media(max-width: 768px) {
        font-size: 20px;
      }

      @media(max-width: 320px) {
        font-size: 16px;
      }
    }

    &__options {
      margin-left: 28px;
      display: flex;
      align-items: center;

      @media(max-width: 768px) {
        margin-left: 18px;
      }
    }

    &__option {
      padding: 5px 9px;
      border-radius: 30px;
      color: #333333;
      background: #fff;
      transition: .3s;
      font-weight: 700;
      cursor: pointer;

      @media(max-width: 768px) {
        font-size: 14px;
        flex-shrink: 0;
      }

      &:not(:last-of-type) {
        margin-right: 6px;

        @media(max-width: 768px) {
          margin-right: 0;
        }
      }

      &.active {
        background: #f6c76f;
        color: #fff;
        cursor: default;
      }
    }

    &__pack {
      display: flex;
      align-items: center;
      margin-left: auto;

      @media(max-width: 768px) {
        margin-left: 0;
        background: #ffffff;
        z-index: 1;
        flex-shrink: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        padding: 0 30px;
        border-top: 1px solid #008DE3;
      }

      &-items {
        display: flex;
      }

      &-item {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #D8D8D8;
        overflow: hidden;

        @media(max-width: 768px) {
          width: 30px;
          height: 30px;
        }

        &:not(:first-of-type) {
          margin-left: -25px;

          @media(max-width: 768px) {
            margin-left: -15px;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-count {
        background: #FF4B55;
        color: #fff;
        font-weight: 700;
        border-radius: 10px;
        align-self: flex-start;
        padding: 0 6px;
        margin-left: -18px;

        @media(max-width: 768px) {
          font-size: 13px;
          border-radius: 5px;
          line-height: 1.2;
          padding: 0 3px;
        }
      }

      &-totals {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 35px;
        font-weight: 700;
        font-size: 20px;
        line-height: 1.2;

        @media(max-width: 768px) {
          margin-left: 15px;
        }

        &--oldPrice {
          color: #B1B1B1;
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 2px;

          @media(max-width: 768px) {
            font-size: 12px;
          }

          &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: #FF4B55;
          }
        }

        &--price {
          color: #21AA5B;
          display: flex;
          align-items: center;

          @media(max-width: 768px) {
            font-size: 15px;
          }
        }

        &--weight {
          color: #333333;
          margin-left: 4px;

          @media(max-width: 768px) {
            font-size: 15px;
          }
        }
      }
    }

    &__editBtn {
      width: 140px !important;
      height: 50px !important;
      color: #009BDB !important;
      font-weight: 700;
      font-size: 14px;
      text-transform: none;
      letter-spacing: 0.03em;
      border: 1px solid #b1b1b1;
      border-radius: 25px;
      margin-left: 35px;

      @media(max-width: 768px) {
        font-size: 10px;
        height: 30px !important;
        width: 105px !important;
        margin-left: auto;
      }
    }

    &__modal {
      padding: 22px 30px 37px;
      background: #ffffff;
      position: absolute;
      top: 80px;
      right: 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      z-index: 2;
      display: flex;
      flex-direction: column;

      @media(max-width: 768px) {
        padding: 30px 20px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 60px;
        left: 0;
      }

      &-close {
        position: absolute;
        top: 30px;
        right: 20px;
      }

      &-title {
        font-size: 24px;
        font-weight: 700;
        color: #333;
        margin-bottom: 27px;
      }

      &-products {
        max-height: 250px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding-right: 15px;

        @media(max-width: 768px) {
          height: 100%;
          flex-grow: 1;
          max-height: 100%;
          padding-right: 0;
        }

        &::-webkit-scrollbar-track {
          background: #EDEDED !important;
        }

        &::-webkit-scrollbar-thumb {
          background: #C4C4C4 !important;
        }

        &::-webkit-scrollbar {
          width: 4px;
        }
      }

      &-product {
        display: flex;

        @media(max-width: 768px) {
          border: 1px solid #E6E6E6;
          border-radius: 10px;
          padding: 27px 20px;
          flex-direction: column;

          > div {
            display: flex;
            align-items: center;

            &:first-child {
              margin-bottom: 25px;
            }
          }
        }

        &:not(:last-of-type) {
          margin-bottom: 20px;
        }

        &--img {
          border-radius: 5px;
          width: 70px;
          height: 70px;
          border: 1px solid #D8D8D8;
          overflow: hidden;
          margin-right: 20px;

          @media(max-width: 768px) {
            border: 0;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        &--info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 1;
          width: 250px;
        }

        &--name {
          font-weight: 700;
          font-size: 16px;
          color: #333;

          @media(max-width: 768px) {
            font-size: 14px;
          }
        }

        &--quantity {
          margin-left: 25px;
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 70px;
          width: 30px;
          border-radius: 25px;
          border: 1px solid #C4C4C4;

          @media(max-width: 768px) {
            flex-direction: row;
            width: 80px;
            height: 35px;
            margin-left: 0;
            margin-right: 20px;
            padding: 0 10px;
          }

          > div {
            font-weight: 700;
            font-family: "Roboto", sans-serif;
            font-size: 16px;

            @media(max-width: 768px) {
              flex-grow: 1;
              text-align: center;
            }
          }

          .v-btn {
            width: 16px !important;
            height: 16px !important;
            min-width: 16px !important;
            padding: 0;
          }
        }

        &--total {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 60px;
        }

        &--price {
          color: #333333;
          font-weight: 700;
          font-family: "Roboto", sans-serif;
          font-size: 14px;

          @media(max-width: 768px) {
            font-size: 18px;
            font-family: "Montserrat", sans-serif;
          }
        }

        &--remove {
          display: flex;
          align-items: center;

          @media(max-width: 768px) {
            margin-left: auto;
          }
        }
      }

      &-totals {
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        min-width: 200px;
        margin-top: 24px;

        @media(max-width: 768px) {
          width: 100%;
          margin-top: 14px;
        }

        &--item {
          display: flex;
          justify-content: space-between;
          width: 100%;

          @media(max-width: 768px) {
            width: 220px;
            align-self: flex-end;
          }

          &:not(:last-of-type) {
            margin-bottom: 10px;
          }

          &:last-of-type {

            .mnm__modal-totals--sum {
              color: #008de3;
            }
          }
        }

        &--title {
          font-weight: 700;
          color: #b1b1b1;
          font-size: 18px;
        }

        &--sum {
          font-weight: 700;
          color: #333333;
          font-size: 18px;
        }
      }

      &-checkout {
        margin-top: 30px;
        height: 50px !important;
        padding-left: 25px !important;
        padding-right: 25px !important;
        background: #21aa5b !important;
        border-radius: 5px;
        font-size: 18px;
        font-weight: 700;
        text-transform: none;
        color: #fff !important;

        @media(max-width: 768px) {
          margin-top: 14px;
        }
      }
    }
  }

  @media(max-width: 768px) {
    .mix {
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: fixed;
      //top: 36px;
      top: 0;
      right: 0;
      left: 0;
      bottom: 60px;

      &__products {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        flex-grow: 1;
      }

      &__mobileWrapper {
        position: relative;
        height: calc(100% - 66px);
      }
    }
  }
</style>
