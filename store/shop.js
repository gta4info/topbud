import Vue from 'vue'

export const state = () => ({
  cart: [],
  weights: {},
  categories: [],
  cartLength: 0,
  mixs: {
    2: [],
    4: [],
    selected: {
      2: [{},{}],
      4: [{},{}]
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
  mixsSelected: state => state.mixs.selected
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
        ids.push([item.product_id, 0])
      });

      const response = await this.$axios.post('/cart', {
        ids: ids
      });
      commit('SET_CART', response.data.result);
    }
  },
  async getMixProducts({commit, state}) {
    let ids = [];

    if(state.mixs.cart.data) {
      state.mixs.cart.data.map(mix => {
        mix.products[0].map(item => {
          if(!ids.find(id => id === item.id)) {
            ids.push([item.id, mix.weight])
          }
        })
      })
    }

    const response = await this.$axios.post('/cart', {
      ids: ids
    });
    commit('UPDATE_MIXS_PRICES', response.data.result);
  },
  deleteProductFromCart({commit}, data) {
    commit('DELETE_PRODUCT_IN_CART', data);
    commit('SET_CART_LENGTH');
  },
  changeMixProductAmount({commit}, data) {
    if(data.quantity < 1) {
      return false;
    }
    commit('CHANGE_AMOUNT_OF_PRODUCT_IN_MIXS', data);
    return true;
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
    state.mixs[data.type].find(item => item.id === data.id).selected = false;
    state.mixs.selected[data.type].splice(data.key, 1)
    if(state.mixs.selected[data.type].length === 1) {
      state.mixs.selected[data.type].push({});
    }
  },
  PUSH_PRODUCT_TO_SELECTED_MIXS(state, data) {
    if(!state.mixs.selected[data.type].find(item => item.id === data.product.id)) {
      data.product.quantity = 1;
      data.product.selected = true;
      state.mixs.selected[data.type].unshift(data.product);

      Vue.set(state.mixs.selected[data.type], data.key, data.product)

      let firstEmpty = state.mixs.selected[data.type].indexOf(state.mixs.selected[data.type].find(item => !item.id));
      if (firstEmpty >= 0) {
        state.mixs.selected[data.type].splice(firstEmpty, 1)
      }
      if (!state.mixs.selected[data.type].find(item => !item.id)) {
        state.mixs.selected[data.type].unshift({});
      }
    }
  },
  SET_WEIGHTS(state, data) {
    state.weights = data;
  },
  EMPTY_CART(state) {
    this.$cookies.remove('cart');
    state.cartLength = 0;
    state.cart = [];
  },
  EMPTY_MIX_CART(state) {
    this.$cookies.remove('mixs');
    state.mixs.cart = [];
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
    data.map(p => {
      let quantity = this.$cookies.get('cart').find(item => item.product_id === p.id).amount
      p.img = '/' + p.img;
      p.quantity = quantity;
      return p;
    })
    state.cart = data;
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
    state.mixs.cart = this.$cookies.get('mixs') ?? [];
  },
  CHANGE_AMOUNT_OF_MIX_IN_MIXS_CART(state, data) {
    if(data.quantity < 1) {
      return;
    }
    state.mixs.cart.data[data.key].quantity = data.quantity;
    this.$cookies.set('mixs', state.mixs.cart)
  },
  DELETE_MIX_FROM_MIXS_CART(state, data) {
    state.mixs.cart.data.splice(data.key, 1);
    this.$cookies.set('mixs', state.mixs.cart)
  },
  CLEAR_SELECTED_MIXS(state, data) {
    state.mixs.selected[data.type] = [];
  },
  UPDATE_MIXS_PRICES(state, data) {
    if(state.mixs.cart.data) {
      data.map(d => {
        state.mixs.cart.data.map(item => {
          item.products[0].map(p => {
            if(p.id === d.id) {
              p.price = d.price;
            }
            return p;
          });
          return item;
        });
      })
      state.mixs.cart.data.map(item => {
        let price = 0;
        item.products[0].map(p => {
          price = price + p.price * p.quantity;
        });
        item.price = price;
        return item;
      });
    }
  },
  CHANGE_AMOUNT_OF_PRODUCT_IN_MIXS(state, data) {
    let item = data.product;
    item.quantity = data.quantity;
    Vue.set(state.mixs.selected[data.type], data.key, item)
  },
}
