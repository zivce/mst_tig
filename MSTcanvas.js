function MSTCanvas() {
    var that = this;


    //liste

    // lista svih node-ova grafa; crtamo pomoću podata iz ove liste
    this.nodeList = [];

    // lista svih edge-ve; crtamo pomoću podata iz ove liste
    this.edgeList = [];

    // contextList, ctxList, lista svih context-a node-ova 
    var cNodesList = [];

    // contextList, ctxList, lista svih context-a edge-va
    var cEdgesList = [];;

    //gui osnova

    //div u kome se crta gui
    var divMST = document.createElement("div");
    divMST.className = "divMST";
    document.body.appendChild(divMST);

    //meni dugme;
    var divSettings = document.createElement("div");
    divSettings.className = "divSettings";
    document.body.appendChild(divSettings);

    // canvas u kome je ceo gui
    canvas = document.createElement("canvas");
    canvas.className = "canvas";
    canvas.width = 5100;
    canvas.height = 2900;
    divMST.appendChild(canvas);

    // c is context of canvas
    var c = canvas.getContext("2d");


    // dodavanja i konverzije

    // mozda zatreba
    function arrayToSet(array) {
        this.array = [...array];
    }

    // pojedinačno dodavanje vovih nede-ova
    this.addNode = function (newNode) {
        this.nodeList.push(newNode);
    }

    // da dodam remote listu node-ova (lita će se nalaziti u drugom fajlu kao globalna promenljiva)
    this.addListOfNodes = function (list) {
        if (list instanceof Set) {
            list = Array.from(list);
        }
        this.nodeList = list;
    }

    // pojedinačno dodavanje vovih edge-va
    this.addEdge = function (newEdge) {
        this.edgeList.push(newEdge);
    }

    // da dodam remote listu edge-va (lita će se nalaziti u drugom fajlu kao globalna promenljiva)
    this.addListOfEdges = function (list) {
        if (list instanceof Set) {
            list = Array.from(list);
        }
        this.edgeList = list;
    }


    //crtanje

    // glavna f-ja za crtanje
    this.draw = function () {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawEdges();
        drawNodes();
    }


    // f-ja za crtanje, svih node-ova iz liste, na canvas-u
    function drawNodes() {
        that.nodeList.forEach(element => {
            c.node = element;
            c.nodeRadius = 30;
            c.beginPath();
            c.fillStyle = "black";
            c.arc(c.node.x, c.node.y, c.nodeRadius, 0, 2 * Math.PI, false);
            c.fill();
            c.stroke();
            c.closePath();

            
            c.beginPath();
            c.fillStyle = "red";
            c.fillRect(c.node.x +44 , c.node.y + 8 , 60, 60);  
            c.stroke();
            c.closePath();


            c.beginPath();
            c.fillStyle = "black";
            c.font = "40px Verdana";     
            c.fillText(c.node.id, c.node.x + 50, c.node.y + 50)
            c.fill();
            c.stroke();
            c.closePath();
            
            cNodesList.push(Object.assign({}, c));
        });

    }

    function drawEdges() {
        // console.log(that.edgeList.length);
        that.edgeList.forEach(element => {
            c.edge = element;
            c.beginPath();
            c.moveTo(c.edge.firstNode.x, c.edge.firstNode.y);
            c.lineTo(c.edge.secondNode.x, c.edge.secondNode.y);
            c.lineWidth = 10;
            c.stroke();
            cEdgesList.push(Object.assign({}, c));
        });
    }

}