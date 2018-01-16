(function () {

  var settingsMenu = document.getElementById('settingsMenu');
  var buttonSettings = document.getElementById('buttonSettings');
  var divRun = document.getElementById('divRun');
  var inputStartNode = document.getElementById('startNode');
  var selectAlgorithm1 = document.getElementById('selectAlgorithm1');
  var selectAlgorithm2 = document.getElementById('selectAlgorithm2');
  var time1 = document.getElementById('time1');
  var time2 = document.getElementById('time2');

  var cbxEdges = document.getElementById('cbxEdges');
  var cbxResultEdges = document.getElementById('cbxResultEdges');
  var cbxWeights = document.getElementById('cbxWeights');
  var cbxIDs = document.getElementById('cbxIDs');


  buttonSettings.onclick = function () {
    if (settingsMenu.style.right == "-20vw") {
      settingsMenu.style.right = "0vw";
    } else {
      settingsMenu.style.right = "-20vw";
    }
  }
  buttonSettings.onclick();



  divRun.onclick = function () {
    inputStartNode.value = parseInt(inputStartNode.value);
    if (inputStartNode.value > 49) {
      inputStartNode.value = 49;
    } else if (inputStartNode.value < 0) {
      inputStartNode.value = 0;
    }


    myMST.setStartNode(inputStartNode.value);
    var graph = new MSTGraph(data.myNodes, data.myEdges);

    if (cbxEdges.checked == true) myMST.shouldDrawEdges = true;
    else myMST.shouldDrawEdges = false;

    if (cbxResultEdges.checked == true) myMST.shouldDrawResultEdges = true;
    else myMST.shouldDrawResultEdges = false;

    if (cbxWeights.checked == true) myMST.shouldDrawWeights = true;
    else myMST.shouldDrawWeights = false;

    if (cbxIDs.checked == true) myMST.shouldDrawIDs = true;
    else myMST.shouldDrawIDs = false;

    //console.log(myResultEdges);
    runAlgorithm(graph, selectAlgorithm1, 1);
    myMST.addListOfReslutEdges1(myResultEdges.slice());
    runAlgorithm(graph, selectAlgorithm2, 2);
    myMST.addListOfReslutEdges2(myResultEdges.slice());
    myMST.draw();
  }

  function runAlgorithm(graph, selectAlgorithm, id) {
    let a = 0,
      b = 0;

    switch (selectAlgorithm.selectedIndex) {
      case 0:
        myResultEdges = [];
        break;
      case 1:
        a = performance.now();
        //myResultEdges = graph.bdfsSt(Number(inputStartNode.value),true);
        myResultEdges = graph.bfsST(Number(inputStartNode.value));
        b = performance.now();
        console.log("bfs run for " + (b - a) + "ms");

        break;
      case 2:
        a = performance.now();
        myResultEdges = graph.bdfsSt(Number(inputStartNode.value), false);
        //myResultEdges = graph.dfsST(Number(inputStartNode.value));
        b = performance.now();
        console.log("dfs run for " + (b - a) + "ms");
        break;
      case 3:
        a = performance.now();
        graph.Dijkstra(Number(inputStartNode.value));
        b = performance.now();
        console.log("Dijkstra run for " + (b - a) + "ms");
        break;
      case 4:
        a = performance.now();
        graph.Prim(Number(inputStartNode.value));
        b = performance.now();
        console.log("Prim run for " + (b - a) + "ms");
        break;
      case 5:
        a = performance.now();
        graph.Kruskal();
        b = performance.now();
        console.log("Kruskal run for " + (b - a) + "ms");
        break;
      case 6:
        a = performance.now();
        graph.reversedelete();
        b = performance.now();
        console.log("RevDel run for " + (b - a) + "ms");
        break;
    }
    if (id == 1) {
      time1.innerHTML = "Runtime: " + parseFloat(b - a).toFixed(2) + "ms";
    } else {
      time2.innerHTML = "Runtime: " + parseFloat(b - a).toFixed(2) + "ms";
    }

    //hardcoded
    //graph.bfsST(Number(0));

  }

})(); //IIFE for encapsulation