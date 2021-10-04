<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <div class="products">
      <v-container>
        <v-row v-if="products.length">
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-col style="padding: 16px 5px;" cols="4" v-for="product in products" :key="product.slug">
              <ProductCard :product="product" :key="product.slug"/>
            </v-col>
          </template>
          <template v-else>
            <v-col style="padding: 0 5px;" cols="12" v-for="product in products" :key="product.slug">
              <ProductCardMobile :product="product" :key="product.slug"/>
            </v-col>
          </template>
        </v-row>
        <p class="text-center mt-10" v-else>No products found by the query</p>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head: {
    title: 'Weed delivery 🚬 in Toronto, best prices — TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'TOPBUD store offer to you weeds in Toronto ✔ Best prices ✔ Weed delivery'
      }
    ]
  },
  components: {
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'ProductCardMobile': () => import('@/components/shop/ProductCardMobile'),
  },
  data() {
    return {
      products: [],
      category: {},
      sub: {},
      loading: false,
      breadcrumbs: [
        {
          link: '/',
          title: 'home'
        },
        {
          link: '/shop',
          title: 'shop'
        },
        {
          link: '/shop/search',
          title: 'search'
        },
        {
          link: null,
          title: this.$route.query.q
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  },
  watch: {
    categories() {
      if(this.categories.length && this.$route.query.q) {
        this.getProducts();
      }
    },
    '$route.query.q'() {
      this.getProducts();
      this.breadcrumbs = [
        {
          link: '/',
          title: 'home'
        },
        {
          link: '/shop',
          title: 'shop'
        },
        {
          link: '/shop/search',
          title: 'search'
        },
        {
          link: null,
          title: this.$route.query.q
        },
      ]

      this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
    }
  },
  methods: {
    getProducts() {
      this.$axios
        .get(`/search?q=${this.$route.query.q}`)
        .then(res => {
          let arr = [];
          Object.keys(res.data).map(key => {
            let category = this.categories.find(item => item.id === res.data[key].category_id);
            let sub = res.data[key].subcategory_id ? category.subs.find(item => item.id === res.data[key].subcategory_id) : null;
            res.data[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data[key].img = `https://topbudstore.com/${res.data[key].img}`;
            arr.push(res.data[key]);
          });
          this.products = arr;

        })
    }
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
    if(this.categories.length && this.$route.query.q) {
      this.getProducts();
    }
  }
}
</script>

<style lang="scss" scoped>
.products {
  margin-bottom: 60px;

  @media(max-width: 768px) {
    margin-top: 0;

    .container {

      .row {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
