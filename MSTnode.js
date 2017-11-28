function MSTnode(x, y, id) {
    var that = this;

    this.x = x;
    this.y = y;
    this.id = id;
    this.cost = 0;
    this.adjacentNodesList = [];

    this.addAdjacentNode = function (adjNode){
        this.adjacentNodesList.push(adjNode);
    }
}