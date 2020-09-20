<template>
  <div>
   <icon src></icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Icon: () => import('@/assets/cr'),
  },
})
export default class TitledIcon extends Vue {

}
</script>
