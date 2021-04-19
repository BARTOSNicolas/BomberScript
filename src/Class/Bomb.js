export default class BombCase{
    isDrop = false;
    isExplode = false;
    cellBours = {};
    bombBours = {};
    caseBomb = [];
    constructor( posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    setCellBours(boardCell){
        if (this.posX !== 0) {
            this.cellBours["left"] = boardCell[this.posX - 1][this.posY];
        }
        if (this.posY !== 0) {
            this.cellBours["top"] = boardCell[this.posX][this.posY - 1];
        }
        if (this.posX !== 9) {
            this.cellBours["right"] = boardCell[this.posX + 1][this.posY];
        }
        if (this.posY !== 9) {
            this.cellBours["bottom"] = boardCell[this.posX][this.posY + 1];
        }
    }
    setBombBours(boardBomb) {
        if (this.posX !== 0) {
            this.bombBours["left"] = boardBomb[this.posX - 1][this.posY];
        }
        if (this.posY !== 0) {
            this.bombBours["top"] = boardBomb[this.posX][this.posY - 1];
        }
        if (this.posX !== 9) {
            this.bombBours["right"] = boardBomb[this.posX + 1][this.posY];
        }
        if (this.posY !== 9) {
            this.bombBours["bottom"] = boardBomb[this.posX][this.posY + 1];
        }
    }

    checkLeft(boardCell, boardBomb, bombLength) {
        for (let i = 1; i <= bombLength; i++) {
            if (typeof boardCell[this.posX - i] !== "undefined") {
                if (typeof boardCell[this.posX - i][this.posY] !== "undefined") {
                    if (boardCell[this.posX - i][this.posY].isBlock) {
                        boardBomb[this.posX - i][this.posY].explode();
                        break;
                    } else {
                        boardBomb[this.posX - i][this.posY].explode();
                    }
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    checkRight(boardCell, boardBomb, bombLength) {
        for (let i = 1; i <= bombLength; i++) {
            if (typeof boardCell[this.posX + i] !== "undefined") {
                if (typeof boardCell[this.posX + i][this.posY] !== "undefined") {
                    if (boardCell[this.posX + i][this.posY].isBlock) {
                        boardBomb[this.posX + i][this.posY].explode();
                        break;
                    } else {
                        boardBomb[this.posX + i][this.posY].explode();
                    }
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    checkTop(boardCell, boardBomb, bombLength) {
        for (let i = 1; i <= bombLength; i++) {
            if (typeof boardCell[this.posX][this.posY - i] !== "undefined") {
                if (boardCell[this.posX][this.posY - i].isBlock) {
                    boardBomb[this.posX][this.posY - i].explode();
                    break;
                } else {
                    boardBomb[this.posX][this.posY - i].explode();
                }
            } else {
                break;
            }
        }
    }

    checkBottom(boardCell, boardBomb, bombLength) {
        for (let i = 1; i <= bombLength; i++) {
            if (typeof boardCell[this.posX][this.posY + i] !== "undefined") {
                if (boardCell[this.posX][this.posY + i].isBlock) {
                    boardBomb[this.posX][this.posY + i].explode();
                    break;
                } else {
                    boardBomb[this.posX][this.posY + i].explode();
                }
            } else {
                break;
            }
        }
    }
    dropBomb(boardCell, boardBomb, bombLength = 1){
        this.isDrop = true;
        setTimeout(() => {
            this.isDrop = false;
            this.explode()
            this.checkLeft(boardCell, boardBomb, bombLength);
            this.checkTop(boardCell, boardBomb, bombLength);
            this.checkRight(boardCell, boardBomb, bombLength);
            this.checkBottom(boardCell, boardBomb, bombLength);
        }, 2000)

    }

    explode() {
        this.isExplode = true;
        setTimeout(() => {
            this.isExplode = false;
        }, 1000)
    }
}
