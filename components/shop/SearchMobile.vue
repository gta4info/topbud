<template>
  <v-form class="search" @submit.prevent="submit">
    <input
      v-model="query"
      placeholder="What do you need?"
      required
    />
    <v-btn icon @click="submit" depressed>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
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
      if(this.query.length) {
        this.$router.push({name: 'shop-search', query: {q: this.query}})
        this.$root.$emit('close-mobile-header');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    position: relative;
    width: 100%;
    height: 48px;
    overflow: hidden;
    margin-left: auto;
    padding-right: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    flex-shrink: 0;

    input {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border: 1px solid #dedede;
      outline: 0;
      padding: 0 12px;
      border-radius: 20px 0 0 20px;
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
