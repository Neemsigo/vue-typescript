<template>
  <div class="common-button" @click="$listeners.click || null">
    <slot name="icon"/>
    <div class="titled-icon__space"></div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CommonButton extends Vue {
}
</script>

<style lang="scss">
.common-button {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  border-radius: 25px;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.25);
  font-size: 18px;
  color: #333333;
  cursor: pointer;
}
</style>
