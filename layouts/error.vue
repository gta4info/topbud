<template>
  <div style="margin: 50px 0;">
    <div class="d-flex flex-column align-center justify-center">
      <v-icon size="80" class="mb-4">mdi-information-outline</v-icon>
      <h1 v-if="error.statusCode === 404">This page could not be found</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink to="/" class="mt-4">Back to the home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="scss" scoped>
  h1 {
    @media(max-width: 768px) {
      font-size: 22px;
    }
  }
</style>
