<template>
  <div class="card">
    <img class="card__img" src="@/static/images/how-to-smoke.jpg" alt="How to smoke cannabis flower">
    <div class="card__content">
      <div class="card__title">How to smoke cannabis flower</div>
      <p>Smoking weed is the most common way to consume cannabis. Effects kick in almost instantaneously and can last anywhere from one to three hours, depending on the dose and person. Most weed smokers consume cannabis flower using one or more of the following methods:</p>
      <p><span>Joint:</span> the joint, sometimes called a cannabis cigarette, consists of ground flower rolled in smokable rolling paper.</p>
      <p><span>Blunt:</span> similar to joints, blunts involve rolling ground flower in a blunt wrap or emptied cigar.</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .card {
    margin-top: 94px;
    display: flex;

    @media(max-width: 768px) {
      margin-top: 60px;
      flex-direction: column;
    }

    &__img {
      width: 540px;
      height: 560px;
      border-radius: 5px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 40px;

      @media(max-width: 768px) {
        height: 120px;
        width: 100%;
        object-fit: cover;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__title {
      color: #333333;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 38px;
      line-height: 1.2;

      @media(max-width: 768px) {
        font-size: 24px;
        margin: 26px 0;
      }
    }

    p {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 1.5;

      @media(max-width: 768px) {
        font-size: 14px;
        line-height: 2;
      }

      span {
        font-weight: 700;
        color: #21aa5b;
      }
    }
  }
</style>
