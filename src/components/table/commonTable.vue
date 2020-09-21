<template>
  <div class="common-table">
    <!--Шапка таблицы-->
    <div class="common-table__header">
      <!--Динамические фильтры-->
      <div class="common-table__filter">
        <span
          v-for="(filter, index) of filters"
          :key="index"
          :class="calcFilterClass(index)"
          @click="filterClickHandler(index)"
        >
          {{ filter.label }}
        </span>
      </div>
      <!--Экшены для таблицы-->
      <div class="common-table__actions">
        <slot name="actions"/>
      </div>
    </div>
    <!--Обертка для основной таблицы-->
    <div class="common-table__wrapper">
      <!--Рендер каждой колонки-->
      <div
        v-for="(col, index) of columns"
        :key="index"
        class="common-table__column"
        :style="`max-width: ${col.width}px`"
      >
        <!--Хэдеры колонок-->
        <div class="common-table__column-head">
          {{ col.name }}
          <div
            v-if="col.sortable"
            :class="calcSortClass(index)"
            @click="sortClickHandler(index)"
          />
        </div>
        <!--Блок полученных данных для заполнения таблицы-->
        <div class="common-table__data-block">
          <!--note: возможно создание хэш таблицы вместо прохода по массиву для каждого столбца,
              но на маленьких объемах данных разница ничтожна-->
          <div
            class="common-table__row"
            v-for="row of sortedData"
            :key="row.id"
          >
            <!--Рендер скоупслота, если он есть-->
            <slot v-if="$scopedSlots[col.prop]" :text=row[col.prop] :row="row" :name="col.prop"/>
            <!--Если нет слота смотрим рендер функцию-->
            <template v-else-if="col.render">
              <RenderResolver :value="col.render"/>
            </template>
            <!--Иначе рендер значения как есть-->
            <template v-else>
              <span>{{ row[col.prop] }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hasData" class="common-table__no-data">
      <span>Нет данных</span>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { Column, Filter } from "@/components/table/types";
import RenderResolver from "@/components/renderResolver.vue";

/**
 * Таблица сделана в универсальном стиле, независимо от приходящих данных.
 * Колонки и фильтры обозначаются в соответсвующих массивах и задаются динамически извне.
 * Таблица реализует простую алфавитную сортировку внутри себя, но может принимать
 * функцию сортировки извне, например для таких особых полей как Дата.
 * Так же в случае необходимости особого отображения ячеек в колонке, возможно
 * передать компонент через слот либо рендер функцию.
 * Кнопки действий передаются так же извне для максимальной универсальности компонента
 */
@Component({
  components: { RenderResolver },
})
export default class CommonTable extends Vue {
  private currentSort = 0;
  private sortDirection: 'asc' | 'desc' = 'asc';
  private currentFilter = 0;

  @Prop({required: true}) readonly data!: Array<{ [key: string]: object }>
  @Prop({required: true}) readonly columns!: Array<Column>
  @Prop({required: true}) readonly filters!: Array<Filter>

  get hasData(): boolean {
    return !!this.data.length;
  }
  get sortedData(): Array<object> {
    if (!this.hasData) return [];
    const column = this.columns[this.currentSort];
    if (!column) return [];
    const filtered = this.data.filter((el) => this.filters[this.currentFilter].fnc(el));
    const { sortFnc } = column;
    if (sortFnc) {
      //Если есть кастомная функция сортировки, фильтруем через нее с добавлением направления
      return filtered.sort((a, b) => sortFnc(a, b, this.sortDirection));
    }
    //Стандартная алфавитная сортировка
    return filtered.sort((a, b) => this.sortDirection === 'asc'
      ? a[column.prop] > b[column.prop] ? 1 : -1
      : a[column.prop] > b[column.prop] ? -1 : 1,
    );
  }

  /**
   * Расчет классов для иконки сортировки
   */
  public calcSortClass(index: number): string[] {
    const BASE = 'common-table__sort-icon';
    const result: Array<string> = [BASE];
    if (index === this.currentSort) {
      result.push(`${BASE}--active`);
    }
    if (index === this.currentSort && this.sortDirection === 'desc') {
      result.push(`${BASE}--desc`);
    }
    return result;
  }
  /**
   * Расчет классов для фильтров
   */
  public calcFilterClass(index: number): string[] {
    const baseClass = 'common-table__filter-text';
    const result: Array<string> = [baseClass];
    if (index === this.currentFilter) {
      result.push(`${baseClass}--active`);
    }
    return result;
  }

  /**
   * Обработка клика по сортировке
   */
  public sortClickHandler(index: number): void {
    if (this.currentSort === index) {
      //Если клик был по активной сортировке, то изменить направление
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      //Изменяем колонку сортировки и стандартное направление
      this.currentSort = index;
      this.sortDirection = 'asc';
    }
  }

  /**
   * Обработка клика по фильтру
   */
  public filterClickHandler(index: number): void {
    if (this.currentFilter === index) return; //Выход при клике по уже активной

    //Изменение активной сортировки с исполнением функции фильтрации, задаваемой извне
    this.currentFilter = index;
  }
}
</script>

<style lang="scss">
.common-table {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__filter {
    display: flex;
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
  }
  &__filter-text {
    margin-right: 10px;
    cursor: pointer;

    &--active {
      color: #3399FF;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  &__column {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-basis: 100%;
  }
  &__column-head {
    display: flex;
    align-items: center;
    padding: 16px 0 16px 10px;
    background-color: #EDEEEE;
  }
  &__row {
    display: flex;
    flex-grow: 1;
    padding: 16px 0 16px 10px;
    align-items: center;
    border-bottom: 1px solid #EDEEEE;
    max-height: 50px;
  }
  &__data-block {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }
  &__sort-icon {
    margin: 5px 5px 0;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #A7A9AC;
    cursor: pointer;

    &--active {
      border-top-color: #3399FF;
    }
    &--desc {
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: none;
      border-bottom: 7px solid #3399FF;
    }
  }
  &__no-data {
    display: flex;
    padding-top: 10px;
    font-size: 20px;
    justify-content: center;
  }
}
</style>
