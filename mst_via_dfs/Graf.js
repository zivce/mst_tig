function Graf (pnode, pedge)
{

    let self = this;

    this.NodeList = pnode.slice();
    this.EdgeList= pedge.slice();

    this.oldEdges = this.EdgeList.slice();

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


      if(!workingNode.visited)
        workingNode.visited = true;
      else
        return;

      let neighborsArr = this.EdgeList.map((edge)=>{
        if(edge.firstNode === workingNode){
          return edge.secondNode;
        }
      })



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
      self.EdgeList.sort( self.sortMethod );

      let i = 0;

      while( i < self.EdgeList.length){

        let e = self.EdgeList[i];
        //del edge at i
        self.EdgeList.splice(i,1);

        //utility to check connections
        self.dfs(1);
        //mst must be connected
        if(!self.connected())
          {
            self.EdgeList.splice(i,0,e);
            i = i + 1;
          }

        self.resetVisits();
      }//end while

      //working
      console.log("min sp tree");
      console.log(this.EdgeList);

    }//end mst




}//end_graf
