<template>
  <div id="app">
    <header>
      <h1>Bomber Script</h1>
      <ul class="legend">
        <li>Use the arrow keys to move</li>
        <li>Press space key to drop a bomb</li>
        <li>Keep away from the bomb</li>
        <li>Kill the enemies to find the key and the exit behind the blocks</li>
      </ul>
    </header>
    <div class="stats" :class="[isWin ? 'win' : '', isDead ? 'dead' : '']">
      <p v-if="!isDead && !isWin">Level : {{level}}</p>
      <p v-if="!isDead && !isWin">Bombs : {{bombsDropped}}/{{totalBombs}}</p>
      <p v-if="!isDead && !isWin">BombsLength : {{bombLength}}</p>
      <p v-if="!isDead && !isWin">Enemies : {{enemies}}/{{nbrOfEnemies}}</p>
      <p v-if="!isDead && !isWin">Key found : {{hasKey ? 'Yes' : 'No'}}</p>
      <p v-if="isDead">YOU LOSE</p>
      <p v-if="isWin">YOU WIN</p>
    </div>
    <div class="blur" :class="[isWin ? 'win' : '', isDead ? 'dead' : '']">
      <board class="board" ></board>
    </div>
  </div>
</template>

<script>
import Board from "./components/Board";
import store from "./store"

export default {
  name: 'App',
  components: {
    Board
  },
  computed:{
    bombsDropped(){
      return store.state.player.bombsDropped;
    },
    totalBombs(){
      return store.state.player.bombs;
    },
    level(){
      return store.state.level
    },
    nbrOfEnemies(){
      return store.state.enemiesNbr
    },
    enemies(){
      return store.state.enemies.length
    },
    isDead() {
      return store.state.player.isDead;
    },
    isWin(){
      return store.state.player.win;
    },
    hasKey(){
      return store.state.player.hasKey;
    },
    bombLength(){
      return store.state.player.bombLength;
    }
  },
}
</script>

<style lang="scss">
#app {
  position: relative;
  header{
    height: 200px;
    background-color: #BFB395;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: solid 5px #B3A98B;
    h1{
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      font-size: 4em;
    }
    .legend{
      margin: 0;
      padding: 0;
      padding-bottom: 25px;
    }
  }
  .stats{
    position: absolute;
    z-index: 99;
    top: 180px;
    left: calc(50% - 100px);
    width: 200px;
    height: 90px;
    text-align: center;
    border: 5px solid;
    //Light
    border-top-color: #F2E5BD;
    border-left-color: #F2E5BD;
    //Dark
    border-bottom-color: #B3A98B;
    border-right-color: #B3A98B;
    //BGC
    background-color: #D9CDA9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
    &.win{
      background-color: olive
    }
    &.dead{
      background-color: orangered;
    }
  }
  .stats.reload{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    top: 200px;
    left: calc(50% + 120px);
    cursor: pointer ;
    svg{
      position: relative;
      left: 2px;
      transition: 750ms;
      transform-origin: 18px 20px;
    }
    &:hover{
      //Light
      border-top-color: lighten(#F2E5BD, 5%);
      border-left-color: lighten(#F2E5BD, 5%);
      //Dark
      border-bottom-color: lighten(#B3A98B, 5%);
      border-right-color: lighten(#B3A98B, 5%);
      //BGC
      background-color: lighten(#D9CDA9, 5%);
    }
    &:focus{
      outline: none;
    }
    &:disabled{
      //Light
      border-top-color: #ADADAD;
      border-left-color: #ADADAD;
      //Dark
      border-bottom-color: #616161;
      border-right-color: #616161;
      //BGC
      background-color: #878787;
      & svg{
        opacity: 0.5;
      }
    }
  }
  @keyframes blur {
    0%{filter: blur(0px)}
    70%{filter: blur(100px)}
    100%{filter: blur(0px)}
  }

  .blur{
    filter: blur(0px);
    &.win{
      animation: blur 3s forwards;
    }
    &.dead{
      animation: blur 3s 2s forwards;
    }
  }
}
</style>
