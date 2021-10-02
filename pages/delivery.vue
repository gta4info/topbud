<template>
  <div class="page">
    <section class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div v-html="content"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  head: {
    title: 'Delivery information | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Delivery information for the best weed with TOPBUD store'
      }
    ]
  },
  name: 'delivery',
  async asyncData({$axios}) {
    const content = await $axios.$get('static/deliveryinfo');

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: null,
        title: 'Delivery Information'
      },
    ]

    return { content, breadcrumbs };
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
  }
}
</script>

<style scoped>

</style>
