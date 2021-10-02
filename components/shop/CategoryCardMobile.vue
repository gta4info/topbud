<template>
  <div class="card">
    <div
      class="card__header"
      :class="{nosubs: !category.subs.length, active: showSubs}"
      :style="{backgroundImage: `url(${category.img})`}"
      @click="handleCardClick"
      v-ripple
    >
      <div class="card__title">{{category.name}}</div>
    </div>

    <v-expand-transition>
      <div class="card__subs" v-show="showSubs">
        <nuxt-link
          class="card__subs-item"
          :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
          v-for="(sub, i) in category.subs"
          :key="i"
        >
          {{sub.name}}
        </nuxt-link>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showSubs: false
  }),
  methods: {
    handleCardClick() {
      if(this.category.subs.length) {
        this.showSubs = !this.showSubs;
      } else {
        this.$router.push({name: 'category-cslug', params: {cslug: this.category.slug}});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__title {
    font-size: 24px;
    font-family: "Courgette", serif;
    color: #fff;
    position: relative;
    z-index: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    width: 100%;
    position: relative;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    overflow: hidden;

    &.active {
      &:after {
        transform: rotate(-135deg);
      }
    }

    &.nosubs {
      &:after {
        display: none;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(#000, .4);
    }

    &:after {
      content: '';
      position: absolute;
      right: 20px;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      transition: .3s;
    }
  }

  &__subs {
    display: flex;
    flex-direction: column;
    //padding: 0 30px 30px;
    background: #FFFFFF;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 0 0 10px 10px;

    &-item {
      color: #333333 !important;
      font-size: 14px;
      padding: 0 30px;

      &:first-child {
        margin-top: 30px;
      }

      &:not(:last-of-type) {
        margin-bottom: 20px;
      }

      &:last-of-type {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
