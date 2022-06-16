import { createStore } from 'vuex'
import entrystore from './entry.store'
import userstore from './user.store'

export const store = createStore({

  modules: {
    userstore,
    entrystore
  }
})


