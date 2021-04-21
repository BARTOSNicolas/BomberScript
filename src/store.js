import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        level : 1,
        enemiesSpeed: 100,
        enemiesNbr: 3,
        celles2D: [],
        bombs2D: [],
        enemies: [],
        bonus: [],
        player: {
            posX: 0,
            posY: 0,
            canMove: true,
            bombs: 3,
            bombsDropped: 0,
            bombLength: 1,
            isDead: false,
            win: false,
            hasKey: false
        }
    },
})
