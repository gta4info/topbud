<template>
  <nuxt-link
    :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
    class="card"
    :style="{backgroundImage: `url(${sub.img})`}"
    v-ripple
  >
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
  border-radius: 5px;
  height: 280px;
  width: 100%;
  overflow: hidden;
  background-size: 100%;
  background-position: center center;
  position: relative;
  transition: background-size .3s;
  padding: 36px 20px;

  &:hover {
    background-size: 120%;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(#000, .4);
  }

  &__title {
    font-size: 48px;
    font-family: "Courgette", sans-serif;
    color: #FFFFFF;
    z-index: 1;
  }
}
</style>
