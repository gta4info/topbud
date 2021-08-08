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
            <li>Blog</li>
          </ul>
        </nav>
      </v-container>
    </template>
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
  name: 'about',
  data: () => ({
    loading: true,
    blog: []
  }),
  created () {
    this.$axios
      .get('/blog')
      .then(res => {
        let arr = [];
        Object.keys(res.data).map(key => {
          res.data[key].img = `http://31.186.250.216:8000/${res.data[key].img}`;
          arr.push(res.data[key]);
        })
        this.blog = arr;
        this.loading = false;
      })
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
