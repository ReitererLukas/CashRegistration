<template>
  <nav>
    <!-- <span class="home123">Home</span> -->
    <span>
      <router-link class="navItem" to="/">Home</router-link>
      <router-link class="navItem" v-if="this.isUserAdmin" to="/adminView">Admin</router-link>
    </span>

    <span class="actions">
      <span v-if="this.isLoggedIn" @click="() => this.openAddDialog = true" class="addBut">Hinzufügen</span>
      <span v-if="this.isLoggedIn" @click="this.logout" class="material-icons">logout</span>
      <span v-if="!this.isLoggedIn" @click="() => this.openSignUpDialog = true">Sign Up</span>
      <span v-if="!this.isLoggedIn" @click="() => this.openLoginDialog = true">Log in</span>
    </span>
  </nav>
  <router-view />

  <div class="dialogBackground" v-if="this.openAddDialog || this.openLoginDialog || this.openSignUpDialog"></div>

  <transition name="dialog">
    <AddEntryDialog v-if="this.openAddDialog" :add="this.add" :closeFunction="() => this.openAddDialog = false">
    </AddEntryDialog>
  </transition>
  <transition name="dialog">
    <AuthDialog v-if="this.openLoginDialog || this.openSignUpDialog" :login="this.login" :signup="this.signup"
      :isSignUp="this.openSignUpDialog"
      :closeFunction="() => { this.openLoginDialog = false; this.openSignUpDialog = false; }"></AuthDialog>
  </transition>
</template>

<script>
import AddEntryDialog from "@/components/dialogs/AddEntryDialog.vue";
import AuthDialog from "@/components/dialogs/AuthDialog.vue";
import api from "@/services/main.service";
import userService from "@/services/user.service";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AddEntryDialog,
    AuthDialog
  },

  data() {
    return {
      openAddDialog: false,
      openLoginDialog: false,
      openSignUpDialog: false,
    }
  },

  created() {
    if (localStorage.getItem('token') != null) {
      this.setToken({ token: localStorage.getItem('token'), isAdmin: localStorage.getItem('isAdmin') });
    }
    if (localStorage.getItem("email") != null && !this.isLoggedIn) {
      this.login(localStorage.getItem("email"), localStorage.getItem("password"), true);
    }
  },

  computed: {
    ...mapGetters('userstore', ['isLoggedIn', 'isUserAdmin'])
  },

  methods: {
    ...mapActions("entrystore", ["addEntry"]),
    ...mapActions("userstore", ["clearToken", "setToken"]),

    async login(email, password, stayLoggedIn) {
      await userService.login(email, password, this.setToken);
      this.saveCredentials(email, password, stayLoggedIn);
    },
    async signup(email, firstname, lastname, password, stayLoggedIn) {
      await userService.signup(email, firstname, lastname, password, this.setToken);
      this.saveCredentials(email, password, stayLoggedIn);
    },
    async add(amount, currencyName, users, category) {
      let newEntry = await api.addEntry({
        entry: {
          amount: amount,
          currencyName: currencyName,
          users: users,
          category: category
        }
      });
      this.openAddDialog = false;
      this.addEntry(newEntry);
    },
    logout() {
      this.clearToken();
      this.removeCredentials();
    },
    saveCredentials(email, password, stayLoggedIn) {
      if (stayLoggedIn) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }
    },
    removeCredentials() {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

.navItem {
  margin-right: 20px;
}

.addBut {
  background-color: #4F9BF8;
  padding: 5px;
  color: white;
  border-radius: 5px;
}

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  color: #7A98A9;
  background-color: #FAFBFC;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

.material-icons {
  user-select: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  align-items: center;
}

a {
  font-weight: 600;
  color: #7A98A9;
}

nav {
  margin: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}

.actions>span {
  margin-left: 15px;
}
</style>
