function Graph (pnode, pedge)
{
    
    //proslediti (listaCvorova,ListaPotega), pozvati obj.Kruskal() Fija vraca listu potega koji prave najkraci put do svih cvorova.
    
    if (pnode.length==0) alert("0 cvorova u grafu");
    if (pedge.length==0) alert("0 potega u grafu");
    
    // atributi
    var NodeList =pnode.slice(); 
    var EdgeList=pedge.slice();
 
    // Metode 

    this.sortMethod =  function( edge0, edge1 )
	{
		return edge1.weight - edge0.weight;
	};
    
    
    
     EdgeList.sort( this.sortMethod );
    
   
    this.Kruskal = function() 
    {
    
   
        
    var NodeSets = [];
    var EdgeSets =[];
    var KruskalEdges = [];
   
    var CurrentEdge0 = EdgeList.pop(); 
    var Node01= CurrentEdge0.firstNode;
    var Node02= CurrentEdge0.secondNode;
    
   
    NodeSets.push(aa=[]);
    aa.push(Node01);
    aa.push(Node02);
        
   
    EdgeSets.push(bb=[]);
    bb.push(CurrentEdge0);
   
    while (EdgeSets[0].length < NodeList.length-1)
    {
       
        var CurrentEdge = EdgeList.pop();
        var Node1= CurrentEdge.firstNode;
        var Node2= CurrentEdge.secondNode;
       
        var i1 = -1;
        var i2 = -1;
        var j1= -1;
        var j2= -1;
        
    
        
        for(index=0;index<NodeSets.length;index++)
        {
            
            var pom1 = NodeSets[index].indexOf(Node1);
            var pom2 = NodeSets[index].indexOf(Node2);
            
            if (pom1>-1)
                {
                    i1=pom1;
                    j1=index;
                }
            if (pom2>-1)
                {
                    i2=pom2;
                    j2=index;
                }
            
        
        }
        

        if ((j1===-1) && (j2===-1))

        {
            NodeSets.push(a=[]);
            a.push(Node1);
            a.push(Node2);
            EdgeSets.push(b=[]);
            b.push(CurrentEdge);
            continue;
        }
        
            

        if(((j1>-1)&&(j2>-1))&&(j1!=j2))
            {
                var pom;
                var len =NodeSets[j2].length;
                for(var ind=0;ind<len;ind++)
                    {
                        pom = NodeSets[j2].pop();
                        NodeSets[j1].push(pom);
                    }

                NodeSets.splice(j2,1);

                var Pe;
                var len =EdgeSets[j2].length;
                 for(var ieg=0;ieg<len;ieg++)
                    {
                        Pe = EdgeSets[j2].pop();
                        EdgeSets[j1].push(Pe);
                    }


                EdgeSets.splice(j2,1);
                EdgeSets[0].push(CurrentEdge);

                continue;
            }
       
            if (j2===j1) continue;   
        
            if((j2<0)&&(j1>-1))
                {
                    NodeSets[j1].push(Node2);
                    EdgeSets[j1].push(CurrentEdge);
                    continue;
                }
        
            if((j1<0)&&(j2>-1))
                {
                    NodeSets[j2].push(Node1);
                    EdgeSets[j2].push(CurrentEdge);
                    continue;
                }
        
    }
        KruskalEdges= EdgeSets[0].slice();
         
       return  KruskalEdges;
        
    }
        
    
    
}