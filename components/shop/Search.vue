<template>
  <v-container>
    <v-form class="search" @submit.prevent="submit">
      <v-text-field
        v-model="query"
        label="What do you need?"
        required
        solo
      />
      <v-btn @click="submit" depressed>Search</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
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
    margin-top: 10px;

    .v-text-field {
      border-radius: 0;

      .v-input__slot {
        box-shadow: none !important;
        border: 1px solid #dedede;
      }
    }

    .v-btn {
      height: 48px !important;
      background: #7FAD39 !important;
      color: #fff;
      border-radius: 0;
      padding: 0 30px !important;
    }
  }
</style>
