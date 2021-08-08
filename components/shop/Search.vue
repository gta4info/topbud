<template>
  <v-form class="search" @submit.prevent="submit">
    <div class="search__container" @mouseenter="show = true">
      <div class="search__input" :class="{'show': show}">
        <input
          v-model="query"
          placeholder="What do you need?"
          required
        />
      </div>
      <v-btn icon @click="submit" depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    query: '',
    show: false
  }),
  watch: {
    query() {
      this.show = !!this.query;
    }
  },
  methods: {
    submit() {
      alert(this.query)
    }
  }
}
</script>

<style lang="scss">
  .search {
    display: flex;
    position: relative;
    width: 200px;
    height: 48px;
    overflow: hidden;
    margin-left: auto;
    margin-right: 30px;
    padding-right: 24px;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      width: 24px;
      background: #111111;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 24px;
      height: 100%;
      background: #111111;
    }

    &__input {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      right: -350px;
      transition: .5s;

      input {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border: 1px solid #dedede;
        outline: 0;
        padding: 0 12px;
        border-radius: 20px 0 0 20px;
      }

      &.show {
        right: 0;
      }
    }

    .v-btn {
      height: 48px !important;
      width: 48px !important;
      background: #7FAD39 !important;
      color: #fff;
      position: absolute;
      right: 0;
      z-index: 1;
    }
  }
</style>
