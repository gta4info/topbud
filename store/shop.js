export const state = () => ({
  cart: [],
  weights: {},
  categories: []
});

export const getters = {
  cart: state => state.cart,
  weights: state => state.weights,
  categories: state => state.categories,
}

export const actions = {
  async getWeights({commit}) {
    const response = await this.$axios.get('/weights');
    commit('SET_WEIGHTS', response.data);
  },
  async getCategories({commit}) {
    const response = await this.$axios.get('/categories');
    commit('SET_CATEGORIES', response.data);
  },
  addToCart({commit}, data) {
    commit('PUSH_PRODUCT_TO_CART', data);
  }
}

export const mutations = {
  SET_WEIGHTS(state, data) {
    state.weights = data;
  },
  SET_CATEGORIES(state, data) {
    let arr = [];
    Object.keys(data).map(key => {
      data[key].img = 'http://31.186.250.216:8000/' + data[key].img;
      arr.push(data[key]);

      if(data[key].subs) {
        let subs = [];
        Object.keys(data[key].subs).map(sub => {
          data[key].subs[sub].img = 'http://31.186.250.216:8000/' + data[key].subs[sub].img;
          subs.push(data[key].subs[sub])
        });
        data[key].subs = subs;
      }
    });
    state.categories = arr;
  },
  PUSH_PRODUCT_TO_CART(state, data) {
    state.cart.push(data);
  },
  CHANGE_AMOUNT_OF_PRODUCT_IN_CART(state, data) {
    if(data.quantity < 1) {
      return;
    }
    state.cart.find(item => item.id === data.id).quantity = data.quantity;
  },
  DELETE_PRODUCT_IN_CART(state, id) {
    let index = state.cart.indexOf(state.cart.find(item => item.id === id))
    state.cart.splice(index, 1);
  }
}
