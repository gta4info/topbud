<template>
  <div>
<!--    <TopBar />-->
<!--    <Search />-->
<!--    <Carousel />-->

    <div class="categories">
      <v-container>
        <v-row>
          <v-col md="3" sm="12" v-for="(category, i) in categories" :key="i">
            <CategoryCard :category="category"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'TopBar': () => import('@/components/shop/TopBar'),
    'Search': () => import('@/components/shop/Search'),
    'Carousel': () => import('@/components/shop/Carousel'),
    'CategoryCard': () => import('@/components/shop/CategoryCard'),
  },
  data: () => ({
    categories: [
      {
        slug: 'deals',
        image: 'deals.png',
        title: 'Hot deals'
      },
      {
        slug: 'new',
        image: 'new.png',
        title: 'New'
      },
      {
        slug: 'flower',
        image: 'flower.webp',
        title: 'Flower'
      },
      {
        slug: 'edibles',
        image: 'edibles.webp',
        title: 'Edibles'
      },
      {
        slug: 'shatters',
        image: 'shatters.webp',
        title: 'Shatters'
      },
      {
        slug: 'deals',
        image: 'deals.png',
        title: 'Hot deals'
      },
      {
        slug: 'new',
        image: 'new.png',
        title: 'New'
      },
      {
        slug: 'flower',
        image: 'flower.webp',
        title: 'Flower'
      },
      {
        slug: 'edibles',
        image: 'edibles.webp',
        title: 'Edibles'
      },
      {
        slug: 'shatters',
        image: 'shatters.webp',
        title: 'Shatters'
      },
    ]
  })
}
</script>

<style lang="scss" scoped>
  .categories {
    margin: 60px 0 ;
  }
</style>
