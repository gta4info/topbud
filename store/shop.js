export const state = () => ({
  cart: [],
  weights: {},
  categories: [],
  cartLength: 0,
  mixs: {
    2: [],
    4: [],
    selected: {
      2: [],
      4: []
    },
    cart: []
  }
});

export const getters = {
  cart: state => state.cart,
  weights: state => state.weights,
  categories: state => state.categories,
  cartLength: state => state.cartLength,
  mixs: state => state.mixs,
  mixsCart: state => state.mixs.cart,
}

export const actions = {
  async setMixsCart({commit}) {
    commit('SET_MIXS_CART');
  },
  async getWeights({commit}) {
    const response = await this.$axios.get('/weights');
    commit('SET_WEIGHTS', response.data);
  },
  async getCategories({commit}) {
    const response = await this.$axios.get('/categories');
    commit('SET_CATEGORIES', response.data);
  },
  async getCartProducts({commit}) {
    let ids = [];
    if(this.$cookies.get('cart')) {
      this.$cookies.get('cart').map(item => {
        ids.push(item.product_id)
      });

      const response = await this.$axios.post('/cart', {
        ids: ids
      });
      commit('SET_CART', response.data);
    }
  },
  deleteProductFromCart({commit}, data) {
    commit('DELETE_PRODUCT_IN_CART', data);
    commit('SET_CART_LENGTH');
  }
}

export const mutations = {
  SET_CART_LENGTH(state) {
    state.cartLength = this.$cookies.get('cart') ? this.$cookies.get('cart').length : 0;
  },
  SET_MIXS(state, data) {
    state.mixs[data.type] = data.products;
  },
  DELETE_PRODUCT_FROM_SELECTED_MIXS(state, data) {
    state.mixs.selected[data.type].splice(data.key, 1)
  },
  PUSH_PRODUCT_STATE_TO_SELECTED_MIXS(state, data) {
    if(state.mixs.selected[data.type].length === data.type) return;
    state.mixs.selected[data.type].push(data.product)
  },
  SET_WEIGHTS(state, data) {
    state.weights = data;
  },
  EMPTY_CART(state) {
    this.$cookies.remove('cart');
    state.cartLength = 0;
    state.cart = [];
  },
  SET_CATEGORIES(state, data) {
    let arr = [];
    Object.keys(data).map(key => {
      data[key].img = '/' + data[key].img;
      arr.push(data[key]);

      if(data[key].subs) {
        let subs = [];
        Object.keys(data[key].subs).map(sub => {
          data[key].subs[sub].img = '/' + data[key].subs[sub].img;
          subs.push(data[key].subs[sub])
        });
        data[key].subs = subs;
      }
    });
    state.categories = arr;
  },
  SET_CART(state, data) {
    let arr = [];
    Object.keys(data).map(key => {
      let quantity = this.$cookies.get('cart').find(item => item.product_id == key).amount
      data[key].id = key;
      data[key].img = '/' + data[key].img;
      data[key].quantity = quantity;
      arr.push(data[key]);
    })
    state.cart = arr;
  },
  CHANGE_AMOUNT_OF_PRODUCT_IN_CART(state, data) {
    if(data.quantity < 1) {
      return;
    }
    state.cart.find(item => item.id === data.id).quantity = data.quantity;

    let cookies = this.$cookies.get('cart');
    cookies.find(item => item.product_id == data.id).amount = data.quantity;
    this.$cookies.set('cart', cookies)
  },
  DELETE_PRODUCT_IN_CART(state, id) {
    let index = state.cart.indexOf(state.cart.find(item => item.id === id))
    state.cart.splice(index, 1);

    let cookies = this.$cookies.get('cart');
    let key = cookies.indexOf(cookies.find(item => item.product_id === id))
    cookies.splice(key, 1);
    this.$cookies.set('cart', cookies)
  },
  SET_MIXS_CART(state) {
    state.mixs.cart = this.$cookies.get('mixs')
  },
  CHANGE_AMOUNT_OF_MIX_IN_MIXS_CART(state, data) {
    if(data.quantity < 1) {
      return;
    }
    state.mixs.cart.data[data.key].quantity = data.quantity;
  },
  DELETE_MIX_FROM_MIXS_CART(state, data) {
    state.mixs.cart.data.splice(data.key, 1);
    this.$cookies.set('mixs', state.mixs.cart)
  }
}
