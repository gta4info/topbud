<template>
  <nuxt-link to="/shop/mix" class="card">
    <div class="card__img">
      <img src="@/static/images/Mix-and-Match.jpg" alt="Mix'N'Match">
    </div>
    <div class="card__title">Mix'N'Match</div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'DealCard',
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
    height: 100%;
    cursor: pointer;

    @media(max-width: 768px) {
      height: calc(50vw - 20px);
    }

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
      display: flex;
      align-items: center;
      justify-content: center;

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
</style>
