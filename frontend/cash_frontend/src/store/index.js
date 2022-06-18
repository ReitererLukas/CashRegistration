import { createStore } from 'vuex'
import modelstore from './models.store'
import userstore from './user.store'
import alertstore from './alert.store'

export const store = createStore({

  modules: {
    userstore,
    modelstore,
    alertstore
  }
})


