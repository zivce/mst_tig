(function(){

  var settingsMenu = document.getElementById('settingsMenu');
  var buttonSettings = document.getElementById('buttonSettings');
  var divRun = document.getElementById('divRun');
  var inputStartNode = document.getElementById('startNode');
  var selectAlgorithm = document.getElementById('selectAlgorithm');

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
    if (inputStartNode.value>49){
      inputStartNode.value = 49;
    }
    else if (inputStartNode.value<0){
      inputStartNode.value = 0;
    }


    myMST.setStartNode(inputStartNode.value);
    var graph = new MSTGraph(data.myNodes, data.myEdges);
    runAlgorithm(graph);

    if (cbxEdges.checked == true) myMST.shouldDrawEdges = true;
    else myMST.shouldDrawEdges = false;

    if (cbxResultEdges.checked == true) myMST.shouldDrawResultEdges = true;
    else myMST.shouldDrawResultEdges = false;

    if (cbxWeights.checked == true) myMST.shouldDrawWeights = true;
    else myMST.shouldDrawWeights = false;

    if (cbxIDs.checked == true) myMST.shouldDrawIDs = true;
    else myMST.shouldDrawIDs = false;

    console.log(myResultEdges);
    myMST.addListOfReslutEdges(myResultEdges);
    myMST.draw();
  }

  function runAlgorithm(graph) {
      let a,b;
    switch (selectAlgorithm.selectedIndex) {

      case 0:
        myResultEdges = [];
        break;
      case 1:
        a = performance.now();
        myResultEdges = graph.bdfsSt(Number(inputStartNode.value),true);
        b = performance.now();
        console.log("bfs run for " + (b-a)  + "ms");
        break;
      case 2:
        a = performance.now();
        myResultEdges = graph.bdfsSt(Number(inputStartNode.value),false);
        b = performance.now();
        console.log("dfs run for " + (b-a)  + "ms");
        break;
      case 3:
        a = performance.now();
        graph.Dijkstra(Number(inputStartNode.value));
        b = performance.now();
        console.log("Dijkstra run for " + (b-a)  + "ms");
        break;
      case 4:
        a = performance.now();
        graph.Prim(Number(inputStartNode.value));
        b = performance.now();
        console.log("Prim run for " + (b-a)  + "ms");
        break;
      case 5:
        a = performance.now();
        graph.Kruskal();
        b = performance.now();
        console.log("Kruskal run for " + (b-a)  + "ms");
        break;
      case 6:
        a = performance.now();
        graph.reversedelete();
        b = performance.now();
        console.log("RevDel run for " + (b-a)  + "ms");
        break;
    }

  }

})();//IIFE for encapsulation
