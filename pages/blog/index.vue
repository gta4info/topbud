<template>
  <div class="page">
    <section class="content">
      <v-container>
        <v-row>
          <v-col cols="12" v-for="item in blog" :key="item.id">
            <nuxt-link :to="{name: 'blog-slug', params: {slug: item.slug}}" class="card">
              <div class="card__image">
                <img :src="item.img" :alt="item.name">
              </div>
              <div class="card__body">
                <h2>{{item.name}}</h2>
                <p>{{item.description}}</p>
              </div>
            </nuxt-link>
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
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Our blog fully of articles and useful information of TOPBUD store and weed`
        }
      ]
    }
  },
  name: 'about',
  async asyncData({$axios}) {
    const blog = await $axios.$get('blog');

    Object.keys(blog).map(key => {
      blog[key].img = `http://31.186.250.216:8000/${blog[key].img}`;
    })

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: null,
        title: 'Blog'
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
  .card {
    display: flex;
    color: #000;

    @media(max-width: 600px) {
      flex-direction: column;
      margin-bottom: 40px;
    }

    &__image {
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media(max-width: 768px) {
        margin-bottom: 30px;
        margin-right: 0;
      }

      img {
        max-width: 300px;
        max-height: 250px;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;

      @media(max-width: 768px) {
        align-items: center;
      }

      h2 {
        font-weight: 900;
        line-height: 1.4;
        margin-bottom: 20px;
        @media(max-width: 768px) {
          text-align: center;
        }
      }

      p {
        letter-spacing: 0.04em;
        line-height: 1.8;

        @media(max-width: 600px) {
          text-align: center;
        }
      }
    }
  }
</style>
