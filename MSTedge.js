function MSTEdge(firstNode, secondNode, weight, id) {
    var that = this;

    this.firstNode = firstNode;
    this.secondNode = secondNode;
    this.weight = weight;
    this.id = id;
    this.visited = false;

    this.setIdAndWeight = function (tmpId) {
        this.id = tmpId;
        this.weight = tmpId;
    }
}
