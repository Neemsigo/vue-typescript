<template>
  <div class="operations-page">
    <div class="operations-page__title">Операция на поле 112</div>
    <Spinner v-if="isFetching"/>
    <CommonTable
      v-else
      :data="operations"
      :columns="columns"
      :filters="filters"
    >
      <div slot="actions">
        <CommonButton>
          <img slot="icon" src="@/assets/plus.svg" alt="">
          Добавить операцию
        </CommonButton>
      </div>
      <TitledIcon
        slot="crop" slot-scope="{text}">
        <img slot="icon" src="@/assets/crop.svg" alt="crop">
        {{ text }}
      </TitledIcon>
      <TitledIcon slot="stringAssessment" slot-scope="{text, row}">
        <div slot="icon" :class="calcAssessmentClass(row)"/>
        {{ text }}
      </TitledIcon>
    </CommonTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CommonTable from "@/components/table/commonTable.vue";
import Operation from "@/models/Operation";
import TitledIcon from "@/components/common/titledIcon.vue";
import moment from "moment";
import { Column, Filter } from "@/components/table/types";
import MappedOperation, { ColorType } from "@/models/MappedOperation";
import CommonButton from "@/components/common/button.vue";
import Spinner from "@/components/common/spiner.vue";

const operations = namespace('operations');
@Component({
  components: {
    CommonButton,
    CommonTable,
    TitledIcon,
    Spinner,
  },
})
export default class OperationsPage extends Vue {
  private filters = [
    new Filter({
      label: 'Запланированные операции',
      fnc: (el: MappedOperation): boolean => moment().diff({...el.date, month: el.date.month - 1}, 'days') <= 0,
    }),
    new Filter({
      label: 'Выполненные операции',
      fnc: (el: MappedOperation): boolean => moment().diff({...el.date, month: el.date.month - 1}, 'days') >= 0,
    }),
  ];
  private columns = [
    new Column({name: 'Дата', prop: 'stringDate', width: 200, sortFnc(a: MappedOperation, b: MappedOperation, direction: 'asc' | 'desc') {
      const diff = (first: MappedOperation, second: MappedOperation) => {
        return moment().diff(first.date, 'days') - moment().diff(second.date, 'days');
      };
      return direction === 'asc' ? diff(a, b) : diff(b, a);
    }}),
    new Column({name: 'Операция', prop: 'stringType'}),
    new Column({name: 'Культура', prop: 'crop', sortable: false}),
    new Column({name: 'Качество', prop: 'stringAssessment', width: 200}),
  ]

  /**
   * Высчитываем классы для ячейки качества
   */
  public calcAssessmentClass(row: MappedOperation): string[] {
    const BASE = 'operations-page__assessment-cell';
    const result = [`${BASE}`];
    if (typeof row.assessment === 'number') {
      result.push(`${BASE}--${ColorType[row.assessment]}`);
    }
    return result;
  }

  mounted() {
    this.fetch();
  }
  @operations.State
  public operations!: Array<Operation>;
  @operations.State
  public isFetching!: boolean;
  @operations.Action
  public fetch!: () => void;
}
</script>
<style lang="scss">
.operations-page {
  &__title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  &__assessment-cell {
    width: 20px;
    height: 10px;
    border-radius: 5px;
    background: #EDEEEE;

    &--green {background: #66CC66}
    &--yellow {background: #FFE06D}
    &--red {background: #FF7360}
  }
}
</style>
