<template>
  <div class="home">

    <div id="header">
      <span id="title">
        <h1>Maturareise 5CHIF</h1>
        <h1>Kroatien</h1>
      </span>
    </div>

    <div style="z-index: 106">



      <EntryList :entries="this.entries" />


      <div class="dialogBackground" v-if="this.openAddDialog"></div>

      <transition name="dialog">
        <AddEntryDialog v-if="this.openAddDialog" :add="this.add" :closeFunction="() => this.openAddDialog = false">
        </AddEntryDialog>
      </transition>

    </div>


  </div>
  <div class="addButton" @click="() => this.openAddDialog = true" v-if="this.isLoggedIn">
    <span class="material-icons" style="font-size: 48px">add</span>
  </div>


  <AlertPop v-if="this.showAlert"/>
</template >
        
<style>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border-bottom: solid 1px #7A98A9;
}

#title {
  text-align: center;
}

#title>h1 {
  padding: 0;
  margin: 0;
  font-size: 48px;
}

h1 {
  z-index: 105;
}

.home {
  width: 100%;
}

.dialogBackground {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.5);
  backdrop-filter: blur(50px);
  width: 100%;
  height: 100%;
}

.addButton {
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 5px;
  background-color: #4F9BF8;
  color: white;
  align-items: center;
  border-radius: 50%;
}

@media screen and (max-width: 900px) {
  .addButton {
    right: 10px;
    bottom: 10px;
  }
}
</style>
        
<script>
import EntryList from "../components/lists/EntryList.vue";
import AddEntryDialog from "@/components/dialogs/AddEntryDialog.vue";
import api from "@/services/main.service";
import AlertPop from "@/components/popups/AlertPop.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'HomeView',

  components: {
    EntryList,
    AddEntryDialog,
    AlertPop
  },

  data() {
    return {
      openAddDialog: false,
    }
  },

  created() {
    this.fetchEntries();
  },

  methods: {
    ...mapActions("userstore", ["clearToken", "setToken"]),
    ...mapActions("modelstore", ["addEntry", "updateEntries"]),
    ...mapActions("alertstore", ["openAlert"]),
    
    async fetchEntries() {
      await this.updateEntries();
    },
    async add(amount, currency) {
      let newEntry = await api.addEntry({ amount: amount, currencyName: currency });
      this.openAddDialog = false;
      this.addEntry(newEntry);
    },
  },
  computed: {
    ...mapGetters('userstore', ['isLoggedIn']),
    ...mapGetters('modelstore', ['entries']),
    ...mapActions("alertstore", ["openAlert"]),
  }
}
</script>
