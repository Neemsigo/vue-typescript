import FieldService from "@/FieldService";
import Operation from "@/models/Operation";
import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store/types";
import { OperationsState } from "@/store/operations/types";
import sleep from "@/utils/sleep";
import MappedOperation from "@/models/MappedOperation";

const state: OperationsState = {
  operations: [],
  isFetching: false,
};
const actions: ActionTree<OperationsState, RootState> = {
  /**
   * Запрос операций
   */
  async fetch({ commit }): Promise<void> {
    commit('setFetchStatus', true);
    const fieldService = new FieldService();
    await sleep(2000); //Искусственное ожидание для симуляции работы с реальным апи
    const operations = await fieldService.getOperations();
    commit("setOperations", {operations: operations});
    commit('setFetchStatus', false);
  },
};
const mutations: MutationTree<OperationsState> = {
  /**
   * Добавление операций в стейт с их мапингом
   */
  setOperations(state, { operations }: { operations: Array<Operation> }) {
    state.operations = operations.map((el): MappedOperation => {
      return new MappedOperation(el);
    });
  },
  /**
   * Изменение статуса запроса
   */
  setFetchStatus(state, value: boolean) {
    state.isFetching = value;
  },
};
export const operations: Module<OperationsState, RootState> = {
  state,
  actions,
  mutations,
  namespaced: true,
};
