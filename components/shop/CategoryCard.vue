<template>
  <nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}" class="card">
    <div class="card__header">
      <img :src="require(`@/assets/images/${category.image}`)" :alt="category.title">
    </div>
    <div class="card__title">{{category.title}}</div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 225px;
      width: 100%;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(#000, .2);
        opacity: 0;
        transition: .3s;
      }

      &:hover {
        &:before {
          opacity: 1;
        }
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__title {
      font-weight: 900;
      font-size: 16px;
      margin-top: 15px;
    }
  }
</style>
