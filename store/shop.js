export const state = () => ({
  cart: [
    {
      category: {
        slug: 'flower',
        title: 'Flower',
      },
      slug: 'la_kush_king_aaaaa',
      title: 'LA Kush King (AAAAA)',
      weight: '1 oz (28g)',
      old_price: '240',
      price: '220',
      image: '1.webp',
      id: 1,
    },
    {
      category: {
        slug: 'edibles',
        title: 'Edibled',
      },
      slug: 'tahoe_og_kush_aaaa',
      title: 'Tahoe OG Kush (AAAA)',
      weight: '1 oz (28g)',
      old_price: '200',
      price: '180',
      image: '2.webp',
      id: 2,
    },
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
  }
}
