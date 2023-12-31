import { createStore } from 'vuex'

import auth from "@/store/modules/auth";
import profile from "@/store/modules/profile";
import teams from "@/store/modules/teams";
import currentTeam from "@/store/modules/currentTeam";
import subscription from "@/store/modules/subscription";
import workout from "@/store/modules/workout";
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
    subscription,
    workout
  }
})
