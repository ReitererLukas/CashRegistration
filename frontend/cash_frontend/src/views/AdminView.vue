<template>
  <div class="admin">
    <h1>Admin View</h1>

    <div>
      <h4>Kategorie</h4>
      <label for="catname">Name</label>
      <input v-model="category" type="text" id="catname" /><br>
      <button @click="addCategory">Add</button>
    </div>

    <div>
      <h4>Währung</h4>
      <label for="curname">Name</label>
      <input v-model="this.curName" type="text" id="curname" /><br>
      <label for="cursym">Symbol</label>
      <input v-model="this.curSym" type="text" id="cursym" /><br>
      <button @click="addCurrency">Add</button>
    </div>
  </div>
</template >
        
<style scoped>
h4 {
  margin-bottom: 10px;
  padding: 0;
}

label {
  margin-right: 5px;
}
</style>
        
<script>
import api from "@/services/main.service";

export default {
  name: 'AdminView',

  data() {
    return {
      category: "",
      curName: "",
      curSym: ""
    }
  },

  methods: {
    async addCategory() {
      await api.addCategory({ description: this.category });
    },
    async addCurrency() {
      await api.addCurrency({ name: this.curName, symbol: this.curSym });
    }
  }
}
</script>
