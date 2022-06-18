<template>
  <div class="exchangeView">

    <div class="exchangeAddField">
      <div class="smallExchangeAddField">
        <div class="exchangeInputs">

          <span class="addElement">
            <span>
              <label>Betrag</label><br>
              <input type="number" step="0.01" class="amountInput" v-model="this.addFields.amountFrom.value" />
            </span>
            <span>
              <label>Währung</label><br>
              <select v-model="this.addFields.currencyNameFrom.value">
                <option v-for="c in this.currencies" v-bind:key="c.name">{{ c.name }}</option>
              </select>
            </span>
          </span>


          <span class="material-icons-outlined arrow arrowRight">
            arrow_right_alt
          </span>

          <span class="material-icons-outlined arrow arrowDown">
            arrow_downward
          </span>

          <span class="addElement">
            <span>
              <label>Betrag</label><br>
              <input type="number" step="0.01" class="amountInput" v-model="this.addFields.amountTo.value" />
            </span>
            <span>
              <label>Währung</label><br>
              <select v-model="this.addFields.currencyNameTo.value">
                <option v-for="c in this.currencies" v-bind:key="c.name">{{ c.name }}</option>
              </select>
            </span>
          </span>
        </div>
        <div class="exchangeButton">
          <div class="exchangeAddButton" @click="addExchange">Wechseln</div>
        </div>
      </div>
    </div>

    <h2>Exchanges</h2>
    <ExchangeList :exchanges="this.exchanges" />

  </div>
  <AlertPop v-if="this.showAlert" />
</template >
        
<style>
.exchangeAddButton {
  width: 75%;
  background-color: #4F9BF8;
  border-radius: 5px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.exchangeAddField {
  width: 100%;
  display: flex;
  justify-content: center;
}

.smallExchangeAddField {
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
}

.exchangeInputs {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.exchangeButton {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.arrow {
  display: flex;
  align-items: center;
}

.addElement {
  display: flex;
  justify-content: center;
}

.amountInput {
  margin-right: 10px;
}

.arrowDown {
  display: none;
}

@media screen and (max-width: 1250px) {
  .amountInput {
    width: 150px;
  }
}

@media screen and (max-width: 820px) {
  .smallExchangeAddField {
    width: 90%;
  }
}

@media screen and (max-width: 640px) {
  .exchangeInputs {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .arrowRight {
    display: none;
  }

  .arrowDown {
    display: flex;
    justify-content: center;
    padding: 5px 0 5px 0;
  }
}
</style>
        
<script>
import api from "@/services/main.service";
import ExchangeList from "../components/lists/ExchangeList"
import { mapActions, mapGetters } from "vuex";
import AlertPop from "@/components/popups/AlertPop.vue";

export default {
  name: "AdminView",
  data() {
    return {
      addFields: {
        amountFrom: {
          value: 0.0,
          vaidation: () => {
            return this.addFields.amountFrom.value > 0;
          },
          error: "Betrag muss größer 0 sein"
        },
        currencyNameFrom: {
          value: "Euro"
        },
        amountTo: {
          value: 0.0,
          vaidation: () => {
            return this.addFields.amountTo.value > 0;
          },
          error: "Betrag muss größer 0 sein"
        },
        currencyNameTo: {
          value: "Kuna",
          vaidation: () => {
            return this.addFields.currencyNameFrom.value != this.addFields.currencyNameTo.value;
          },
          error: "Währungen müssen sich unterscheiden"
        },
      },
      currencies: []
    };
  },
  async created() {
    this.updateExchanges()
    this.currencies = await this.getCurrencies();
  },
  methods: {
    ...mapActions("modelstore", ["addExchange", "updateExchanges"]),
    ...mapActions("alertstore", ["openAlert"]),

    async addExchange() {
      let a = this.addFields.amountFrom.vaidation();
      let b = this.addFields.amountTo.vaidation();
      let c = this.addFields.currencyNameTo.vaidation();

      if (a && b && c) {
        this.updateExchanges(await api.addExchange({ amountTo: this.addFields.amountTo.value, currencyNameTo: this.addFields.currencyNameTo.value, amountFrom: this.addFields.amountFrom.value, currencyNameFrom: this.addFields.currencyNameFrom.value }));
      }

      if (!a) {
        this.openAlert({message: this.addFields.amountFrom.error})
      } else if (!b) {
        this.openAlert({message: this.addFields.amountTo.error})
      } else if (!c) {
        this.openAlert({message: this.addFields.currencyNameTo.error})
      }

    },
    async getAllExchanges() {
      return await api.getAllExchanges();
    },
    async getCurrencies() {
      return await api.getCurrencies();
    }
  },
  computed: {
    ...mapGetters("modelstore", ["exchanges"]),
    ...mapGetters("alertstore", ["showAlert"]),
  },
  components: { ExchangeList, AlertPop }
}
</script>
