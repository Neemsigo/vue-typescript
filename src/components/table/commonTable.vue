<template>
  <div class="common-table">
    <div
      v-for="(col, index) of columns"
      :key="index"
      class="common-table__column"
      :style="`min-width: ${col.width}`"
    >
      <div class="common-table__column-head">
        {{ col.name }} <div class="common-table__sort-icon"/>
      </div>
      <div class="common-table__data-block">
        <div
          class="common-table__row"
          v-for="row of data"
          :key="row.id"
        >
          <template v-if="col.render">
            <RenderResolver :value="col.render"/>
          </template>
          <template v-else>
            {{ row[col.prop] }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { Column } from "@/components/table/types";
import RenderResolver from "@/components/renderResolver.vue";
@Component({
  components: { RenderResolver }
})
export default class CommonTable extends Vue {
  @Prop({required: true}) readonly data!: Array<object>
  @Prop({required: true}) readonly columns!: Array<Column>
}
</script>

<style lang="scss">
.common-table {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  &__column {
    flex-basis: 100%;
  }
  &__column-head {
    display: flex;
    align-items: center;
    padding: 16px 0;
    background-color: #EDEEEE;
  }
  &__row {
    padding: 16px 0;
    border-bottom: 1px solid #EDEEEE;
  }
  &__sort-icon {
    margin: 5px 5px 0;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #A7A9AC;
    &--active {
      border-color: #3399FF;
    }
  }
}
</style>
