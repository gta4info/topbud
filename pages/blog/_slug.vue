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
            <li>{{ blog.name }}</li>
          </ul>
        </nav>
      </v-container>
    </template>
    <section class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="blog__top">
              <h1>{{ blog.name }}</h1>
              <img :src="blog.img" :alt="blog.name">
            </div>
          </v-col>
          <v-col cols="12">
            <div v-html="blog.blog" class="blog__html"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  head() {
    return {
      title: `${this.blog.name} | TOPBUD store`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blog.blog.substr(0,50) + '...'
        }
      ]
    }
  },
  name: 'blog_slug',
  async asyncData({$axios, params}) {
    let loading = true;
    const data = await $axios.$get(`/blog?slug=${params.slug}`);

    let blog = data[Object.keys(data)[0]];
    // blog.img = `http://31.186.250.216:8000/${blog.img}`;

    loading = false;
    return { blog, loading };
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
