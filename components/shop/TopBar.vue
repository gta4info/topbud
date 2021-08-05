<template>
  <v-container fluid class="topBar">
    <v-row>
      <v-container>
        <div>
          <a href="tel:+1 437-778-7966"><v-icon color="green">mdi-phone</v-icon>+1 437-778-7966</a>
          support 10 AM - 11 PM</div>
        <div><span class="red--text">Fast Delivery</span> in North York, Your, Richmond Hill ...</div>
        <div class="green--text">FREE SHIPPING FOR ALL ORDER OF $100</div>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .topBar {
    height: 61px;
    display: flex;
    border-bottom: 1px solid #dedede;
    background: #ececec;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div {
      font-weight: 900;
      font-size: 14px;

      a {
        color: #4CAF50;
      }
    }
  }
</style>
