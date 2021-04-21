<template>
  <div class="bonus" ref="bonus">
    <div class="design" :class="[isKey ? 'key' : '',isBomb ? 'bomb' : '',isBombArea ? 'bomb-area' : '']"></div>
  </div>
</template>

<script>
export default {
  name: "Bonus.vue",
  props:["item"],
  data(){
    return{
      posX: this.item.posX,
      posY: this.item.posY,
    }
  },
  computed:{
    isKey(){
      return this.item.bonus === 'isKey'
    },
    isBomb(){
      return this.item.bonus === 'isBomb'
    },
    isBombArea(){
      return this.item.bonus === 'isBombArea'
    }
  },
  mounted() {
    this.$refs.bonus.style.left = this.posX+"0%";
    this.$refs.bonus.style.top = this.posY+"0%";
  }
}
</script>

<style scoped lang="scss">
.bonus{
  position: absolute;
  top: 0;
  left: 0;
  width: 10%;
  height: 10%;
  transition: 250ms;
  .design{
    position: relative;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    &.key{
      z-index: 10;
      background: url("../assets/key.svg");
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }
    &.bomb{
      z-index: 8;
      background: url("../assets/bomb.svg");
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }
    &.bomb-area{
      z-index: 7;
      background: url("../assets/explode.svg");
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}
</style>
