<template>
  <div class="EntryListElement">

    <div class="user"><span class="username">{{ this.entry.user.firstname + " " + this.entry.user.lastname }}</span>
    </div>
    <div class="date">{{ String(this.entry.lastUpdate).split("T")[0] }}</div>
    <div class="amount">
      <span>
        {{ this.entry.amount }} {{ this.entry.currency.symbol }}
      </span>
      <span class="material-icons-outlined category" v-if="this.entry.category.value == null">
        directions_car
      </span>
      <span class="material-icons-outlined category" v-else>
        {{ this.categories[this.entry.category.value].icon }}
      </span>
    </div>
  </div>
</template>

<style>
.EntryListElement {
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 0px 35px 0px 35px;
  margin-top: 30px;
  font-size: 24px;
  height: 120px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
}


.amount {
  width: 150px;
  justify-content: flex-end;
}

.user,
.amount,
.category,
.date {
  display: flex;
  align-items: center;
}

.username {
  display: inline-block;
  font-weight: 500;
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category {
  display: flex;
  background-color: #7A98A9;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-left: 10px;
}

@media screen and (max-width: 900px) {
  .EntryListElement {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;

  }

  .category {
    display: none;
  }

  .user,
  .amount,
  /* .category, */
  .date {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>


<script>
import { categories } from '@/util/category'

export default {
  name: 'EntryListElement',

  data() {
    return {
      categories: categories
    }
  },

  props: {
    entry: Object,
  },

}
</script>
