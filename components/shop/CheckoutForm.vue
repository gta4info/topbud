<template>
  <div class="checkout">
    <div class="checkout__client">
      <div class="checkout__title"><img src="@/static/images/cart-client-icon.png" alt="Client information">Client information</div>
      <div class="checkout__client-group">
        <v-text-field v-model="name" label="Name *" solo hide-details height="50" dense/>
      </div>
      <div class="checkout__client-group">
        <v-text-field
          v-model="phone"
          label="Phone *"
          solo
          hide-details
          height="50"
          dense
          inputmode="numeric"
          name="phone"
          pattern="[0-9]*"
          type="number"
        />
      </div>
      <div class="checkout__client-group">
        <v-select v-model="payment" solo :items="payments" height="50" dense hide-details placeholder="Payment *"/>
      </div>
      <div class="checkout__client-group" v-click-outside="onClickOutside">
        <div class="checkout__client-address">
          <v-text-field
            v-model="addressQuery"
            solo
            dense
            height="50"
            hide-details
            label="Address *"
            @focus="showResults = true"
            @input="resultPicked = false"
          />
          <div class="results" :class="{active: results.length && showResults}">
            <div v-for="(result, i) in results" :key="i" @click="onResultSelected(result.text)"><span>{{result.text}}</span></div>
          </div>
        </div>
      </div>
      <div class="checkout__client-group">
        <v-text-field
          v-model="comment"
          label="Comment"
          solo
          hide-details
          height="50"
          dense
          name="comment"
        />
      </div>
      <div class="checkout__client-group">
        <div class="checkout__client-promocode">
          <v-text-field
            v-model="promocode"
            label="Promocode"
            solo
            hide-details
            height="50"
            dense
            name="promocode"
            :disabled="promocodeDisabled"
          />
          <v-btn
            depressed
            @click="applyPromocode"
            height="50"
            color="#28A745"
            :disabled="promocodeDisabled || this.promocode.length === 0 || !checkRequiredFields"
            :loading="applyingPromocode"
          >
            Apply
          </v-btn>
        </div>
      </div>
      <v-btn
        class="checkout__btn"
        depressed
        color="#28A745"
        @click="checkout"
        :loading="sending"
        height="60"
        :disabled="!checkRequiredFields"
      >
        Send order
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
            this.promocodeIsPercent = res.data.isPercent;
            this.promocodeValue = res.data.value;
            this.promocodeApplied = true;

            this.$toast.success('Promocode has been applied successfully!', {duration: 1500})
          } else {
            this.$toast.error(res.data.message, {duration: 5000})
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
    margin-left: 5px;
    padding-top: 12px;
    position: sticky;
    top: 60px;

    @media(max-width: 768px) {
      margin-left: 0;
      padding-top: 0;
    }

    &__title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;

      img {
        margin-right: 20px;
      }
    }

    &__client {
      display: flex;
      flex-direction: column;
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
          margin-bottom: 20px;
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

    &__btn {
      font-weight: 700;
      font-size: 20px;
      color: #ffffff;
      text-transform: none;
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
