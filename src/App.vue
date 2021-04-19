<template>
  <div id="app">
    <header>
      <h1>Bomber Script</h1>
      <ul class="legend">
        <li>Use the arrow keys to move</li>
        <li>Press space key to drop a bomb</li>
        <li>Keep away from the bomb</li>
        <li>Find the exit</li>
      </ul>
    </header>
    <div class="stats" :class="[isWin ? 'win' : '', isDead ? 'dead' : '']">
      <p v-if="!isDead && !isWin">Bombs: {{bombsDropped}}/ {{totalBombs}}</p>
      <p v-if="isDead">YOU LOSE</p>
      <p v-if="isWin">YOU WIN</p>
    </div>
    <div class="stats reload" @click="reload">
      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0z" fill="#333028"/></svg>
    </div>
    <board></board>
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
      return store.state.player.bombsDropped
    },
    totalBombs(){
      return store.state.player.bombs
    },
    isDead() {
      return store.state.player.isDead;
    },
    isWin(){
      return store.state.player.win
    }
  },
  methods:{
    reload(){
      document.location.reload();
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  header{
    height: 200px;
    background-color: #BFB395;
    margin-bottom: 50px;
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
    height: 50px;
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
    width: 50px;
    left: calc(50% + 120px);
    cursor: pointer ;
    svg{
      position: relative;
      left: 2px;
      transition: 750ms;
      transform-origin: 18px 20px;
    }
    &:hover svg{
      transform: rotate(270deg);
    }
  }
}
</style>
