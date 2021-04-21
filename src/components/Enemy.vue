<template>
  <div class="enemy" ref="enemy">
    <div class="design" :class="isDead ? 'dead' : ''"></div>
  </div>
</template>

<script>
import store from '../store'

export default {
name: "Enemy.vue",
  props:{
    enemy: Object,
  },
  data(){
    return{
      id: this.enemy.id,
      posX: this.enemy.posX,
      posY: this.enemy.posY,
      bonus: this.enemy.bonus
    }
  },
  computed:{
     isDead(){
       const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
       return enemy.isDead;
     },
    canMove(){
       // const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
       // return enemy.canMove;
      return store.state.enemies.some(enemy => {
        if (enemy.id === this.id){
          return enemy.canMove
        }
      })
     },
    storeX:{
       get(){
         const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
         return enemy.posX;
      },
      set(value){
        const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
        enemy.posX = value;
      }
    },
    storeY:{
      get(){
        const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
        return enemy.posY;
      },
      set(value){
        const enemy = store.state.enemies.find( enemy => enemy.id === this.id);
        enemy.posY = value;
      }
    },
  },
  watch:{
    posX(val, oldval){
      this.$refs.enemy.style.left = this.posX+"0%";
      this.storeX = val
      if(val < oldval){
        this.$refs.enemy.style.transform = "rotate(-90deg)";
      }else{
        this.$refs.enemy.style.transform = "rotate(90deg)";
      }
      this.checkPlayer();
    },
    posY(val, oldval){
      this.$refs.enemy.style.top = this.posY+"0%";
      this.storeY = val
      if(val < oldval){
        this.$refs.enemy.style.transform = "rotate(0deg)";
      }else{
        this.$refs.enemy.style.transform = "rotate(180deg)";
      }
      this.checkPlayer();
    },
  },
  methods: {
    checkPlayer(){
      store.state.enemies.forEach(enemy => {
        if(enemy.id === this.id){
          if(this.posX === store.state.player.posX && this.posY === store.state.player.posY){
            store.state.player.canMove = false;
            store.state.enemiesCanMove = false;
            store.state.player.isDead = true;
            console.log('KILL BY ENEMY')
          }
        }
      })
    },
    enemyUp() {
      if (this.posY !== 0) {
        if (!store.state.celles2D[this.posX][this.posY - 1].isBlock) {
          if (!store.state.bombs2D[this.posX][this.posY - 1].isDrop) {
            if (this.canMove) {
              this.posY--;
              setTimeout(() => {
                this.enemyUp();
              }, store.state.enemiesSpeed * 10)
            }
          } else {
            setTimeout(() => {
              this.randomWay();
            }, store.state.enemiesSpeed * 10)
          }
        } else {
          setTimeout(() => {
            this.randomWay();
          }, store.state.enemiesSpeed * 10)
        }
      } else {
        setTimeout(() => {
          this.randomWay();
        }, store.state.enemiesSpeed * 10)
      }
    },
    enemyDown() {
      if (this.posY !== 9) {
        if (!store.state.celles2D[this.posX][this.posY + 1].isBlock) {
          if (!store.state.bombs2D[this.posX][this.posY + 1].isDrop) {
            if (this.canMove) {
              this.posY++;
              setTimeout(() => {
                this.enemyDown();
              }, store.state.enemiesSpeed * 10)
            }
          } else {
            setTimeout(() => {
              this.randomWay();
            }, store.state.enemiesSpeed * 10)
          }
        } else {
          setTimeout(() => {
            this.randomWay();
          }, store.state.enemiesSpeed * 10)
        }
      } else {
        setTimeout(() => {
          this.randomWay();
        }, store.state.enemiesSpeed * 10)
      }
    },
    enemyRight() {
      if (this.posX !== 9) {
        if (!store.state.celles2D[this.posX + 1][this.posY].isBlock) {
          if (!store.state.bombs2D[this.posX + 1][this.posY].isDrop) {
            if (this.canMove) {
              this.posX++;
              setTimeout(() => {
                this.enemyRight();
              }, store.state.enemiesSpeed * 10)
            }
          } else {
            setTimeout(() => {
              this.randomWay();
            }, store.state.enemiesSpeed * 10)
          }
        } else {
          setTimeout(() => {
            this.randomWay();
          }, store.state.enemiesSpeed * 10)
        }
      } else {
        setTimeout(() => {
          this.randomWay();
        }, store.state.enemiesSpeed * 10)
      }
    },
    enemyLeft() {
      if (this.posX !== 0) {
        if (!store.state.celles2D[this.posX - 1][this.posY].isBlock) {
          if (!store.state.bombs2D[this.posX - 1][this.posY].isDrop) {
            if (this.canMove) {
              this.posX--;
              setTimeout(() => {
                this.enemyLeft();
              }, store.state.enemiesSpeed * 10)
            }
          } else {
            setTimeout(() => {
              this.randomWay();
            }, store.state.enemiesSpeed * 10)
          }
        } else {
          setTimeout(() => {
            this.randomWay();
          }, store.state.enemiesSpeed * 10)
        }
      } else {
        setTimeout(() => {
          this.randomWay();
        }, store.state.enemiesSpeed * 10)
      }
    },
    randomWay() {
      if (this.canMove) {
        let random = Math.floor(Math.random() * 4);
        if (random === 0) {
          this.enemyUp();
        } else if (random === 1) {
          this.enemyDown();
        } else if (random === 2) {
          this.enemyRight();
        } else if (random === 3) {
          this.enemyLeft();
        }
      }
    },
    dropBonus(){
      const item = {
        id: this.id,
        posX: this.posX,
        posY: this.posY,
        bonus: this.bonus
      }
      store.state.bonus.push(item)
    }
  },
  mounted() {
    this.$refs.enemy.style.left = this.posX+"0%";
    this.$refs.enemy.style.top = this.posY+"0%";
    setTimeout(()=>{
      this.randomWay();
    },2000)
  },
  beforeDestroy() {
    this.dropBonus();
  }
}
</script>

<style scoped lang="scss">
  .enemy{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    transition: 250ms;
    .design {
      position: relative;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      background-color: orangered;
      border-radius: 50%;
      &.dead, &.dead:before{
        background-color: red;
      }
      &:before {
        content: "";
        position: absolute;
        top: -10%;
        left: 25%;
        height: 50%;
        width: 50%;
        transform: rotate(45deg);
        background-color: orangered;
      }
    }
  }

</style>
