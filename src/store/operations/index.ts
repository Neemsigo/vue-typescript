import FieldService from "@/FieldService";
import Operation, { Assessment, OperationType } from "@/models/Operation";
import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store/types";
import { OperationsState } from "@/store/operations/types";
import sleep from "@/utils/sleep";
import MappedOperation from "@/models/MappedOperation";

const state: OperationsState = {
  operations: [],
  sortKey: 'date',
};
//getters: {},
const actions: ActionTree<OperationsState, RootState> = {
  async fetch({ commit }): Promise<void> {
    const fieldService = new FieldService();
    await sleep(2000);
    const operations = await fieldService.getOperations();
    commit("setOperations", {operations: operations});
  },
};
const mutations: MutationTree<OperationsState> = {
  setOperations(state, { operations }: { operations: Array<Operation> }) {
    console.log(operations);
    state.operations = operations.map((el): MappedOperation => {
      console.log(el, OperationType);
      return new MappedOperation(el);
    });
  },
};
export const operations: Module<OperationsState, RootState> = {
  state,
  actions,
  mutations,
  namespaced: true,
};
