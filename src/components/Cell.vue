<template>
  <div class="cell" :class="[block ? 'block': '', isDoor && !block ? 'Door' : '']">

  </div>
</template>

<script>
import store from '../store'

export default {
  name: "Cell.vue",
  props:{
    cell: Object
  },
  data(){
    return{
      posX: this.cell.posX,
      posY: this.cell.posY,
      isDoor: this.cell.isDoor,
    }
  },
  computed:{
    block(){
      return store.state.celles2D[this.posX][this.posY].isBlock
    }
  },
}
</script>

<style scoped lang="scss">
  .cell{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #736C5A;
    border: 1px solid #B3A98B;
    &.block{
      border: 6px solid;
      //Light
      border-top-color: #F2E5BD;
      border-left-color: #F2E5BD;
      //Dark
      border-bottom-color: #B3A98B;
      border-right-color: #B3A98B;
      //BGC
      background-color: #D9CDA9;
    }
    &.Door{
      background-color: blue;
    }
  }
</style>
