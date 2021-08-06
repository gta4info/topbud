

export const state = () => ({
  cart: [],
  weights: []
});

export const getters = {
  cart: state => state.cart
}

export const actions = {
  async getWeights({commit}) {
    const weights = await this.$axios.get('/weights');
    console.log(weights);
    commit('SET_WEIGHTS', weights)
  },
  addToCart({commit}, data) {
    commit('PUSH_PRODUCT_TO_CART', data);
  }
}

export const mutations = {
  SET_WEIGHTS(state, data) {
    state.weights = data;
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
