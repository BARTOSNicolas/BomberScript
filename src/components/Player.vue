<template>
  <div class="player" ref="player">
    <div class="design" :class="isDead ? 'dead' : ''"></div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: "Player.vue",
  computed:{
    posX: {
      get() {
        return store.state.player.posX
      },
      set(value){
        store.state.player.posX = value
      }
    },
    posY: {
      get() {
        return store.state.player.posY
      },
      set(value){
        store.state.player.posY = value
      }
    },
    isDead(){
      return store.state.player.isDead
    }
  },

  methods:{
    playerUp() {
      if (!store.state.celles2D[this.posX][this.posY-1].isBlock){
          if(!store.state.bombs2D[this.posX][this.posY-1].isDrop) {
            if (this.posY !== 0) {
              this.posY--
            }
          }
      }
    },
    playerDown() {
      if (!store.state.celles2D[this.posX][this.posY+1].isBlock){
          if(!store.state.bombs2D[this.posX][this.posY+1].isDrop) {
            if (this.posY !== 9) {
              this.posY++
            }
          }
      }
    },
    playerRight(){
      if (!store.state.celles2D[this.posX+1][this.posY].isBlock){
          if(!store.state.bombs2D[this.posX+1][this.posY].isDrop) {
            if (this.posX !== 9) {
              this.posX++
            }
          }
      }
    },
    playerLeft() {
      if (!store.state.celles2D[this.posX-1][this.posY].isBlock) {
        if (!store.state.bombs2D[this.posX - 1][this.posY].isDrop) {
          if (this.posX !== 0) {
            this.posX--
          }
        }
      }
    },
    checkBonus(){
      for (let item of store.state.bonus) {
        if (item.posX === this.posX && item.posY === this.posY) {
          if (item.bonus === "isKey") {
            store.state.player.hasKey = true;
            store.state.bonus.splice(store.state.bonus.indexOf(item), 1)
          } else if (item.bonus === "isBomb") {
            store.state.player.bombs++
            store.state.bonus.splice(store.state.bonus.indexOf(item), 1)
          } else if (item.bonus === "isBombArea") {
            store.state.player.bombLength++
            store.state.bonus.splice(store.state.bonus.indexOf(item), 1)
          }
        }
      }
    },
    checkTheDoor(){
      if (store.state.celles2D[this.posX][this.posY].isDoor && store.state.player.hasKey) {
        for (let enemi of store.state.enemies) {
          enemi.canMove = false;
        }
        store.state.player.canMove = false;
        store.state.player.win = true;
      }
    },
    checkEnemies(){
      for (let enemy of store.state.enemies) {
        if (this.posX === enemy.posX && this.posY === enemy.posY) {
          console.log(enemy)
          store.state.player.canMove = false;
          store.state.player.isDead = true;
          console.log('RUN ON ENEMY')
        }
      }
    }
  },

  watch: {
    posX() {
      this.$refs.player.style.left = this.posX + "0%"
      store.state.player.posX = this.posX
      this.checkTheDoor();
      this.checkEnemies();
      this.checkBonus();
    },
    posY() {
      this.$refs.player.style.top = this.posY + "0%"
      store.state.player.posY = this.posY
      this.checkTheDoor();
      this.checkEnemies();
      this.checkBonus();
    }
  },
  mounted(){
    window.addEventListener("keydown", (e)=>{
      e.preventDefault()
      if(store.state.player.canMove) {
        if (e.keyCode === 38) {
          if (this.posY >= 0 && this.posY <= 9 && this.posY !== 0) {
            this.playerUp()
            this.$refs.player.style.transform = "rotate(0deg)"
          }
        } else if (e.keyCode === 40) {
          if (this.posY >= 0 && this.posY <= 9 && this.posY !== 9) {
            this.playerDown()
            this.$refs.player.style.transform = "rotate(180deg)"
          }
        } else if (e.keyCode === 39) {
          if (this.posX >= 0 && this.posX <= 9 && this.posX !== 9) {
            this.playerRight()
            this.$refs.player.style.transform = "rotate(90deg)"
          }
        } else if (e.keyCode === 37) {
          if (this.posX >= 0 && this.posX <= 9 && this.posX !== 0) {
            this.playerLeft()
            this.$refs.player.style.transform = "rotate(-90deg)"
          }
        } else if (e.keyCode === 32) {
          if(store.state.player.bombsDropped < store.state.player.bombs){
            store.state.player.bombsDropped++
            const bombDropped = store.state.bombs2D[this.posX][this.posY]
            bombDropped.dropBomb(store.state.celles2D, store.state.bombs2D, store.state.player.bombLength)
            setTimeout(()=>{
              store.state.player.bombsDropped--
            },2000)
          }
        }
      }
    })
  }

}
</script>

<style scoped lang="scss">

.player{
  position: absolute;
  z-index: 15;
  top: 0;
  left: 0;
  width: 10%;
  height: 10%;
  transition: 250ms;
  .design{
    position: relative;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background-color: olive;
    border-radius: 50%;
    &:before{
      content: "";
      position: absolute;
      top: -10%;
      left: 25%;
      height: 50%;
      width: 50%;
      transform: rotate(45deg);
      background-color: olive;
    }
    &.dead, &.dead:before{
      background-color: darkred;
    }
  }
}
</style>
