export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    await dispatch('shop/getWeights');
    await dispatch('shop/getCategories');
  },
}
