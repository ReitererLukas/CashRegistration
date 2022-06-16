<template>
  <div class="authDialog">

    <h2>{{ this.isSignUp ? 'Sign Up' : 'Log in' }}</h2>

    <div class="table">
      <div v-for="field in validFields" v-bind:key="field.generation.label" :class="field.generation.id" class="field">
        <label :for="field.generation.id">{{ field.generation.label }} </label><br>
        <input :id="field.generation.id" :type="field.generation.type" v-model="field.value"
          :placeholder="field.generation.placeholder" :name="field.generation.name" />
        <div v-if="field.info.show" class="infoList">
          <ul v-if="field.info.splitBy != ''">
            <li v-for="p in field.info.value.split(field.info.splitBy)" v-bind:key="p">{{ p }}</li>
          </ul>
          <span v-else>{{ field.info.value }}</span>
        </div>
      </div>
    </div>

    <div class="authActions">
      <button @click="onClick">{{ this.isSignUp ? 'Sign Up' : 'Log in' }}</button>
      <button @click="this.closeFunction">Cancel</button>
    </div>

    <div class="stayLoggedIn">
      <input type="checkbox" id="stay" v-model="this.stayLoggedIn" />
      <label for="stay">Angemeldet Bleiben</label>
    </div>

  </div>

</template>

<style>
.stayLoggedIn {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
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

.authActions {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.authActions>button {
  width: 40%;
  border: none;
  border-radius: 10px;
  background-color: #4F9BF8;
  font-size: 16px;
  color: white;
}

.authDialog>.table {
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 10px;
  column-gap: 15px;
  margin-bottom: 20px;
}

.email {
  grid-column: 1 / 3;
}

.authDialog {
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
  /* height: 600px; */
  border-radius: 15px;
  overflow: auto;
}

.infoList>ul {
  margin: 0;
}

.infoList {
  margin-left: 15px;
  color: red;
}

@media screen and (max-width: 780px) {
  .authDialog>.table {
    display: flex;
    flex-direction: column;

    /* display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 15px;
    margin-bottom: 20px; */
  }
}

@media screen and (max-width: 780px) and (max-height: 850px) {
  .authDialog {
    max-height: 600px;
  }
}

@media screen and (max-height: 650px) {
  .authDialog {
    max-height: 400px;
  }
}

@media screen and (max-width: 450px) {
  .authDialog>.table>.field>input {
    width: 250px;
  }

}
</style>


<script>

export default {
  name: 'AuthDialog',

  data() {
    return {
      email: {
        generation: {
          usedInLogin: true,
          placeholder: "E-Mail",
          label: "E-Mail",
          id: "email",
          type: "email",
          name: "username",
        },
        value: "",
        info: {
          show: false,
          value: "Inkorrekte Email",
          splitBy: ""
        },
        validate: () => {
          let isOk = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email.value);
          this.email.info.show = !isOk;
          return isOk;
        }
      },
      firstname: {
        generation: {
          usedInLogin: false,
          placeholder: "Vorname",
          label: "Vorname",
          id: "firstname",
          type: "text",
          name: "firstname",
        },
        value: "",
        info: {
          show: false,
          value: "Nur Buchstaben und Bindestriche (-)",
          splitBy: ""
        },
        validate: () => {
          let isOk = /^[a-zA-Z-]{2,32}$/.test(this.firstname.value);
          this.firstname.info.show = !isOk;
          return isOk;
        }
      },
      lastname: {
        generation: {
          usedInLogin: false,
          placeholder: "Nachname",
          label: "Nachname",
          id: "lastname",
          type: "text",
          name: "lastname",
        },
        value: "",
        info: {
          show: false,
          value: "Nur Buchstaben und Bindestriche (-)",
          splitBy: ""
        },
        validate: () => {
          let isOk = /^[a-zA-Z-]{2,32}$/.test(this.lastname.value);
          this.lastname.info.show = !isOk;
          return isOk;
        }
      },
      password: {
        generation: {
          usedInLogin: true,
          placeholder: "Passwort",
          label: "Passwort",
          id: "password",
          type: "password",
          name: "password",
        },
        value: "",
        info: {
          show: false,
          value: "Minimum 8 Zeichen-Zumindest ein Buchstabe-Zumindest eine Ziffer-Zumindest ein Symbol",
          splitBy: "-"
        },
        validate: () => {
          let isOk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.password.value);
          this.password.info.show = !isOk;
          return isOk;
        }
      },
      passwordRepeated: {
        generation: {
          usedInLogin: false,
          placeholder: "Password Wiederholen",
          label: "Password Wiederholen",
          id: "password2",
          type: "password",
          name: "",
        },
        value: "",
        info: {
          show: false,
          value: "Muss gleich wie das Passwort sein",
          splitBy: ""
        },
        validate: () => {
          let isOk = this.passwordRepeated.value == this.password.value;
          this.passwordRepeated.info.show = !isOk;
          return isOk;
        }
      },

      fields: [],
      stayLoggedIn: false,
    }
  },
  props: {
    isSignUp: Boolean,
    login: Function,
    signup: Function,
    closeFunction: Function,
  },

  created() {
    this.fields.push(this.email, this.firstname, this.lastname, this.password, this.passwordRepeated);
  },

  methods: {
    getMail() {
      return this.email
    },
    async onClick() {
      if (!this.isSignUp) {
        await this.login(this.email.value, this.password.value, this.stayLoggedIn);
        this.closeFunction();
      } else {
        let email = this.email.validate();
        let fn = this.firstname.validate();
        let ln = this.lastname.validate();
        let p1 = this.password.validate();
        let p2 = this.passwordRepeated.validate();

        if (email && fn && ln && p1 && p2) {
          await this.signup(this.email.value, this.firstname.value, this.lastname.value, this.password.value, this.stayLoggedIn);
          this.closeFunction();
        }
      }
    }
  },

  mounted() {
    document.body.classList.add('dialogOpen')
  },
  unmounted() {
    document.body.classList.remove('dialogOpen')
  },

  computed: {
    validFields() {
      return this.fields.filter(f => (f.generation.usedInLogin || this.isSignUp));
    }
  }
}
</script>
