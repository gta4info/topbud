<template>
  <div class="page">
    <section class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="blog__top">
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
    const data = await $axios.$get(`/blog?slug=${params.slug}`);

    let blog = data[Object.keys(data)[0]];
    blog.img = `https://topbudstore.com/${blog.img}`;

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: '/blog',
        title: 'blog'
      },
      {
        link: null,
        title: blog.name
      },
    ]

    return { blog, breadcrumbs };
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
  }
}
</script>

<style lang="scss" scoped>
.blog {
  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 768px) {
      img {
        max-width: 100%;
      }
    }

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
