export default class CellCase{
    isBlock = false;
    isDoor = false;
    neighbours = [];
    constructor( posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    checkNeighbours(board){
        if(this.posX !== 0){
            this.neighbours.push(board[this.posX-1][this.posY])
        }
        if(this.posY !== 0){
            this.neighbours.push(board[this.posX][this.posY-1])
        }
        if(this.posX !== 9){
            this.neighbours.push(board[this.posX+1][this.posY])
        }
        if(this.posY !== 9){
            this.neighbours.push(board[this.posX][this.posY+1])
        }
    }
}
