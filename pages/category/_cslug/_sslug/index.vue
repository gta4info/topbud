<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <div class="products">
      <v-container>
        <v-row>
          <v-col
            md="3"
            sm="12"
            style="position: sticky;top: 0;background: #fff;z-index: 2"
            :class="$vuetify.breakpoint.smAndDown ? 'py-0' : ''"
          >
            <Filters :min="min" :max="max" :range="range" :search="search" v-if="$vuetify.breakpoint.mdAndUp"/>
            <v-text-field
              v-model="search"
              solo
              dense
              hide-details
              clearable
              label="Type something to search"
              class="filter__input"
              @keypress.enter="$event.target.blur()"
              v-else
            />
          </v-col>
          <v-col md="9" sm="12" :class="{'pt-0': $vuetify.breakpoint.smAndDown}">
            <v-container>
              <v-row v-if="productsFiltered.length">
                <v-col cols="12" :class="{'px-0 pt-0': $vuetify.breakpoint.smAndDown}">

                  <FiltersMobile :min="min" :max="max" :range="range" :search="search" v-if="$vuetify.breakpoint.smAndDown"/>
                  <div class="sorting" style="margin-top: 10px;">
                    <v-select
                      v-model="selectedSorting"
                      :items="sorting"
                      value="value"
                      text="text"
                      outlined
                      height="30"
                      dense
                      hide-details
                    />
                  </div>
                </v-col>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-col style="padding: 16px 5px;" cols="4" v-for="product in productsFiltered" :key="product.slug">
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </template>
                <template v-else>
                  <v-col style="padding: 0 5px;" cols="12" v-for="product in productsFiltered" :key="product.slug">
                    <ProductCardMobile :product="product" :key="product.slug"/>
                  </v-col>
                </template>
              </v-row>
              <p class="text-center mt-10" v-else>No products with selected filters was found</p>
            </v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <HowToSmoke />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head() {
    return {
      title: `Weed delivery 🚬 ${this.category.name} ${this.sub.name} in Toronto, best prices — TOPBUD store`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `TOPBUD store offer to you a ${this.category.name} ${this.sub.name} weeds in Toronto ✔ Best prices ✔ Weed delivery`
        }
      ]
    }
  },
  components: {
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'ProductCardMobile': () => import('@/components/shop/ProductCardMobile'),
    'Filters': () => import('@/components/shop/Filters'),
    'FiltersMobile': () => import('@/components/shop/FiltersMobile'),
    'HowToSmoke': () => import('@/components/shop/HowToSmoke'),
  },
  async asyncData({$axios, params, store}) {
    let category = store.state.shop.categories.find(item => item.slug === params.cslug);
    let sub = category.subs.find(item => item.slug === params.sslug);

    if(category == undefined || sub == undefined) {
      return error({ statusCode: 404 })
    }

    const data = await $axios.$get(`/products?cid=${category.id}&sid=${sub.id}`);

    let products = [];
    let min = 0, max = 0;

    Object.keys(data.products).map(key => {
      data.products[key].search = {
        cslug: category.slug,
        sslug: sub.slug,
      }

      data.products[key].img = `https://topbudstore.com/${data.products[key].img}`
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

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: '/shop',
        title: 'categories'
      },
      {
        link: `/category/${category.slug}`,
        title: category.name.toLowerCase()
      },
      {
        link: null,
        title: sub.name
      },
    ]

    return {products, category, sub, min, max, range, breadcrumbs}
  },
  data() {
    return {
      loadingFiltered: false,
      search: '',
      selectedSorting: 1,
      sorting: [
        {
          text: 'Price: Low to High',
          value: 1
        },
        {
          text: 'Price: High to Low',
          value: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
    productsFiltered() {
      let bySearch = this.products.filter(item => {
        let re = new RegExp(this.search, 'ig');
        if(item.name.match(re)) {
          return item;
        } else {
          if(!this.search) {
            return item;
          }
        }
      });

      if(this.selectedSorting === 1) {
        return bySearch.sort((a, b) => {return a.prices[0].price - b.prices[0].price})
      }

      if(this.selectedSorting === 2) {
        return bySearch.sort((a, b) => {return b.prices[0].price - a.prices[0].price})
      }
    }
  },
  watch: {
    min() {
      this.getFilteredProducts();
    },
    max() {
      this.getFilteredProducts();
    },
  },
  methods: {
    getFilteredProducts () {
      if (this.loadingFiltered) return;

      let data = {
        min: this.min,
        max: this.max
      }

      this.loadingFiltered = true
      this.$axios
        .post(`/products?cid=${this.category.id}&sid=${this.sub.id}`, data)
        .then(res => {
          let arr = []
          Object.keys(res.data.products).map(key => {
            res.data.products[key].search = {
              cslug: this.category.slug,
              sslug: this.sub.slug,
            }
            res.data.products[key].img = `https://topbudstore.com/${res.data.products[key].img}`
            arr.push(res.data.products[key])
          })

          this.products = arr

          this.loadingFiltered = false
        })
    }
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
    this.$root.$on('change-filter-range', data => {
      this.min = data.min;
      this.max = data.max;
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

  .filter__input {
    margin: 10px 0;
  }
</style>
