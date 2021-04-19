<template>
  <div class="container">
    <div class="board" ref="board">
      <player></player>
      <div class="bombLine" v-for="(line, id) in bombs2D" :key="id+'bX'">
        <bomb v-for="(bomb, id) of line" :key="id+'bY'" :bomb="bomb"></bomb>
      </div>
      <div class="cellLine" v-for="(line, id) in celles2D" :key="id+'cX'">
        <cell v-for="(cell, id) in line" :key="id+'cY'" :cell="cell"></cell>
      </div>
      <enemi v-for="(enemi) in enemies" :key="enemi.id+'E'" :enemi="enemi"></enemi>
    </div>
  </div>
</template>

<script>
import CellCase from "../Class/Cell";
import BombCase from "../Class/Bomb";
import store from '../store'
import Cell from "./Cell"
import Player from "./Player";
import Bomb from "./Bomb";
import Enemi from "./Enemi";

export default {
  name: "Board.vue",
  components:{
    Enemi,
    Cell,
    Player,
    Bomb,
  },
  data (){
    return{
      bombs: [],
      celles2D: store.state.celles2D,
      bombs2D: store.state.bombs2D,
      enemies: store.state.enemies
    }
  },
  methods:{
    createGame(){
      for(let x = 0; x < 10; x++){
        for(let y = 0; y < 10; y++){
          const cell = new CellCase(x, y);
          const bomb = new BombCase(x, y);
          if(store.state.celles2D[cell.posX] === undefined){
            store.state.celles2D.push([])
          }
          store.state.celles2D[cell.posX].push(cell)

          if(store.state.bombs2D[bomb.posX] === undefined){
            store.state.bombs2D.push([])
          }
          store.state.bombs2D[bomb.posX].push(bomb)
        }
      }

    },
    checkNeighbours(){
      for(let line of store.state.celles2D) {
        for(let cell of line){
          cell.checkNeighbours(store.state.celles2D)
        }
      }
    },
    checkAllBomb(){
      for(let line of store.state.bombs2D) {
        for(let bomb of line){
          bomb.setCellBours(store.state.celles2D)
          bomb.setBombBours(store.state.bombs2D)
        }
      }
    },
    randomBlock(){
      for(let line of store.state.celles2D) {
        for(let cell of line){
          if ((cell.posX === 0 && cell.posY === 0) || (cell.posX === 0 && cell.posY === 1) || (cell.posX === 1 && cell.posY === 0)) {
            cell.isBlock = false;
          }else{
            const random = Math.floor(Math.random() * 2)
            if( random === 1){
              cell.isBlock = true
            }
          }
        }
      }
    },
    setOutDoor(){
        const randX = Math.floor(Math.random() * 10);
        const randY = Math.floor(Math.random() * 10);
      for(let line of store.state.celles2D) {
        for(let cell of line){
          if(cell.posX === randX && cell.posY === randY){
            if (cell.isBlock && (cell.posX !== 0 && cell.posY !== 0)){
              cell.isDoor = true;
            }else{
              this.setOutDoor()
            }
          }
        }
      }
    },
    createEnemies(){
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      function create(i){
        const randX = getRandomInt(4,10);
        const randY = getRandomInt(4,10);
        if(!store.state.celles2D[randX][randY].isBlock){
          store.state.enemies.push({
            id: i,
            posX: randX,
            posY: randY,
            canMove: true,
            isDead: false,
          })
        }else{
          create(i)
        }
      }
      for(let i = 0; i < store.state.enemiesNbr; i++){
        create(i)
      }
    }
  },
  created() {
    this.createGame()
    this.checkNeighbours()
    this.checkAllBomb()
    this.randomBlock()
    this.setOutDoor()
    setTimeout(()=>{
      this.createEnemies()
      console.log(store.state.enemies)
    },2000)



  },
}
</script>

<style scoped lang="scss">
.container{
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.board{
  position: relative;
  height: 700px;
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 50px;
  .cellLine, bombLine{
    width: 10%;
    height: 10%;
  }
}

</style>
