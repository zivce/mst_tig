function MSTGraph(pnode, pedge) {

  let that = this;

  this.NodeList = pnode.slice();

  this.EdgesOfMST = pedge.slice();

  this.oldEdges = this.EdgesOfMST.slice();

  //console.log(this.oldEdges);
  //za sortiranje po opadajucem kriterijumu
  this.sortMethod = function (edge0, edge1) {
    return edge1.weight - edge0.weight;
  };
  let kruskal, milos;
  kruskal = 0;
  milos = 0;

  /* resets nodes visited to false
   *  working reset
   */

  this.resetVisits = function () {
    that.NodeList.forEach((el) => {
      el.visited = false;
    })
  }

  /* check if connected graph
   * working connected
   */

  this.connected = function () {
    let p = true;

    that.NodeList.forEach((el) => {
      if (!el.visited)
        p = false;
      //!visited <=> disconnected
    })

    //all visited <=> connected
    return p;
  }

  /* depth first search
   * @param {integer} id id of node
   * working dfs
   */
  this.count = 0;
  this.dfs = function (id) {
    let workingNode = that.NodeList[id];

    if (!workingNode.visited)
      workingNode.visited = true;
    else
      return;

    let neighborsArr = this.EdgesOfMST.map((edge) => {
      if (edge.firstNode === workingNode) {
        return edge.secondNode;
      }
      if(edge.secondNode === workingNode)
      {
        return edge.firstNode;
      }
      
    })
    //console.log(neighborsArr);
    if (neighborsArr.length > 0)
      for (let i = 0; i < neighborsArr.length; i++) {
        if (typeof neighborsArr[i] !== "undefined")
          this.dfs(neighborsArr[i].id);
      }

  }


  /*
   * *mst via reverse-delete*
   *  use of dfs
   *  working..
   */
  this.Milos = function () {
    that.EdgesOfMST.sort(that.sortMethod);
    //console.log(that.EdgesOfMST);
    let i = 0;

    while (i < that.EdgesOfMST.length) {

      let e = that.EdgesOfMST[i];
      //del edge at i
      that.EdgesOfMST.splice(i, 1);
      //utility to check connections
      that.dfs(1);
      //mst must be connected
      if (!that.connected()) {
        that.EdgesOfMST.splice(i, 0, e);
        i = i + 1;
      }

      //console.log(that.EdgesOfMST);
      that.resetVisits();
    } //end while

    //working
    console.log("min sp tree");
    console.log(this.EdgesOfMST);

    console.log("min weight of milos:")
    this.EdgesOfMST.forEach((el) => {
      milos += el.weight;
    })

    console.log(milos);

    myResultEdges = this.EdgesOfMST;

  } //end mst

  this.Kruskal = function () {
    that.EdgesOfMST.sort(that.sortMethod);

    var NodeSets = [];
    var EdgeSets = [];
    var KruskalEdges = [];

    var CurrentEdge0 = this.EdgesOfMST.pop();
    var Node01 = CurrentEdge0.firstNode;
    var Node02 = CurrentEdge0.secondNode;

    NodeSets.push(aa = []);
    aa.push(Node01);
    aa.push(Node02);

    EdgeSets.push(bb = []);
    bb.push(CurrentEdge0);

    while (EdgeSets[0].length < this.NodeList.length - 1) {
      var CurrentEdge = this.EdgesOfMST.pop();
      var Node1 = CurrentEdge.firstNode;
      var Node2 = CurrentEdge.secondNode;
      var i1 = -1;
      var i2 = -1;
      var j1 = -1;
      var j2 = -1;

      for (index = 0; index < NodeSets.length; index++) {

        var pom1 = NodeSets[index].indexOf(Node1);
        var pom2 = NodeSets[index].indexOf(Node2);

        if (pom1 > -1) {
          i1 = pom1;
          j1 = index;
        }
        if (pom2 > -1) {
          i2 = pom2;
          j2 = index;
        }
      }
      if ((j1 === -1) && (j2 === -1)) {
        NodeSets.push(a = []);
        a.push(Node1);
        a.push(Node2);
        EdgeSets.push(b = []);
        b.push(CurrentEdge);
        continue;
      }
      if (((j1 > -1) && (j2 > -1)) && (j1 != j2)) {
        var pom;
        var len = NodeSets[j2].length;
        for (var ind = 0; ind < len; ind++) {
          pom = NodeSets[j2].pop();
          NodeSets[j1].push(pom);
        }
        NodeSets.splice(j2, 1);
        var Pe;
        var len = EdgeSets[j2].length;
        for (var ieg = 0; ieg < len; ieg++) {
          Pe = EdgeSets[j2].pop();
          EdgeSets[j1].push(Pe);
        }
        EdgeSets.splice(j2, 1);
        EdgeSets[0].push(CurrentEdge);
        continue;
      }
      if (j2 === j1) continue;
      if ((j2 < 0) && (j1 > -1)) {
        NodeSets[j1].push(Node2);
        EdgeSets[j1].push(CurrentEdge);
        continue;
      }
      if ((j1 < 0) && (j2 > -1)) {
        NodeSets[j2].push(Node1);
        EdgeSets[j2].push(CurrentEdge);
        continue;
      }
    }
    KruskalEdges = EdgeSets[0].slice();

    console.log("min weight of kruskal:");
    KruskalEdges.forEach((el) => {
      kruskal += el.weight;
    })

    console.log(kruskal);

    myResultEdges = KruskalEdges;
  }
} //end_graf
