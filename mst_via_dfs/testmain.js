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
    //var ba = new MSTedge(b,a,7,1);

    var ad= new MSTedge(a,d,5,2);
    //var da= new MSTedge(d,a,5,2);

    var bd = new MSTedge(b,d,9,3);
    var be = new MSTedge(b,e,7,4);
    var bc = new MSTedge(b,c,8,5);

    //var db = new MSTedge(d,b,9,3);
    //var eb = new MSTedge(e,b,7,4);
    //var cb = new MSTedge(c,b,8,5);




    var ce = new MSTedge(e,c,5,6);
    //var ec = new MSTedge(c,e,5,6);

    //ista grana drugi smer
    // id isti
    var de = new MSTedge(d,e,15,7);
    //var ed = new MSTedge(e,d,15,7);

    var df = new MSTedge(d,f,6,8);
    var ef = new MSTedge(e,f,8,7);

    var fd = new MSTedge(f,d,6,8);
    //var fe = new MSTedge(f,e,8,7);

    //kad se promeni na e g nadje odg MST
    //kad je g e ubaci granu weight 11
    var ge  = new MSTedge(e,g,9,8);
    //var eg = new MSTedge(e,g,9,8);

    var fg = new MSTedge(f,g,11,8);
    //var gf = new MSTedge(g,f,11,8);

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
     edges.push(ge);
     edges.push(fg);

     //Drugi smer
     /*
     edges.push(ba);
     edges.push(da);
     edges.push(db);
     edges.push(eb);
     edges.push(cb);
     edges.push(ec);
     edges.push(ed);
     edges.push(fd);
     edges.push(fe);
     edges.push(ge);
     edges.push(gf);
     */

    var g = new Graf(nodes,edges);
    g.mst();
}
