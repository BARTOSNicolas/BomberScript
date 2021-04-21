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
      <enemi v-for="enemy in enemies" :key="enemy.id+'E'" :enemy="enemy"></enemi>
      <bonus v-for="item in bonus" :key="item.id" :item="item" ></bonus>
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
import Enemi from "./Enemy";
import Bonus from "./Bonus";


export default {
  name: "Board.vue",
  props:["newGame"],
  components:{
    Enemi,
    Cell,
    Player,
    Bomb,
    Bonus
  },
  computed:{
    celles2D:{
      get(){
        return store.state.celles2D;
      },
      set(value){
        store.state.celles2D = value;
      }
    },
    bombs2D:{
      get(){
        return store.state.bombs2D;
      },
      set(value){
        store.state.bombs2D = value
      }
    },
    enemies:{
      get(){
        return store.state.enemies;
      },
      set(value){
        store.state.enemies = value;
      }
    },
    bonus:{
      get(){
        return store.state.bonus;
      },
      set(value){
        store.state.bonus = value;
      }
    },
    isWin(){
      return store.state.player.win;
    },
    isDead(){
      return store.state.player.isDead;
    }
  },
  watch:{
    isWin(val) {
      setTimeout(() => {
        if (val) {
          store.state.level++
          store.state.enemiesNbr++
          if (store.state.enemiesSpeed > 10) {
            store.state.enemiesSpeed = store.state.enemiesSpeed - 5
          }
          this.resetGame(store.state.level, store.state.enemiesNbr, store.state.enemiesSpeed)
          this.createGame()
        }
      }, 2200)
    },
    isDead(val){
      setTimeout(() => {
        if (val) {
          this.resetGame(store.state.level, store.state.enemiesNbr, store.state.enemiesSpeed)
          this.createGame()
        }
      }, 4200)
    }
  },
  methods:{
    createBrick(){
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
      for(let line of this.celles2D) {
        for(let cell of line){
          cell.checkNeighbours(this.celles2D)
        }
      }
    },
    checkAllBomb(){
      for(let line of this.bombs2D) {
        for(let bomb of line){
          bomb.setCellBours(this.celles2D)
          bomb.setBombBours(this.bombs2D)
        }
      }
    },
    randomBlock(){
      for(let line of this.celles2D) {
        for(let cell of line){
          if ((cell.posX === 0 && cell.posY === 0) || (cell.posX === 0 && cell.posY === 1) || (cell.posX === 1 && cell.posY === 0)) {
            cell.isBlock = false;
          }else{
            const random = Math.floor(Math.random() * 2);
            if( random === 1){
              cell.isBlock = true;
            }
          }
        }
      }
    },
    setTheDoor(){
      const randX = Math.floor(Math.random() * 10);
      const randY = Math.floor(Math.random() * 10);
      for(let line of this.celles2D) {
        for(let cell of line){
          if(cell.posX === randX && cell.posY === randY){
            if (cell.isBlock && (cell.posX !== 0 && cell.posY !== 0)){
              cell.isDoor = true;
            }else{
              this.setTheDoor();
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
      store.state.enemies =[];
      function create(i){
        const randX = getRandomInt(3,10);
        const randY = getRandomInt(3,10);
        //Define BONUS
        let bonus;
        if(i===0){
          bonus = 'isKey';
        }else if(i%2 === 0){
          bonus = 'isBomb';
        }else{
          bonus = 'isBombArea';
        }
        //If X Y no block push Enemy to store
        if(!store.state.celles2D[randX][randY].isBlock){
          store.state.enemies.push({
            id: i,
            posX: randX,
            posY: randY,
            canMove: true,
            isDead: false,
            bonus: bonus
          });
        }else{
          create(i);
        }
      }
      //Create Enemies
      for(let i = 0; i < store.state.enemiesNbr; i++){
        setTimeout(()=>{
          create(i);
        },i*250)
      }
    },
    resetGame(level = 1, enemies = 3, speed = 100){
      //Reset Store
      store.state.celles2D = [];
      store.state.bombs2D = [];
      store.state.enemies = [];
      console.log(store.state.enemies)
      setTimeout(()=>{
        this.bonus = [];
      }, 10)
      store.state.level = level;
      store.state.enemiesSpeed = speed;
      store.state.enemiesNbr = enemies;
      store.state.player = {
        posX: 0,
        posY: 0,
        canMove: true,
        bombs: 3,
        bombsDropped: 0,
        bombLength: 1,
        isDead: false,
        win: false,
        hasKey: false
      };
    },
    createGame(){
      this.createBrick();
      this.randomBlock();
      this.setTheDoor();
      this.checkNeighbours();
      this.checkAllBomb();
      this.createEnemies();


    },
  },
  created() {
    this.createGame();
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
