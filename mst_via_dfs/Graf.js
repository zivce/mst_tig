function Graf (pnode, pedge)
{

    let self = this;

    this.NodeList = pnode.slice();

    this.EdgesOfMST= pedge.slice();

    this.oldEdges = this.EdgesOfMST.slice();

    console.log(this.oldEdges);
    //za sortiranje po opadajucem kriterijumu
    this.sortMethod =  function( edge0, edge1 )
	{
		return edge1.weight - edge0.weight;
	};



    /* resets nodes visited to false
    *  working reset
    */

    this.resetVisits = function(){
      self.NodeList.forEach((el)=>{
        el.visited = false;
      })
    }


    /* check if connected graph
    * working connected
    */

    this.connected = function () {
      let p = true;

      self.NodeList.forEach((el) => {
        if(!el.visited)
          p = false;
          //!visited <=> disconnected
        })

      //all visited <=> connected
      return p;
    }

    /* depth first search
    * @param {integer} id  id of node
    * working dfs
    */

    this.dfs = function(id){

      let workingNode = self.NodeList.find((node) => {
        if(node.id === id)
          return node.id;

      });

      console.log(workingNode);

      if(!workingNode.visited)
        workingNode.visited = true;
      else
        return;

      let neighborsArr = this.EdgesOfMST.map((edge)=>{
        if(edge.firstNode === workingNode){
          return edge.secondNode;

        if(edge.secondNode === workingNode)
          return edge.firstNode;
        }
      })
      console.log(neighborsArr);

      for(let i = 0;i<neighborsArr.length;i++){
        if(typeof neighborsArr[i] !== "undefined")
          this.dfs(neighborsArr[i].id);
      }

    }





    /*
    * *mst via reverse-delete*
    *  use of dfs
    *  working..
    */
    this.mst = function(){
      self.EdgesOfMST.sort( self.sortMethod );

      let i = 0;

      while( i < self.EdgesOfMST.length){

        let e = self.EdgesOfMST[i];
        //del edge at i
        self.EdgesOfMST.splice(i,1);
        //utility to check connections
        self.dfs(1);
        //mst must be connected
        if(!self.connected())
          {
            self.EdgesOfMST.splice(i,0,e);
            i = i + 1;
          }

        console.log(self.EdgesOfMST);
        self.resetVisits();
      }//end while

      //working
      console.log("min sp tree");
      console.log(this.EdgesOfMST);
    }//end mst
}//end_graf
