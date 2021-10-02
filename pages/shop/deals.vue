<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <div class="products">
      <v-container>
        <v-row>
          <v-col
            md="3"
            sm="12"
            :class="{'pb-0': $vuetify.breakpoint.smAndDown}"
            :style="$vuetify.breakpoint.smAndDown ? 'position: sticky;top: 0;background: #fff;z-index: 2' : ''"
          >
            <Filters :min="min" :max="max" :search="search" v-if="$vuetify.breakpoint.mdAndUp"/>
            <FiltersMobile :min="min" :max="max" :search="search" v-else/>
          </v-col>
          <v-col md="9" sm="12" :class="{'pt-0': $vuetify.breakpoint.smAndDown}">
            <v-container class="py-0">
              <v-row v-if="productsFiltered.length">
                <v-col cols="12" :class="{'px-0': $vuetify.breakpoint.smAndDown}">
                  <div class="sorting" style="margin: 18px 0;">
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
                <v-col md="4" sm="6" style="padding: 16px 5px;" v-if="$vuetify.breakpoint.mdAndUp">
                  <MixCard/>
                  <DealCard/>
                  <DealCardMobile/>
                </v-col>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-col cols="4" style="padding: 16px 5px;">
                    <MixCard/>
                    <DealCard/>
                  </v-col>
                  <v-col style="padding: 16px 5px;" cols="4" v-for="product in productsFiltered" :key="product.slug">
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="6" class="pl-0 pt-0">
                    <MixCard/>
                  </v-col>
                  <v-col cols="6" class="pr-0 pt-0">
                    <DealCardMobile/>
                  </v-col>
                  <v-col style="padding: 0 5px;" cols="12" v-for="product in productsFiltered" :key="product.slug">
                    <ProductCardMobile :product="product" :key="product.slug"/>
                  </v-col>
                </template>
              </v-row>
              <p class="text-center" v-else>No products with selected filters was found</p>
            </v-container>
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
    'DealCardMobile': () => import('@/components/shop/DealCardMobile'),
    'MixCard': () => import('@/components/shop/MixCard'),
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'ProductCardMobile': () => import('@/components/shop/ProductCardMobile'),
    'Filters': () => import('@/components/shop/Filters'),
    'FiltersMobile': () => import('@/components/shop/FiltersMobile'),
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
            subs: subs,
            showSubs: true
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
      data.products[key].img = `https://topbudstore.com/${data.products[key].img}`;
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

    let breadcrumbs = [
      {
        link: '/',
        title: 'home'
      },
      {
        link: '/shop',
        title: 'shop'
      },
      {
        link: null,
        title: 'Deals'
      },
    ]

    return {products, categoriesFilter, min, max, range, breadcrumbs}
  },
  data: () => ({
    loadingFiltered: false,
    categoriesFilter: [],
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
  }),
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
                    subs: subs,
                    showSubs: true
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
              res.data.products[key].img = `https://topbudstore.com/${res.data.products[key].img}`;
              arr.push(res.data.products[key]);
            });

            this.products = arr;

            this.loadingFiltered = false;
          })
      }
    }
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
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
      }

      .col-sm-6 {
        max-width: 50%;
      }

      .col-sm-12 {
        flex: 1 0 100%;
      }
    }
  }
}
</style>
