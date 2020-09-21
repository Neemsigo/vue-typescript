<template>
  <div class="panel-page">
    <div class="panel-page__header">

    </div>
    <div class="panel-page__footer">
      Изменить операцию
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PanelPage extends Vue{
}
</script>

<style lang="scss">
.panel-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;

  &__footer {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    background-color: #66CC66;
    text-transform: uppercase;
    color: white;
    font-size: 14px;
  }
}
</style>
