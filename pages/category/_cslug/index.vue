<template>
  <div class="page">
    <div class="loading" v-if="!Object.keys(categories).length || loading">
      <v-progress-circular
        indeterminate
        color="#699551"
        size="30"
      />
    </div>
    <template v-else>
      <v-container>
        <h1>{{category.name}} products</h1>
        <nav class="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/shop">Shop</nuxt-link>
            </li>
            <li>{{ category.name }}</li>
          </ul>
        </nav>
      </v-container>

      <div class="products">
        <v-container>
          <v-row v-if="category.subs.length">
            <v-col md="3" sm="12" v-for="(item, i) in category.subs" :key="i">
              <SubCategoryCard :category="category" :sub="item"/>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col md="2" sm="12">
              <Filters :min="min" :max="max" :range="range" :search="search"/>
            </v-col>
            <v-col md="10" sm="12">
              <v-container>
                <v-row v-if="productsFiltered.length">
                  <v-col md="3" sm="12" v-for="product in productsFiltered" :key="product.slug">
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </v-row>
                <p class="text-center" v-else>No products with selected filters was found</p>
              </v-container>
            </v-col>
          </v-row>
          <p class="text-center" v-else>No products was found in this category</p>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: `${this.category.name} products | TOPBUD store`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Our shop ${this.category.name} products we offer with TOPBUD store`
        }
      ]
    }
  },
  components: {
    'SubCategoryCard': () => import('@/components/shop/SubCategoryCard'),
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'Filters': () => import('@/components/shop/Filters'),
  },
  async asyncData({error, $axios, params, store}) {
    let category = store.state.shop.categories.find(item => item.slug === params.cslug);

    if(category == undefined) {
      return error({ statusCode: 404 })
    }

    const data = await $axios.$get(`/products?cid=${category.id}`);

    let products = [];
    let min = 0, max = 0;

    Object.keys(data.products).map(key => {
      let category = store.state.shop.categories.find(item => item.slug === params.cslug);
      let sub = data.products[key].subcategory_id ? category.subs.find(item => item.id === data.products[key].subcategory_id) : null

      data.products[key].search = {
        cslug: category.slug,
        sslug: sub ? sub.slug : null,
      }
      data.products[key].img = `/${data.products[key].img}`
      products.push(data.products[key])

      data.products[key].prices.map(price => {
        if (price.deal_price) {
          if (min > price.deal_price) {
            min = price.deal_price;
          }
          if (max < price.deal_price) {
            max = price.deal_price;
          }
        } else {
          if (min > price.price) {
            min = price.price;
          }
          if (max < price.price) {
            max = price.price;
          }
        }
      })
    })

    if (min === 0) {
      min = products.length ? products[0].prices[0].price : 0
    }

    min = Math.ceil(min - 1) > 0 ? Math.ceil(min - 1) : 0;
    max = Math.ceil(max + 1);

    let range = [min, max];

    let loading = false;

    return {products, category, min, max, range, loading}
  },
  data: () => ({
    loadingFiltered: false,
    search: ''
  }),
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
    productsFiltered() {
      return this.products.filter(item => {
        let re = new RegExp(this.search, 'ig');
        if(item.name.match(re)) {
          return item;
        } else {
          if(!this.search) {
            return item;
          }
        }
      })
    }
  },
  watch: {
    range () {
      this.getFilteredProducts()
    },
  },
  methods: {
    getProducts () {
      this.loading = true;

      let category = this.categories.find(item => item.slug === this.$route.params.cslug);
      this.category = category;

      this.$axios
        .get(`/products?cid=${category.id}`)
        .then(res => {
          let arr = [];
          let min = 0, max = 0;

          Object.keys(res.data.products).map(key => {
            let category = this.categories.find(item => item.id === res.data.products[key].category_id)
            let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null

            res.data.products[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data.products[key].img = `/${res.data.products[key].img}`
            arr.push(res.data.products[key])

            res.data.products[key].prices.map(price => {
              if(price.deal_price) {
                if(min > price.deal_price) {
                  min = price.deal_price;
                }
                if(max < price.deal_price) {
                  max = price.deal_price;
                }
              } else {
                if(min > price.price) {
                  min = price.price;
                }
                if(max < price.price) {
                  max = price.price;
                }
              }
            })
          })

          this.min = min;
          this.max = max;
          this.range = [min,max];

          this.products = arr

          this.loading = false
        })
    },
    getFilteredProducts () {
      if (this.loadingFiltered) return;

      let data = {
        min: this.range[0],
        max: this.range[1]
      }

      this.loadingFiltered = true
      this.$axios
        .post(`/products?cid=${this.category.id}`, data)
        .then(res => {
          let arr = []
          Object.keys(res.data.products).map(key => {
            let category = this.categories.find(item => item.id === res.data.products[key].category_id)
            let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null

            res.data.products[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data.products[key].img = `/${res.data.products[key].img}`
            arr.push(res.data.products[key])
          })

          this.products = arr

          this.loadingFiltered = false
        })
    }
  },
  created () {
    this.$root.$on('change-filter-range', data => {
      this.range = data
    })
    this.$root.$on('change-filter-search-query', data => {
      this.search = data;
    })
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
