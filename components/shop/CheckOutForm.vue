<template>
  <v-dialog v-model="checkoutDialog" max-width="500">
    <template v-slot:activator="{on}">
      <v-btn color="#7FAD39" class="white--text" block depressed v-on="on">Checkout</v-btn>
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
            <v-text-field v-model="phone" label="example: 437-778-7966" solo hide-details height="40" dense/>
          </div>
          <div class="checkout__group">
            <span>Payment</span>
            <v-select v-model="payment" solo :items="payments" height="40" dense hide-details/>
          </div>
          <div class="checkout__group">
            <span>Address</span>
            <v-text-field v-model="address" label="example: 20, Main str, Ontario" solo hide-details height="40" dense/>
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
          <v-btn depressed color="#6C757D" class="white--text" @click="$store.commit('shop/EMPTY_CART'); checkoutDialog = false">Close</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckOutForm',
  data: () => ({
    checkoutDialog: false,
    payment: 'cash',
    phone: '',
    name: '',
    address: '',
    orderId: null,
    payments: [
      {
        value: 'cash',
        text: 'Cash'
      },
      {
        value: 'transfer',
        text: 'Transfer'
      },
    ],
    sending: false
  }),
  computed: {
    ...mapGetters({
      cart: 'shop/cart',
      weights: 'shop/weights'
    })
  },
  methods: {
    checkout() {
      this.sending = true;
      let order = [];

      this.cart.map(item => {
        order.push({
          id: parseInt(item.id),
          count: item.quantity,
          weight_name: this.weights[item.weight_id],
          price: item.price
        })
      })

      let data = {
        name: this.name,
        phone: this.phone,
        address: this.address,
        order: order
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
          alert('Something goes wrong...');
          console.log(err.response.data.message)
        })
        .finally(() => this.sending = false);
    }
  },
  mounted () {

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
</style>
