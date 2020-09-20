<template>
  <div class="operations-page">
    <h3>Операция на поле 112</h3>
    <CommonTable
      :data="operations"
      :columns="[
        {
          name: 'Дата',
          prop: 'date',
        },
        {
          name: 'Операция',
          prop: 'type',
        },
        {
          name: 'Культура',
          prop: 'crop',
          render: (h) => h('div', ['lalala'])
        },
        {
          name: 'Качество',
          prop: 'assessment',
        },
      ]"
    >
      <Filter
    </CommonTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CommonTable from "@/components/table/commonTable.vue";
import Operation from "@/models/Operation";

const operations = namespace('operations');
@Component({
  components: {
    CommonTable,
  },
})
export default class OperationsPage extends Vue {
  mounted() {
    this.fetch();
  }
  @operations.State
  public operations!: Array<Operation>
  @operations.Action
  public fetch!: () => void
}
</script>
