function MSTGraph(pnode, pedge) {

  let that = this;
  this.closedSetLastAdded;
  this.NodeList = pnode.slice();

  this.EdgesOfMST = pedge.slice();

  this.oldEdges = this.EdgesOfMST.slice();

  //za sortiranje po opadajucem kriterijumu
  this.sortMethod = function (edge0, edge1) {
    return edge1.weight - edge0.weight;
  };


  this.sortMethod2 = function (edge0, edge1) {
    return edge0.weight - edge1.weight;
  };
  let kruskal, revdel;
  kruskal = 0;
  revdel = 0;

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

  /** depth first search
   * @param {integer} id id of node
   * working dfs
   */
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
      if (edge.secondNode === workingNode) {
        return edge.firstNode;
      }

    })

    if (neighborsArr.length > 0)
      for (let i = 0; i < neighborsArr.length; i++) {
        if (typeof neighborsArr[i] !== "undefined")
          this.dfs(neighborsArr[i].id);
      }

  }

  /**
   * Nedovrsena fja dfs 2 spanning tree
   * @param {integer} root 
   */

  // this.dfsST = function(root)
  // { 
  //   this.resetVisits();
  //   //console.log("DFS ST NEW ");
  //   var stack = [];
  //   var edgesForExport = [];
  //   stack.push(root);

  //   while(stack.length!=0)
  //   {
  //     var curr = stack.pop();//skida prvi elem

  //     this.NodeList[curr].visited = true;

  //     edgesForExport.push(this.NodeList[curr].edgesList.find((edge) => {
  //       if(edge.firstNode === this.NodeList[curr].cameFrom || edge.secondNode === this.NodeList[curr].cameFrom)
  //         return edge;
  //     }))

  //     this.NodeList[curr].adjacentNodesList.forEach((neighbor)=>{
  //       if(neighbor.visited == false)
  //       {
  //         neighbor.cameFrom = this.NodeList[curr];
  //         stack.push(neighbor.id);
  //       }  
  //     })
  //   }

  //   console.log(edgesForExport);
  //   return edgesForExport;
  // }


  this.bfsST = function (root) {
    this.resetVisits();
    //console.log("BFS ST NEW ");
    var queue = [];
    var edgesForExport = [];
    this.NodeList[root].visited = true;
    queue.push(root);

    while (queue.length != 0) {
      var curr = queue.shift(); //skida prvi elem


      this.NodeList[curr].adjacentNodesList.forEach((neighbor) => {
        if (neighbor.visited == false) {
          //debugger;
          edgesForExport.push(this.NodeList[curr].edgesList.find((edge) => {
            if (edge.firstNode === neighbor || edge.secondNode === neighbor)

              return edge;
          }))
          //bfs visited
          neighbor.visited = true;
          queue.push(neighbor.id);
        }
      })
    }

    //console.log(edgesForExport);
    return edgesForExport;
  }





  /**
   * Bfs/Dfs to run st operation
   * bdfsSt(start)
   * to each node
   * @param {id of node} start of starting node
   * @returns {MSTEdge[]} from startNode
   */

  this.bdfsSt = function (start, t) {
    let arrOfPaths = [];
    that.NodeList.forEach(
      (node) => {
        if (node.id === start)
          return;
        arrOfPaths.push(that.bdfsUtilSt(start, node.id, t));
      }
    )

    /* prodji kroz niz putanja i dodaj u
       jedan niz sve razlicite
       grane
    */

    let pathsRet = [];

    arrOfPaths.forEach((edgeArr) => {
      edgeArr.forEach((edge) => {
        if (pathsRet.indexOf(edge) === -1) {
          pathsRet.push(edge);
        }
      })
    })
    return pathsRet;

  }

  /**
   *  Work on bfs,dfs for spanning tree...
   *
   *  bdfsUtilSt(root,goal)
   *  @param {integer} root starting node
   *  @param {integer} goal goal nodes
   *  @returns {MSTEdge[]} path from root to goal
   *  used for getting all paths
   *  from root to all nodes ..
   *  t true it is bfs false dfs
   */

  this.bdfsUtilSt = function (root, goal, t) {
    let openList = [];
    let closedSet = {};

    openList.push(root);

    closedSet[root] = true;

    let cameFrom = {};
    cameFrom[root] = null;
    done = false;

    while (!done) {
      //Bfs/Dfs switch
      if (t)
        curr = openList.shift();
      else
        curr = openList.pop();

      //added this line on 15.1
      if (!t)
        closedSet[curr] = true;
      //...

      if (curr === goal) {
        done = true;
        //rekonstruise se putanja od goal do root...
        return reconstructPath(cameFrom, goal);

      }

      tmp = that.NodeList[Number(curr)];

      //new nodes for expansion
      let adjInterior = tmp.adjacentNodesList.filter((node) => {
        return !(node.id in closedSet);
      }).map((node) => {
        return node.id;
      });

      //add to map and continue to expand
      adjInterior.forEach((nodeId) => {
        cameFrom[nodeId] = curr;
        //neighbors done expand...

        //added this line for bfs on 15.1
        if (t)
          closedSet[nodeId] = false;
        //....
      })

      openList = openList.concat(adjInterior);
    }
  }



  var reconstructPath = function (cameFrom, goal) {
    let path = [];
    let parent;
    let tmp = goal;

    do {
      parent = cameFrom[tmp];
      if (parent === null)
        break;

      path.push(that.oldEdges.find((edge) => {
        //pronadji odgovarajucu granu za dva cvora u grafu
        if ((edge.firstNode.id === parent && edge.secondNode.id === tmp) ||
          (edge.firstNode.id === tmp && edge.secondNode.id === parent))
          return edge;
      }));
      tmp = parent;
    }
    while (parent != null);

    return path;

  }




  /*
   * *mst via reverse-delete*
   *  use of dfs
   *  working..
   */
  this.reversedelete = function () {

    that.EdgesOfMST.sort(that.sortMethod);
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

      that.resetVisits();
    } //end while

    //working
    // console.log("min sp tree");
    // console.log(this.EdgesOfMST);

    // console.log("min weight of revdel:")
    revdel = 0;
    this.EdgesOfMST.forEach((el) => {
      revdel += el.weight;
    })

    // console.log(revdel);

    myResultEdges = this.EdgesOfMST;

  } //end mst





  this.Kruskal = function () {

    var EdgesOfMST2 = [];
    EdgesOfMST2 = that.EdgesOfMST.slice();
    EdgesOfMST2.sort(that.sortMethod);

    var NodeSets = [];
    var EdgeSets = [];
    var KruskalEdges = [];

    var CurrentEdge0 = EdgesOfMST2.pop();
    var Node01 = CurrentEdge0.firstNode;
    var Node02 = CurrentEdge0.secondNode;

    NodeSets.push(aa = []);
    aa.push(Node01);
    aa.push(Node02);

    EdgeSets.push(bb = []);
    bb.push(CurrentEdge0);

    while (EdgeSets[0].length < this.NodeList.length - 1) {
      var CurrentEdge = EdgesOfMST2.pop();
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

    // console.log("min weight of kruskal:");
    KruskalEdges.forEach((el) => {
      kruskal += el.weight;
    })

    // console.log(kruskal);

    myResultEdges = KruskalEdges;
  }





  this.Prim = function (StartID) {

    start = StartID;
    var primEdges = [];
    var primNodes = [];
    var primEdgesFinal = [];

    that.EdgesOfMST.forEach(function (v, i) {
      that.EdgesOfMST[i].visited = false;
    });
    that.NodeList.forEach(function (v, i) {
      that.NodeList[i].visited = false;
    });
    that.NodeList[start].edgesList.forEach(function (v, i) {
      primEdges.push(that.NodeList[start].edgesList[i]);
      that.NodeList[start].edgesList[i].visited = true;
    });
    primNodes.push(start);
    that.NodeList[start].visited = true;

    primEdges.sort(that.sortMetod2);




    while (primEdges.length != 0) {
      primEdges.sort(that.sortMethod2);

      if ((primNodes.includes(primEdges[0].firstNode.id)) && (primNodes.includes(primEdges[0].secondNode.id))) {
        primEdges.splice(0, 1);

        continue;

      }


      if (primNodes.includes(primEdges[0].firstNode.id)) {


        that.NodeList[primEdges[0].secondNode.id].edgesList.forEach(function (v, i) {

          if (that.NodeList[primEdges[0].secondNode.id].edgesList[i].visited == false)
            primEdges.push(that.NodeList[primEdges[0].secondNode.id].edgesList[i]);
          that.NodeList[primEdges[0].secondNode.id].edgesList[i].visited = true;
        });
        primEdgesFinal.push(primEdges[0]);
        primNodes.push(primEdges[0].secondNode.id);
        primEdges.splice(0, 1);
        continue;


      }


      if (primNodes.includes(primEdges[0].secondNode.id)) {

        that.NodeList[primEdges[0].firstNode.id].edgesList.forEach(function (v, i) {

          if (that.NodeList[primEdges[0].firstNode.id].edgesList[i].visited == false)
            primEdges.push(that.NodeList[primEdges[0].firstNode.id].edgesList[i]);
          that.NodeList[primEdges[0].firstNode.id].edgesList[i].visited = true;
        });
        primEdgesFinal.push(primEdges[0]);
        primNodes.push(primEdges[0].firstNode.id);
        primEdges.splice(0, 1);
        continue;
      }

    }

    myResultEdges = primEdgesFinal;
    // console.log("PRIM ALGO")
    // console.log(myResultEdges);

  }



  this.Dijkstra = function (StartID) {

    start = StartID;

    that.NodeList.forEach(function (v, i) {
      that.NodeList[i].cost = Infinity;
      that.NodeList[i].visited = false;
    });

    that.NodeList[start].cost = 0;
    that.NodeList[start].visited = true;
    var cameFrom = [];
    var queue = that.NodeList.map((v, i) => i);
    var queue2 = [];
    queue2.push(start);

    while (queue2.length > 0) {
      var queueIndex = undefined;

      queue2.reduce(function (minDist, nodeIndex, index) {

        queueIndex = that.NodeList[nodeIndex].cost < minDist ? index : queueIndex;
        return that.NodeList[nodeIndex].cost < minDist ? that.NodeList[nodeIndex].cost : minDist;
      }, Infinity);

      var nextIndex = queue2.splice(queueIndex, 1)[0];

      that.NodeList[nextIndex].adjacentNodesList.forEach(function (node, i) {
        childIndex = node.id;
        var distance = that.NodeList[nextIndex].cost + that.NodeList[nextIndex].edgesList[i].weight;

        if (!that.NodeList[childIndex].visited) {
          cameFrom[childIndex] = that.NodeList[nextIndex].edgesList[i];
          queue2.push(that.NodeList[childIndex].id);
          that.NodeList[childIndex].visited = true;
        }

        if (distance < that.NodeList[childIndex].cost) {
          that.NodeList[childIndex].cost = distance;
          cameFrom[childIndex] = that.NodeList[nextIndex].edgesList[i];
        }


      });

      //niz cameFrom je niz potega koji treba crtati
    }

    myResultEdges = cameFrom;

  }

} //end_graf