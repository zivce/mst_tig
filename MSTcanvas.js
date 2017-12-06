function MSTCanvas() {

    /* 
        Inicijalizacija
    */

    var that = this;

    // lista svih node-ova grafa; crtamo pomoću podata iz ove liste
    this.nodeList = [];
    // lista svih edge-ve; crtamo pomoću podata iz ove liste
    this.edgeList = [];
    // lista svih edge-ve; crtamo pomoću podata iz ove liste
    this.resultEdgesList = [];
    // contextList, ctxList, lista svih context-a node-ova 
    var cNodesList = [];
    // contextList, ctxList, lista svih context-a edge-va
    var cEdgesList = [];

    // pocetni cvor
    this.startNode = null;

    //gui osnova
    //div u kome se crta gui
    var divMST = document.createElement("div");
    divMST.className = "divMST";
    document.body.appendChild(divMST);

    // canvas u kome je ceo gui
    canvas = document.createElement("canvas");
    canvas.className = "canvas";
    canvas.width = 5100;
    canvas.height = 2900;
    divMST.appendChild(canvas);

    // c is context of canvas
    var c = canvas.getContext("2d");

    /* 
        DODAVANJA
    */

    // da dodam remote listu node-ova (lita će se nalaziti u drugom fajlu kao globalna promenljiva)
    this.addListOfNodes = function (list) {
        this.nodeList = list;
    }

    // da dodam remote listu edge-va (lita će se nalaziti u drugom fajlu kao globalna promenljiva)
    this.addListOfEdges = function (list) {
        this.edgeList = list;
    }

    // da dodam remote listu resultEdge-va (lita će se nalaziti u drugom fajlu kao globalna promenljiva)
    this.addListOfReslutEdges = function (list) {
        this.resultEdgesList = list;
    }

    this.setStartNode = function (id) {
        that.startNode = that.nodeList[id];
    }

    /* 
        CRTANJE
    */

    this.shouldDrawEdges = true;
    this.shouldDrawIDs = true;
    this.shouldDrawWeights = true;
    this.shouldDrawResultEdges = true;

    // glavna f-ja za crtanje
    this.draw = function () {
        c.clearRect(0, 0, canvas.width, canvas.height);
        cNodesList = [];
        cEdgesList = [];
        if (this.shouldDrawEdges == true) drawEdges();
        if (this.shouldDrawResultEdges == true) drawResultEdges();
        if (this.shouldDrawIDs == true) drawIDs();
        /* wights go here */
        drawNodes();
        drawStartNode();
        if (this.shouldDrawWeights == true) drawWeights();
    }

    // f-ja za crtanje, svih node-ova iz liste, na canvas-u
    function drawNodes() {
        that.nodeList.forEach(element => {
            c.node = element;
            c.nodeRadius = 40;
            c.beginPath();
            c.strokeStyle = "black";
            c.fillStyle = "black";
            c.arc(c.node.x, c.node.y, c.nodeRadius, 0, 2 * Math.PI, false);
            c.fill();
            c.stroke();
            c.closePath();
            cNodesList.push(Object.assign({}, c));
        });

    }

    function drawIDs() {
        that.nodeList.forEach(element => {
            c.node = element;
            // kvadrat i text id
            c.beginPath();
            c.fillStyle = "yellow";
            c.fillRect(c.node.x + 44, c.node.y + 8, 60, 60);
            c.stroke();
            c.closePath();
            // id
            c.beginPath();
            c.fillStyle = "black";
            c.font = "40px Verdana";
            c.fillText(c.node.id, c.node.x + 50, c.node.y + 52)
            c.fill();
            c.stroke();
            c.closePath();
            cNodesList.push(Object.assign({}, c));
        });

    }

    function drawEdges() {
        that.edgeList.forEach(element => {
            c.edge = element;
            c.beginPath();
            c.strokeStyle = "gray";
            c.lineWidth = 10;
            c.moveTo(c.edge.firstNode.x, c.edge.firstNode.y);
            c.lineTo(c.edge.secondNode.x, c.edge.secondNode.y);
            c.stroke();
            cEdgesList.push(Object.assign({}, c));
        });
    }

    function drawStartNode() {
        if (that.startNode === null) {
            that.startNode = that.nodeList[0];
        }
        c.node = that.startNode;
        c.nodeRadius = 40;
        c.beginPath();
        c.fillStyle = "green";
        c.arc(c.node.x, c.node.y, c.nodeRadius, 0, 2 * Math.PI, false);
        c.fill();
        c.stroke();
        c.closePath();
        cNodesList.push(Object.assign({}, c));
    }

    function drawResultEdges() {
        that.resultEdgesList.forEach(element => {
            c.edge = element;
            c.beginPath();
            c.lineWidth = 20;
            c.strokeStyle = "red";
            c.moveTo(c.edge.firstNode.x, c.edge.firstNode.y);
            c.lineTo(c.edge.secondNode.x, c.edge.secondNode.y);
            c.stroke();
            cEdgesList.push(Object.assign({}, c));
        });
    }

    function drawWeights() {
        that.edgeList.forEach(function (element) {
            c.weightEdge = element;
            // kvadrat
            c.midX = element.firstNode.x + (element.secondNode.x - element.firstNode.x) * 0.50;
            c.midY = element.firstNode.y + (element.secondNode.y - element.firstNode.y) * 0.50;
            c.beginPath();
            c.fillStyle = "lightgrey";
            c.fillRect(c.midX, c.midY, 80, 60);
            c.stroke();
            c.closePath();
            // weights
            c.beginPath();
            c.fillStyle = "black";
            c.font = "40px Verdana";
            c.fillText(c.weightEdge.weight, c.midX + 2, c.midY + 45)
            c.fill();
            c.stroke();
            c.closePath();
            cNodesList.push(Object.assign({}, c));
        });
    }

}