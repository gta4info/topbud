export const state = () => ({
  cart: [
    {
      image: '1.webp',
      title: 'Budda Gas Mask (AAAA+)',
      weight: '1 oz (28g)',
      price: 200,
      quantity: 1,
      id: 1
    },
    {
      image: '2.webp',
      title: 'Sour Tangie',
      weight: '1 oz (28g)',
      price: 130,
      quantity: 1,
      id: 2
    }
  ],
});

export const getters = {
  cart: state => state.cart
}

export const actions = {
  addToCart({commit}, data) {
    commit('PUSH_PRODUCT_TO_CART', data);
  }
}

export const mutations = {
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
