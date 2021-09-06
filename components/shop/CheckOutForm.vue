<template>
  <v-dialog v-model="checkoutDialog" max-width="500">
    <template v-slot:activator="{on}">
      <div>
        <div v-if="!enabled" style="color: #DE2B2B;font-size: 18px;font-weight: 900;margin-bottom: 6px;">Minimum total amount is 60$</div>
        <v-btn color="#7FAD39" class="white--text" block depressed v-on="on" :disabled="!enabled">Checkout</v-btn>
      </div>
    </template>

    <v-card class="checkout">
      <v-card-title class="checkout__header">
        <span v-if="!orderId">New order</span>
        <span v-else>You've placed an order</span>
        <v-btn icon @click="checkoutDialog = false" v-if="!orderId"><v-icon>mdi-close</v-icon></v-btn>
        <v-btn icon @click="$store.commit('shop/EMPTY_CART'); checkoutDialog = false" v-else><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <div class="checkout__form" v-if="!orderId">
          <div class="checkout__group">
            <span>Name</span>
            <v-text-field v-model="name" label="example: Johnny Cage" solo hide-details height="40" dense/>
          </div>
          <div class="checkout__group">
            <span>Phone</span>
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
          <div class="checkout__group">
            <span>Payment</span>
            <v-select v-model="payment" solo :items="payments" height="40" dense hide-details/>
          </div>
          <div class="checkout__group" v-click-outside="onClickOutside">
            <span>Address</span>
            <div class="address">
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
          <div class="checkout__group">
            <span>Comment (optional)</span>
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
        </div>
        <div class="checkout__success" v-if="orderId">
          <v-icon size="80" color="#28A745">mdi-check-circle-outline</v-icon>
          <div>Your order id is: "<span>{{orderId}}</span>"</div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end px-5 py-5">
        <template v-if="!orderId">
          <v-btn depressed color="#6C757D" class="white--text" @click="checkoutDialog = false">Close</v-btn>
          <v-btn depressed color="#28A745" class="white--text" @click="checkout" :loading="sending">Send order</v-btn>
        </template>
        <template v-else>
          <v-btn depressed color="#6C757D" class="white--text" @click="closeDialog">Close</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckOutForm',
  props: {
    enabled: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    checkoutDialog: false,
    payment: 'cash',
    phone: '',
    name: '',
    comment: '',
    addressQuery: null,
    orderId: null,
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
    resultPicked: false
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
      mixsCart: 'shop/mixsCart',
      weights: 'shop/weights'
    })
  },
  methods: {
    closeDialog() {
      this.$store.commit('shop/EMPTY_CART');
      this.$store.commit('shop/EMPTY_MIX_CART');
      this.checkoutDialog = false;
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
        return alert('Please check your cart for products!')
      }

      let data = {
        name: this.name,
        phone: this.phone,
        address: this.addressQuery,
        order: order,
        comment: this.comment
      };

      this.$axios
        .post(`/checkout/${this.payment}`, data)
        .then(res => {
          if(res.data.success) {
            this.name = '';
            this.phone = '';
            this.address = '';
            this.orderId = res.data.order_id;
          }
        })
        .catch(err => {
          this.$toast.error('Something goes wrong...', {duration: 1500});
        })
        .finally(() => this.sending = false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkout {

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #DEE2E6;
    }

    &__form {
      padding-top: 30px;
      display: flex;
      flex-direction: column;
    }

    &__group {
      display: flex;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      span {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }

    &__success {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 250px;

      div {
        font-size: 18px;
        margin-top: 40px;

        span {
          font-weight: 900;
          color: #28A745;
        }
      }
    }
  }

  .address {
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
</style>
