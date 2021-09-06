<template>
  <div class="page">
    <v-container>
      <nav class="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop">Shop</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop/cart">Cart</nuxt-link>
          </li>
          <li>Checkout</li>
        </ul>
      </nav>

      <h1>Order checkout</h1>

      <div class="checkout">
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <div class="checkout__summary">
              <div class="checkout__title">Order summary</div>
              <div class="checkout__summary-group" v-if="cart.length">
                <div class="checkout__summary-group--title">Regular products:</div>
                <div class="checkout__summary-group--line" v-for="item in cart" :key="item.id">
                  {{item.quantity}} x {{ weights[item.weight_id] }} {{ item.name }} <span>${{ item.price }}</span>
                </div>
              </div>
              <div class="checkout__summary-group" v-if="mixs.cart && mixs.cart.data && mixs.cart.data.length">
                <div class="checkout__summary-group--title">Mix'N'Match products:</div>
                <div class="mix-group" v-for="(mix, i) in mixs.cart.data" :key="i">
                  <div class="mix-group__title">{{mix.quantity}} x {{weights[mix.weight]}} <span>${{mix.price}}</span></div>
                  <div v-for="(mixGroup,index) in mix.products" :key="index">
                    <div class="checkout__summary-group--line" v-for="item in mixGroup" :key="item.id">
                      {{item.quantity}} x {{ weights[item.weight_id] }} {{ item.name }} <span>${{ item.price * item.quantity }}</span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="checkout__summary-total" v-if="promocodeApplied">
                Cart total:
                <div>
                  ${{calculateCartTotal}}
                  <span v-if="promocodeIsPercent">(${{promocodeValue}} off)</span>
                  <span v-else>({{promocodeValue}}% off)</span>
                </div>
              </div>
              <div class="checkout__summary-total" v-else>Cart total: <div>${{calculateCartTotal}}</div></div>
              <div class="checkout__summary-total">Delivery fees: <div>${{calculateCartTotal >= 100 ? 0 : 10}}</div></div>
              <div class="checkout__summary-totals">Order total: <div>${{calculateTotal}}</div></div>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <div class="checkout__client">
              <div class="checkout__title">Client information</div>
              <div class="checkout__client-group">
                <span>Name *</span>
                <v-text-field v-model="name" label="example: Johnny Cage" solo hide-details height="40" dense/>
              </div>
              <div class="checkout__client-group">
                <span>Phone *</span>
                <v-text-field
                  v-model="phone"
                  label="example: 4377787966"
                  solo
                  hide-details
                  height="40"
                  dense
                  inputmode="numeric"
                  name="phone"
                  pattern="[0-9]*"
                  type="number"
                />
              </div>
              <div class="checkout__client-group">
                <span>Payment *</span>
                <v-select v-model="payment" solo :items="payments" height="40" dense hide-details/>
              </div>
              <div class="checkout__client-group" v-click-outside="onClickOutside">
                <span>Address *</span>
                <div class="checkout__client-address">
                  <v-text-field
                    v-model="addressQuery"
                    solo
                    dense
                    hide-details
                    label="example: 20, Main str, Ontario"
                    prepend-inner-icon="mdi-magnify"
                    @focus="showResults = true"
                    @input="resultPicked = false"
                  />
                  <div class="results" :class="{active: results.length && showResults}">
                    <div v-for="(result, i) in results" :key="i" @click="onResultSelected(result.text)"><span>{{result.text}}</span></div>
                  </div>
                </div>
              </div>
              <div class="checkout__client-group">
                <span>Comment</span>
                <v-text-field
                  v-model="comment"
                  label="Leave a comment for the order"
                  solo
                  hide-details
                  height="40"
                  dense
                  name="comment"
                />
              </div>
              <div class="checkout__client-group">
                <span>Promocode</span>
                <div class="checkout__client-promocode">
                  <v-text-field
                    v-model="promocode"
                    label="Enter promocode"
                    solo
                    hide-details
                    height="40"
                    dense
                    name="promocode"
                    :disabled="promocodeDisabled"
                  />
                  <v-btn
                    depressed
                    @click="applyPromocode"
                    height="40"
                    color="#28A745"
                    :disabled="promocodeDisabled || this.promocode.length === 0 || !checkRequiredFields"
                    :loading="applyingPromocode"
                  >
                    Apply
                  </v-btn>
                </div>
              </div>
              <v-btn
                depressed
                color="#28A745"
                class="white--text mt-5"
                @click="checkout"
                :loading="sending"
                height="60"
                :disabled="!checkRequiredFields"
              >
                Send order
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Order summary | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Your shopping cart with TOPBUD store'
      }
    ]
  },
  data: () => ({
    payment: 'cash',
    phone: '',
    name: '',
    comment: '',
    addressQuery: '',
    payments: [
      {
        value: 'cash',
        text: 'Cash'
      },
      {
        value: 'transfer',
        text: 'Etransfer'
      },
    ],
    sending: false,
    mapboxToken: 'pk.eyJ1Ijoia3JlbmV2a24iLCJhIjoiY2tyOWMwaHU5M3I2djJybnhrdTVkbGRkMyJ9.9ev37MmJWFhSuQ_emwsBEg',
    results: [],
    loadingResults: false,
    awaitingSearch: false,
    showResults: false,
    resultPicked: false,
    promocodeApplied: false,
    promocode: '',
    applyingPromocode: false,
    promocodeDisabled: false,
    promocodeValue: 0,
    promocodeIsPercent: true,
  }),
  watch: {
    addressQuery() {
      if(this.addressQuery.length && !this.resultPicked) {
        if(!this.awaitingSearch) {
          setTimeout(() => {
            this.getAddresses();
          }, 300)
        }
        this.awaitingSearch = true;
      } else {
        this.results = [];
      }
    }
  },
  computed: {
    ...mapGetters({
      cart: 'shop/cart',
      mixs: 'shop/mixs',
      mixsCart: 'shop/mixsCart',
      weights: 'shop/weights'
    }),
    calculateCartTotal() {
      let total = 0;
      this.cart.map(item => {
        total += item.quantity * item.price;
      })
      if(this.mixs.cart.data) {
        this.mixs.cart.data.map(item => {
          total += item.quantity * item.price;
        })
      }

      if(this.promocodeApplied) {
        if(this.promocodeIsPercent) {
          total = total - (total / 100 * this.promocodeValue);
        } else {
          total = total - this.promocodeValue;
        }
        total = Math.floor(total);
      }

      return total;
    },
    calculateTotal() {
      return this.calculateCartTotal + (this.calculateCartTotal >= 100 ? 0 : 10);
    },
    checkRequiredFields() {
      return this.name.length > 0 && this.phone.length > 0 && this.addressQuery.length > 0;
    }
  },
  methods: {
    applyPromocode() {
      this.applyingPromocode = true;
      this.$axios
        .get(`/promocode?code=${this.promocode}&phone=${this.phone}&total=${this.calculateCartTotal}`)
        .then(res => {
          if(res.data.success === true) {
            this.promocodeDisabled = true;
            this.promocodeIsPercent = res.data.isPrice;
            this.promocodeValue = res.data.value;
            this.promocodeApplied = true;

            this.$toast.success('Promocode has been applied successfully!', {duration: 1500})
          } else {
            this.$toast.error(res.data.message, {duration: 1500})
          }
        })
        .finally(() => this.applyingPromocode = false);
    },
    onResultSelected(result) {
      this.addressQuery = result;
      this.showResults = false;
      this.resultPicked = true;
    },
    onClickOutside () {
      this.showResults = false
    },
    getAddresses() {
      if(this.loadingResults || this.resultPicked) return;
      this.loadingResults = true;
      this.$axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.addressQuery}.json?access_token=${this.mapboxToken}&language=en-US&types=country,region,postcode,district,place,address&country=ca&limit=4&autocomplete=true`)
        .then(res => {
          let results = [];
          res.data.features.map(item => {
            results.push({
              value: item['place_name_en-US'],
              text: item['place_name_en-US']
            })
          })
          this.results = results;
          this.showResults = true;
        })
        .finally(() => {
          this.loadingResults = false;
          this.awaitingSearch = false;
        })
    },
    checkout() {
      if(!this.name || !this.phone || !this.addressQuery) {
        return alert('Fields are not filled!')
      }
      this.sending = true;
      let order = [];

      if(this.cart.length) {
        this.cart.map(item => {
          order.push({
            id: parseInt(item.id),
            count: item.quantity,
            weight_name: this.weights[item.weight_id],
            price: item.price,
            mix: 0
          })
        })
      }
      if(this.mixsCart && this.mixsCart.data && this.mixsCart.data.length) {
        this.mixsCart.data.map(mix => {
          mix.products[0].map(item => {
            order.push({
              id: parseInt(item.id),
              count: mix.quantity * item.quantity,
              weight_name: this.weights[item.weight_id],
              price: item.price,
              mix: mix.weight
            })
          });
        })
      }

      if(!order.length) {
        return this.$toast.error('Please check your cart for products!', {duration: 1500});
      }

      let data = {
        name: this.name,
        phone: this.phone,
        address: this.addressQuery,
        order: order,
        comment: this.comment,
        code: this.promocodeApplied ? this.promocode : ""
      };

      this.$axios
        .post(`/checkout/${this.payment}`, data)
        .then(res => {
          if(res.data.success) {
            this.name = '';
            this.phone = '';
            this.address = '';

            this.$store.commit('shop/EMPTY_CART');
            this.$store.commit('shop/EMPTY_MIX_CART');

            this.$router.push({name: 'shop-cart-success', query: {order: res.data.order_id}})
          }
        })
        .catch(err => {
          if(err.response.status === 406) {
            this.$toast.error('The promocode has expired!', {duration: 1500});
            this.promocode = '';
            this.promocodeApplied = false;
            this.promocodeValue = 0;
            this.promocodeIsPercent = false;
          } else {
            this.$toast.error('Something goes wrong...', {duration: 1500});
          }
        })
        .finally(() => this.sending = false);
    }
  },
  async created () {
    await this.$store.dispatch('shop/setMixsCart');
    await this.$store.dispatch('shop/getMixProducts');
    await this.$store.dispatch('shop/getCartProducts').then(() => this.loading = false);

    if(this.cart.length === 0 && this.mixsCart.data.length === 0 || this.calculateCartTotal < 60) {
      await this.$router.push({name: 'shop-cart'});
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkout {
    margin-top: 40px;
    margin-bottom: 100px;

    @media(max-width: 768px) {
      .row {
        flex-direction: column-reverse;
      }
    }

    &__title {
      font-weight: 700;
      font-size: 22px;
      margin-bottom: 15px;
    }

    &__summary {
      border: 1px solid #dedede;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      padding: 12px 20px;
      height: 100%;

      &-group {
        display: flex;
        flex-direction: column;

        &:not(:last-of-type) {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dedede;
        }

        &--title {
          font-weight: 700;
          font-size: 18px;
          border-bottom: 1pt solid #dedede;
          padding-bottom: 20px;
          margin-bottom: 20px;
          line-height: 1;
        }

        &--line {
          display: flex;
          align-items: center;

          &:not(:last-of-type) {
            margin-bottom: 4px;
          }

          span {
            margin-left: auto;
            font-weight: 700;
          }
        }
      }

      &-total {
        align-self: flex-end;
        font-weight: 700;
        display: flex;
        align-items: center;

        div {
          font-weight: 700;
          margin-left: 10px;
          font-size: 16px;

          span {
            color: #28A745;
          }
        }
      }

      &-totals {
        align-self: flex-end;
        font-weight: 700;
        color: red;
        display: flex;
        align-items: center;

        div {
          font-weight: 700;
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }

    &__client {
      border: 1px solid #dedede;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      padding: 12px 20px;
      height: 100%;

      &-promocode {
        display: flex;

        .v-btn {
          margin-left: 20px;
          width: 150px;
          color: #fff !important;
        }
      }

      &-group {
        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          margin-bottom: 15px;
        }

        span {
          font-size: 16px;
          margin-bottom: 6px;
          font-weight: 700;
        }
      }

      &-address {
        position: relative;

        .results {
          border: 1px solid #DEE2E6;
          border-radius: 4px;
          overflow: hidden;
          max-height: 122px;
          position: absolute;
          bottom: 38px;
          background: #fff;
          left: 0;
          right: 0;
          opacity: 0;
          transition: .3s;
          z-index: -1;

          &.active {
            opacity: 1;
            z-index: 1;
          }

          div {
            cursor: pointer;
            height: 30px;
            padding: 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
              height: 100%;
              display: flex;
              align-items: center;
              font-size: 14px;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }

  .mix-group {

    &:not(:last-of-type) {
      border-bottom: 1px solid #dedede;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      font-weight: 700;

      span {
        margin-left: auto;
      }
    }
  }
</style>
