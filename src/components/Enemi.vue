<template>
  <div class="enemi" ref="enemi">
    <div class="design" :class="isDead ? 'dead' : ''"></div>
  </div>
</template>

<script>
import store from '../store'

export default {
name: "Enemi.vue",
  props:{
    enemi: Object,
  },
  data(){
    return{
      id: this.enemi.id,
      posX: this.enemi.posX,
      posY: this.enemi.posY,
    }
  },
  computed:{
     isDead(){
       return store.state.enemies.some(item => {
         if(item.id === this.id){
           return item.isDead
         }
       })
     },
    canMove(){
      return store.state.enemies.some(item => {
        if(item.id === this.id){
          return item.canMove
        }
      })
    },

  },
  watch:{
    posX(val, oldval){
      this.$refs.enemi.style.left = this.posX+"0%";
      if(this.posX === store.state.player.posX && this.posY === store.state.player.posY){
        store.state.player.canMove = false;
        store.state.enemiesCanMove = false;
        store.state.player.isDead = true;
      }
      if(val < oldval){
        this.$refs.enemi.style.transform = "rotate(-90deg)";
      }else{
        this.$refs.enemi.style.transform = "rotate(90deg)";
      }
    },
    posY(val, oldval){
      this.$refs.enemi.style.top = this.posY+"0%";
      if(this.posX === store.state.player.posX && this.posY === store.state.player.posY){
        store.state.player.canMove = false;
        store.state.enemiesCanMove = false;
        store.state.player.isDead = true;
      }
      if(val < oldval){
        this.$refs.enemi.style.transform = "rotate(0deg)";
      }else{
        this.$refs.enemi.style.transform = "rotate(180deg)";
      }
    },
  },
  methods: {
    enemiUp() {
      if (this.posY !== 0) {
        if (!store.state.celles2D[this.posX][this.posY - 1].isBlock) {
          if (!store.state.bombs2D[this.posX][this.posY - 1].isDrop) {
            if (this.canMove) {
              this.posY--;
              store.state.enemies.forEach(enemi => {
                if(enemi.id === this.id){
                  enemi.posY = this.posY
                }
              })
              setTimeout(() => {
                this.enemiUp();
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
    enemiDown() {
      if (this.posY !== 9) {
        if (!store.state.celles2D[this.posX][this.posY + 1].isBlock) {
          if (!store.state.bombs2D[this.posX][this.posY + 1].isDrop) {
            if (this.canMove) {
              this.posY++;
              store.state.enemies.forEach(enemi => {
                if(enemi.id === this.id){
                  enemi.posY = this.posY
                }
              })
              setTimeout(() => {
                this.enemiDown();
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
    enemiRight() {
      if (this.posX !== 9) {
        if (!store.state.celles2D[this.posX + 1][this.posY].isBlock) {
          if (!store.state.bombs2D[this.posX + 1][this.posY].isDrop) {
            if (this.canMove) {
              this.posX++;
              store.state.enemies.forEach(enemi => {
                if(enemi.id === this.id){
                  enemi.posX = this.posX
                }
              })
              // this.$refs.enemi.style.transform = "rotate(90deg)";
              setTimeout(() => {
                this.enemiRight();
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
    enemiLeft() {
      if (this.posX !== 0) {
        if (!store.state.celles2D[this.posX - 1][this.posY].isBlock) {
          if (!store.state.bombs2D[this.posX - 1][this.posY].isDrop) {
            if (this.canMove) {
              this.posX--;
              store.state.enemies.forEach(enemi => {
                if(enemi.id === this.id){
                  enemi.posX = this.posX
                }
              })
              // this.$refs.enemi.style.transform = "rotate(-90deg)";
              setTimeout(() => {
                this.enemiLeft();
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
          this.enemiUp();
        } else if (random === 1) {
          this.enemiDown();
        } else if (random === 2) {
          this.enemiRight();
        } else if (random === 3) {
          this.enemiLeft();
        }
      }
    },
  },
  mounted() {
    this.$refs.enemi.style.left = this.posX+"0%";
    this.$refs.enemi.style.top = this.posY+"0%";
  },
  created() {
    this.randomWay();
  }
}
</script>

<style scoped lang="scss">
  .enemi{
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
