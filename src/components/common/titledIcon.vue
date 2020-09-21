<template>
  <div class="titled-icon">
    <slot name="icon"/>
    <div class="titled-icon__space"/>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitledIcon extends Vue {
  @Prop() readonly color!: string;
}
</script>

<style lang="scss">
.titled-icon {
  display: flex;
  align-items: center;

  &__space {
    margin-right: 5px;
  }
}
</style>
