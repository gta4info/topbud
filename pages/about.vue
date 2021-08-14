<template>
  <div class="page">
    <div class="loading" v-if="loading">
      <v-progress-circular
        indeterminate
        color="#699551"
        size="30"
      />
    </div>
    <template v-else>
      <v-container>
        <nav class="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>About</li>
          </ul>
        </nav>
      </v-container>
    </template>
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
  head: {
    title: 'About | TOPBUD store',
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
    let loading = true;
    const content = await $axios.$get('static/about');
    loading = false;
    return { content, loading };
  },
}
</script>

<style scoped>

</style>
