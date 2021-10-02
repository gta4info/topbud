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
    title: 'Contact us | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: "TOPBUD's store contact information"
      }
    ]
  },
  name: 'about',
  async asyncData({$axios}) {
    const content = await $axios.$get('static/contactinfo');

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: null,
        title: 'Contacts Information'
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
