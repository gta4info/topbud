<template>
  <div>
    <nuxt-link
      :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
      class="card"
    >
      <div class="card__header">
        <img :src="sub.img" :alt="sub.name">
      </div>
      <div class="card__title">{{sub.name}}</div>
    </nuxt-link>
  </div>
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
  padding: 15px;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(180deg, transparent 0%, transparent 50%, #fff 100%);
  }

  &:hover {
    .card__header {
      transform: scale(1.2);
    }
    .card__title {
      bottom: 25px;
    }
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 225px;
    width: 100%;
    transition: .3s;
    margin-bottom: 40px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: linear-gradient(180deg, #fff 0%, transparent 30%, transparent 70%, #fff 100%);
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: linear-gradient(90deg, #fff 0%, transparent 30%, transparent 70%, #fff 100%);
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
    transition: .3s;
    z-index: 1;
    bottom: 15px;
    position: absolute;
    width: calc(100% - 30px);
    text-align: center;
  }
}
</style>
