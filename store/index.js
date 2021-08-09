export const state = () => ({
  footerLinks: []
})

export const getters = {
  footerLinks: state => state.footerLinks
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    await dispatch('shop/getWeights');
    await dispatch('shop/getCategories');
    await dispatch('getFooterLinks');
  },
  async getFooterLinks({commit}) {
    const response = await this.$axios.get('/links')
    commit('SET_FOOTER_LINKS', response.data.links)
  }
}

export const mutations = {
  SET_FOOTER_LINKS(state, data) {
    state.footerLinks = data;
  }
}
