<template>
  <div class="bomb" ref="bomb" :class="[dropped ? 'dropped' : '', explode ? 'explode' : '']">
    <div class="design"></div>
  </div>
</template>

<script>
import store from "../store"

export default {
  name: "Bomb.vue",
  props:{
    bomb: Object
  },
  data(){
    return{
      posX: this.bomb.posX,
      posY: this.bomb.posY
    }
  },
  computed:{
    dropped(){
      return store.state.bombs2D[this.posX][this.posY].isDrop
    },
    explode(){
      return store.state.bombs2D[this.posX][this.posY].isExplode
    },
  },
  watch:{
    explode(val) {
      if (val) {
        for (let enemi of store.state.enemies) {
          if (enemi.posX === this.posX) {
            if(enemi.posY === this.posY){
              enemi.isDead = true;
              enemi.canMove = false;
              setTimeout(()=>{
                store.state.enemies.splice(store.state.enemies.indexOf(enemi), 1)
              },500)

            }
          }
        }
        if (store.state.player.posX === this.posX && store.state.player.posY === this.posY) {
          store.state.player.canMove = false;
          store.state.player.isDead = true;
          console.log('YOU LOSE')
        }
        if (store.state.celles2D[this.posX][this.posY].isBlock && val) {
          setTimeout(() => {
            store.state.celles2D[this.posX][this.posY].isBlock = false;
          }, 1000)
        }
      }
    }
  },
  mounted() {
    this.$refs.bomb.style.top = this.posY+"0%"
    this.$refs.bomb.style.left = this.posX+"0%"
  },
}
</script>

<style scoped lang="scss">
@keyframes bomb {
  0%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  10%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
  30%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  50%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
  60%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  70%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
  75%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  80%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
  85%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  90%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
  95%{background: radial-gradient(circle at 35% 35%, rgba(242,123,19,1) 0%, rgba(191,62,15,1) 16%, rgba(115,29,9,1) 100%);}
  100%{background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);}
}
  .bomb{
    opacity: 0;
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    &.dropped{
      opacity: 1;
      .design{
        position: relative;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        background: radial-gradient(circle at 35% 35%, rgba(64,64,64,1) 0%, rgba(38,37,38,1) 16%, rgba(0,0,0,1) 100%);
        border-radius: 50%;
        animation: bomb 2s forwards;
      }
    }
    &.explode{
      opacity: 0.75;
      background-image: url("../assets/bomb.gif");
      background-size: cover;
    }

  }
</style>
