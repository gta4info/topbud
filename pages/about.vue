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
  name: 'about',
  data: () => ({
    loading: true,
    content: null
  }),
  created () {
    this.$axios
      .get('/static/about')
      .then(res => {
        this.content = res.data;
        this.loading = false;
      })
  }
}
</script>

<style scoped>

</style>
