<template>
  <nuxt-link
    :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
    class="card"
  >
    <div class="card__header">
      <img :src="sub.img" :alt="sub.name">
    </div>
    <div class="card__title">{{sub.name}}</div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    },
    sub: {
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
  border: 1px solid #E9E9E9;
  border-radius: 8px;
  height: 100%;

  &:hover {
    .card__header img {
      transform: scale(1.2);
    }
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    border-bottom: 1px solid #E9E9E9;
    flex-grow: 1;

    img {
      width: 100%;
      transition: .3s;
    }
  }

  &__title {
    font-weight: 900;
    font-size: 16px;
    width: calc(100% - 30px);
    text-align: center;
    padding: 20px 10px;
  }
}
</style>
