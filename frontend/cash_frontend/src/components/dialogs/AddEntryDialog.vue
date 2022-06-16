<template>
  <div class="addEntryDialog">

    <h2>Hinzufügen</h2>

    <div class="table">


      <div class="field">
        <label for="amount">Betrag</label><br>
        <input id="amount" v-model="amount.value" type="number" step="0.01" />
        <div v-if="amount.info.show" class="infoList">
          <ul v-if="amount.info.splitBy != ''">
            <li v-for="p in amount.info.value.split(amount.info.splitBy)" v-bind:key="p">{{ p }}</li>
          </ul>
          <span v-else>{{ amount.info.value }}</span>
        </div>
      </div>

      <div class="field">
        <label for="currency">Währung</label><br>
        <select id="currency" v-model="currencyName.value">
          <option disabled selected>Bitte wähle eine Währung</option>
          <option v-for="currency in this.currencyNames" v-bind:key="currency" :value="currency">{{ currency }}
          </option>
        </select>
        <div v-if="currencyName.info.show" class="infoList">
          <ul v-if="currencyName.info.splitBy != ''">
            <li v-for="p in currencyName.info.value.split(currencyName.info.splitBy)" v-bind:key="p">{{ p }}</li>
          </ul>
          <span v-else>{{ currencyName.info.value }}</span>
        </div>
      </div>

      <div class="field">
        <label for="currency">Kategorie</label><br>
        <select id="currency" v-model="category.value">
          <option disabled selected>Bitte wähle eine Kategorie</option>
          <option v-for="c in this.categories" v-bind:key="c.categoryId" :value="c.categoryId">{{
              this.catDic[c.value].text
          }}
          </option>
        </select>
        <div v-if="category.info.show" class="infoList">
          <ul v-if="category.info.splitBy != ''">
            <li v-for="p in category.info.value.split(category.info.splitBy)" v-bind:key="p">{{ p }}</li>
          </ul>
          <span v-else>{{ category.info.value }}</span>
        </div>
      </div>

      <div class="field userField">
        <label>Beteiligte</label><br>
        <span class="userSelection">

          <span class="option" v-for="user in this.users" v-bind:key="user.userid">
            <input :value="user.userid" type="checkbox" v-model="this.userSelection.value" />
            <label class="name">{{ user.lastname + ' ' + user.firstname }}</label><br>
          </span>
        </span>
        <div v-if="userSelection.info.show" class="infoList">
          <ul v-if="userSelection.info.splitBy != ''">
            <li v-for="p in userSelection.info.value.split(userSelection.info.splitBy)" v-bind:key="p">{{ p }}</li>
          </ul>
          <span v-else>{{ userSelection.info.value }}</span>
        </div>
      </div>
    </div>
    <div class="addActions">
      <button @click="this.verifyEntry">Add Entry</button>
      <button @click="this.closeFunction">Cancel</button>
    </div>


  </div>
</template>

<style>
.addEntryDialog {
  background-color: #FAFBFC;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 32px;
  align-items: flex-start;
  z-index: 101;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  border-radius: 15px;
  overflow: auto;
}

.userField {
  grid-column: 1 / 3;
}

.userSelection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: 250px;
  overflow: auto;
}

.addEntryDialog>.table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  column-gap: 15px;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 10px;
}

.field>input {
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 16px;
}

.field>label {
  font-size: 20px;
  font-weight: 500;
}

.addActions {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.addActions>button {
  width: 40%;
  border: none;
  border-radius: 10px;
  background-color: #4F9BF8;
  font-size: 16px;
  color: white;
}

body.dialogOpen {
  overflow: hidden;
}

#amount {
  width: 250px;
}

.name {
  display: inline-block;
  white-space: nowrap;
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
}

.option {
  display: flex;
  align-items: center;
}


@media screen and (max-width: 650px) {
  .addEntryDialog>.table {
    display: flex;
    flex-direction: column;
  }

  .userSelection {
    grid-template-columns: 1fr 1fr;
  }

  .name {
    width: 125px;
  }
}

@media screen and (max-width: 650px) and (max-height: 850px) {
  .addEntryDialog {
    max-height: 600px;
  }
}

@media screen and (max-height: 620px) {
  .addEntryDialog {
    max-height: 400px;
  }
}

@media screen and (max-width: 450px) {
  .name {
    width: 100px;
  }
}
</style>


<script>
import api from "../../services/entry.service";
import { categories } from "@/util/category";

export default {
  name: 'AddEntryDialog',

  data() {
    return {
      amount: {
        value: 0.00,
        info: {
          show: false,
          value: "Muss größer als 0 sein",
          splitBy: ""
        },
        validate: () => {
          this.amount.value = parseInt(this.amount.value * 100) / 100.0;
          let isOk = this.amount.value > 0.0;
          this.amount.info.show = !isOk;
          return isOk;
        }
      },
      currencyName: {
        value: "Bitte wähle eine Währung",
        info: {
          show: false,
          value: "Wähle Währung",
          splitBy: ""
        },
        validate: () => {
          let isOk = this.currencyNames.includes(this.currencyName.value);
          this.currencyName.info.show = !isOk;
          return isOk;
        },
      },
      userSelection: {
        value: [],
        info: {
          show: false,
          value: "Wähle mindestens einen Beteiligten",
          splitBy: ""
        },
        validate: () => {
          let isOk = this.userSelection.value.length > 0;
          this.userSelection.info.show = !isOk;
          return isOk;
        },
      },
      category: {
        value: "Bitte wähle eine Kategorie",
        info: {
          show: false,
          value: "Wähle eine Kategorie aus",
          splitBy: ""
        },
        validate: () => {
          let isOk = !isNaN(this.category.value)
          this.category.info.show = !isOk;
          return isOk;
        },
      },
      currencies: [],
      users: [],
      categories: [],
      catDic: categories,
    }
  },

  async created() {
    this.currencies = await api.getCurrencies();
    this.users = await api.getUsers();
    this.categories = await api.getCategories();
  },
  methods: {
    verifyEntry() {
      let a = this.amount.validate();
      let b = this.userSelection.validate();
      let c = this.currencyName.validate();
      let d = this.category.validate();

      if (a && c && b && d) {
        this.add(
          this.amount.value,
          this.currencyName.value,
          this.userSelection.value,
          this.category.value
        );
      }
    }
  },
  computed: {
    currencyNames() {
      return this.currencies.map(c => c.name);
    }
  },

  props: {
    add: Function,
    closeFunction: Function,
  },

  mounted() {
    document.body.classList.add('dialogOpen')
  },
  unmounted() {
    document.body.classList.remove('dialogOpen')
  },
}
</script>
