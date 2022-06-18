<template>
  <div class="AlertPop">
    <div class="material-icons">
      clear
    </div>
    {{ message }}
  </div>
</template >
        
<style>
.AlertPop {
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  background-color: red;
  border-radius: 5px;
  color: white;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'AlertPop',

  mounted() {
    setTimeout(() => { this.clearAlert() }, 5000)
  },

  methods: {
    ...mapActions('alertstore', ['clearAlert']),
  },
  computed: {
    ...mapGetters("alertstore", ["message"])
  }
}
</script>
