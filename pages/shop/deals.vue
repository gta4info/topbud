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
        <h1>OZ deals</h1>
        <nav class="breadcrumbs">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
            <li>Deals</li>
          </ul>
        </nav>
      </v-container>

      <div class="products">
        <v-container>
          <v-row>
            <v-col md="2" sm="12" class="py-0 px-0">
              <Filters :min="min" :max="max" :range="range" :categories="categoriesFilter" :search="search"/>
            </v-col>
            <v-col md="10" sm="12">
              <v-container>
                <v-row v-if="productsFiltered.length">
                  <v-col md="3" sm="12">
                    <MixCard/>
                  </v-col>
                  <v-col md="3" sm="12">
                    <DealCard/>
                  </v-col>
                  <v-col
                    md="3"
                    sm="12"
                    v-for="product in productsFiltered"
                    :key="product.slug"
                  >
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </v-row>
                <p class="text-center" v-else>No products with selected filters was found</p>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Weed delivery 🚬 OZ Deals in Toronto, best prices — TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'TOPBUD store offer to you oz Deals in Toronto ✔ Best prices ✔ Weed delivery'
      }
    ]
  },
  components: {
    'DealCard': () => import('@/components/shop/DealCard'),
    'MixCard': () => import('@/components/shop/MixCard'),
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'Filters': () => import('@/components/shop/Filters'),
  },
  async asyncData({$axios, params, store}) {
    const data = await $axios.$get('/deals');
    let products = [];
    let cats = [];

    Object.keys(data.products).map(key => {
      let subs = [];

      let category = store.state.shop.categories.find(item => item.id === data.products[key].category_id);
      let sub = data.products[key].subcategory_id ? category.subs.find(item => item.id === data.products[key].subcategory_id) : null;

      if(category.subs && category.subs.length) {
        category.subs.map(sub => {
          if(subs.length) {
            if(!subs.find(i => i.id === sub.id)) {
              subs.push({
                id: sub.id,
                name: sub.name,
                selected: true,
              })
            }
          } else {
            subs.push({
              id: sub.id,
              name: sub.name,
              selected: true,
            })
          }
        })
      }

      if(cats.length) {
        if(!cats.find(cat => cat.id === category.id)) {
          cats.push({
            id: category.id,
            name: category.name,
            selected: true,
            subs: subs
          });
        }
      } else {
        cats.push({
          id: category.id,
          name: category.name,
          selected: true,
          subs: subs,
          showSubs: true
        });
      }

      data.products[key].search = {
        cslug: category.slug,
        sslug: sub ? sub.slug : null,
      }
      data.products[key].img = `/${data.products[key].img}`;
      products.push(data.products[key]);
    });

    let categoriesFilter = cats;

    let min = products[0].prices[0].price, max = products[0].prices[0].price;
    products.map(item => {
      item.prices.map(price => {
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

    min = Math.ceil(min - 1) > 0 ? Math.ceil(min - 1) : 0;
    max = Math.ceil(max + 1);

    let range = [min, max];

    let loading = false;

    return {products, categoriesFilter, min, max, range, loading}
  },
  data: () => ({
    loadingFiltered: false,
    categoriesFilter: [],
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
    min() {
      this.getFilteredProducts();
    },
    max() {
      this.getFilteredProducts();
    },
    categoriesFilter: {
      handler() {
        this.getFilteredProducts();
      },
      deep: true
    }
  },
  methods: {
    getFilteredProducts() {
      if(this.loadingFiltered) return;
      let cats = [];
      let subs = [];
      this.categoriesFilter.map(cat => {
        if(cat.selected) {
          cats.push(cat.id);
          if(cat.subs && cat.subs.length) {
            cat.subs.map(sub => {
              if(sub.selected) {
                subs.push(sub.id)
              }
            })
          }
        }
      })
      let data = {
        min: this.min ? this.min : 1,
        max: this.max ? this.max : 2,
        cats: cats,
        subs: subs,
      }

      console.log(data)

      if(data.cats.length) {

        this.loadingFiltered = true;
        this.$axios
          .post('/deals', data)
          .then(res => {
            let arr = [];
            let cats = [];
            Object.keys(res.data.products).map(key => {
              let subs = [];

              let category = this.categories.find(item => item.id === res.data.products[key].category_id);
              let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null;

              if(category.subs && category.subs.length) {
                category.subs.map(sub => {
                  if(subs.length) {
                    if(!subs.find(i => i.id === sub.id)) {
                      subs.push({
                        id: sub.id,
                        name: sub.name,
                        selected: true,
                      })
                    }
                  } else {
                    subs.push({
                      id: sub.id,
                      name: sub.name,
                      selected: true,
                    })
                  }
                })
              }

              if(cats.length) {
                if(!cats.find(cat => cat.id === category.id)) {
                  cats.push({
                    id: category.id,
                    name: category.name,
                    selected: true,
                    subs: subs
                  });
                }
              } else {
                cats.push({
                  id: category.id,
                  name: category.name,
                  selected: true,
                  subs: subs,
                  showSubs: true
                });
              }

              res.data.products[key].search = {
                cslug: category.slug,
                sslug: sub ? sub.slug : null,
              }
              res.data.products[key].img = `/${res.data.products[key].img}`;
              arr.push(res.data.products[key]);
            });

            this.products = arr;

            this.loadingFiltered = false;
          })

      }
    }
  },
  created () {
    this.$root.$on('change-filter-range', data => {
      this.min = data.min;
      this.max = data.max;
    })
    this.$root.$on('change-filter-categories', data => {
      this.categoriesFilter = data;
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
