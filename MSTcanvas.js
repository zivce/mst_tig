function MSTCanvas() {
    var that = this;

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
    canvas.width = 5000;
    canvas.height = 2800;
    divMST.appendChild(canvas);

    // c is context of canvas
    var c = canvas.getContext("2d");

    // mozda zatreba
    function arrayToSet(array) {
        this.array = [...array];
    }

    // lista svih node-ova grafa; crtamo pomoću podata iz ove liste
    this.nodeList = [];

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

    // lista svih edge-ve; crtamo pomoću podata iz ove liste
    this.edgeList = []

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

    // glavna f-ja za crtanje
    this.draw = function () {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawNodes();
        drawEdges();
    }

    // contextList, ctxList, lista svih context-a node-ova 
    var cNodesList = [];
    // contextList, ctxList, lista svih context-a edge-va
    var cEdgesList = [];;
    // f-ja za crtanje, svih node-ova iz liste, na canvas-u
    function drawNodes() {
        that.nodeList.forEach(element => {
            c.node = element;
            c.nodeRadius = 20;

            c.beginPath();
            c.arc(c.node.x, c.node.y, c.nodeRadius, 0, 2 * Math.PI, false);
            c.fillStyle = "black";
            c.fill();
            c.stroke();
            c.closePath();
            cNodesList.push(Object.assign({}, c));
        });

    }

    function drawEdges() {
        console.log(that.edgeList.length);
        that.edgeList.forEach(element => {
            c.edge = element;
            c.beginPath();
            
            c.moveTo(c.edge.firstNode.x, c.edge.firstNode.y);
            c.lineTo(c.edge.secondNode.x, c.edge.secondNode.y);
            c.lineWidth = 3;
            c.stroke();
            cEdgesList.push(Object.assign({}, c));
        });
    }

}