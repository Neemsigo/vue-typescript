import Vue from 'vue';
import Vuex, { StoreOptions } from "vuex";
import { operations } from '@/store/operations';
import { RootState } from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store<StoreOptions<RootState>>({
  modules: {
    operations,
  },
});
