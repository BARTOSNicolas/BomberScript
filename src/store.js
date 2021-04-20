import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        celles2D: [],
        bombs2D: [],
        enemies: [],
        bonus: [],
        enemiesSpeed: 50,
        enemiesNbr: 7,
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
    mutations: {
        addCelles2D (state, cell) {
            state.celles2D.push(cell)
        },
        addBomb2D (state, cell) {
            state.celles2D.push(cell)
        }
    }
})
