window.onload= function ()

{

    var a = new MSTnode(1);
    var b = new MSTnode(2);
    var c = new MSTnode(3);
    var d = new MSTnode(4);
    var e = new MSTnode(5);
    var f = new MSTnode(6);
    var g = new MSTnode(7);

    //weight id
    var ab = new MSTedge(a,b,7,1);
    var ad= new MSTedge(a,d,5,2);

    var bd = new MSTedge(b,d,9,3);
    var be = new MSTedge(b,e,7,4);
    var bc = new MSTedge(b,c,8,5);

    /* zasto nadje mst 40 kad e i c zamene
    * mesta?
    * u ovaj redosled nadje mst 30
    */
    var ce = new MSTedge(e,c,5,6);

    var de = new MSTedge(d,e,15,7);
    var df = new MSTedge(d,f,6,8);

    var ef = new MSTedge(e,f,8,7);
    var eg = new MSTedge(e,g,9,8);


    var fg = new MSTedge(f,g,11,8);

    var nodes = [];

    var edges = [];


    nodes.push(a);
    nodes.push(b);
    nodes.push(c);
    nodes.push(d);
    nodes.push(e);
    nodes.push(f);
    nodes.push(g);


     edges.push(ab);
     edges.push(ad);
     edges.push(bd);
     edges.push(be);
     edges.push(bc);
     edges.push(ce);
     edges.push(de);
     edges.push(df);
     edges.push(ef);
     edges.push(eg);
     edges.push(fg);

    var g = new Graf(nodes,edges);
    g.mst();
}
