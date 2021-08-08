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
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
            <li><nuxt-link to="/blog">Blog</nuxt-link></li>
            <li>{{ content.name }}</li>
          </ul>
        </nav>
      </v-container>
    </template>
    <section class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="blog__top">
              <h1>{{ content.name }}</h1>
              <img :src="content.img" :alt="content.name">
            </div>
          </v-col>
          <v-col cols="12">
            <div v-html="content.blog" class="blog__html"></div>
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
    content: {},
  }),
  created () {
    this.$axios
      .get(`/blog?slug=${this.$route.params.slug}`)
      .then(res => {
        let data = res.data[Object.keys(res.data)[0]];
        data.img = `http://31.186.250.216:8000/${data.img}`;
        this.content = data;
        this.loading = false;
      })
  }
}
</script>

<style lang="scss" scoped>
.blog {
  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 30px;
    }

    img {
      margin-bottom: 40px;
    }

    &__html {
      div {
        @media(max-width: 768px) {
          max-width: 100% !important;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
