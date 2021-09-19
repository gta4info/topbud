<template>
  <a :href="img" class="card" target="_blank">
    <div class="card__img">
      <img :src="img" alt="Deals menu">
    </div>
    <div class="card__title">Deals menu</div>
  </a>
</template>

<script>
export default {
  name: 'DealCard',
  data: () => ({
    img: null
  }),
  created () {
    this.$axios
      .get('/deals/menu')
      .then(res => this.img = 'https://topbudstore.com/' + res.data.img)
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    border: 1px solid #28A745;
    border-radius: 8px;
    position: relative;
    height: calc(50vw - 20px);
    cursor: pointer;

    &:hover {
      .card__img {
        img {
          transform: scale(1.2);
        }
      }
    }

    &__img {
      overflow: hidden;
      width: 100%;
      height: 230px;
      border-radius: 8px 8px 0 0;

      img {
        height: 100%;
        width: auto;
        transition: .3s;
      }
    }

    &__title {
      font-weight: 900;
      font-size: 20px;
      transition: .3s;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      width: 100%;
    }
  }

  .dealsImage {
    max-height: 100% !important;
    max-width: 100% !important;
  }
</style>
