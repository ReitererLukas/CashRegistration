<template>
  <div class="ExchangeListElement">

    <span>
      {{ this.exchange.amountFrom }} {{ this.exchange.currencyFrom.symbol }}
    </span>
    <span class="material-icons-outlined arrow">
      arrow_right_alt
    </span>
    <span>
      {{ this.exchange.amountTo }} {{ this.exchange.currencyTo.symbol }}
    </span>
  </div>
</template>

<style>
.ExchangeListElement {
  padding: 25px;
  display: flex;
  width: 80%;
  justify-content: space-between;
  /* padding: 0px 35px 0px 35px; */
  margin-top: 30px;
  font-size: 24px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
}


.arrow {
  display: flex;
  align-items: center;
}

/* @media screen and (max-width: 900px) {
  .ExchangeListElement {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;

  }
} */
</style>


<script>

export default {
  name: 'ExchangeListElement',

  props: {
    exchange: Object,
  },

}
</script>
