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
    title: 'About',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Find out who we are and what we are doing'
      }
    ]
  },
  name: 'about',
  async asyncData({$axios}) {
    const content = await $axios.$get('static/about');

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: null,
        title: 'About'
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
