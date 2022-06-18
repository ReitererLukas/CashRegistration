<template>
  <div class="ExchangeList">

    <div class="grid">
      <ExchangeListElement v-for="exchange in this.exchanges" v-bind:key="exchange.exchangeId" :exchange="exchange" />
    </div>

  </div>
</template>

<style>
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}

.ExchangeList {
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 1150px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 750px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>


<script>
import ExchangeListElement from "./listElements/ExchangeListElement.vue"

export default {
  name: 'ExchangeList',


  components: {
    ExchangeListElement
  },

  props: {
    exchanges: Array
  },
}
</script>
