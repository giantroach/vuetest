<template><div></div></template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    cardIDs: Array,
  },
})
export default class Hand extends Vue {
  public cardIDs!: number[];
}
</script>

<style scoped lang="scss"></style>
