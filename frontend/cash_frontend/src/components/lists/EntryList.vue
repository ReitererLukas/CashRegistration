<template>
  <div class="EntryList">

    <EntryListItem v-for="entry in this.entries" v-bind:key="entry.entryId" :entry="entry" />

  </div>
</template>

<style>
.EntryList {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;

}


@media screen and (max-width: 900px) {
  .EntryList {
    display: grid;
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 570px) {
  .EntryList {
    display: flex;
  }
}
</style>


<script>
import EntryListItem from "./listElements/EntryListElement.vue"

export default {
  name: 'EntryList',


  components: {
    EntryListItem
  },

  props: {
    entries: Array
  },
}
</script>
