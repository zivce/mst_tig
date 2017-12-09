function MSTEdge(firstNode, secondNode, weight, id) {
    var that = this;

    this.firstNode = firstNode;
    this.secondNode = secondNode;
    this.weight = weight;
    this.id = id;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.setIdAndWeight = function (tmpId) {
        this.id = tmpId;
        this.weight = getRandomInt(1,100);
    }
}
