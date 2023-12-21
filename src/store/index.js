import { createStore } from 'vuex'

import auth from "@/store/modules/auth";
import profile from "@/store/modules/profile";
import teams from "@/store/modules/teams";
import currentTeam from "@/store/modules/currentTeam";
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    auth,
    profile,
    teams,
    currentTeam,
  }
})
