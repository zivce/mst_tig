function MSTnode(x, y, id) {
    var that = this;

    this.id = id;
    this.x = x;
    this.y = y;
    this.cost = 0;
    this.visited = false;
    
    this.adjacentNodesList = [];
    this.edgesList = [];

    this.addAdjacentNodeTolist = function (adjNode) {
        this.adjacentNodesList.push(adjNode);
    }

    this.addEdgeToList = function (edge) {
        this.edgesList.push(edge);
    }

    this.removeDuplicates = function () {
        this.adjacentNodesList = Array.from(new Set(this.adjacentNodesList));
        this.edgesList = Array.from(new Set(this.edgesList));
    }




}
