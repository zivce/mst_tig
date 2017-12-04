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
  this.mst = function () {
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
    myResultEdges = this.EdgesOfMST;
  } //end mst
} //end_graf
