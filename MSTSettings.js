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
    myMST.setStartNode(inputStartNode.value);
    var graph = new MSTGraph(myNodes, myEdges);
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
    switch (selectAlgorithm.selectedIndex) {
      case 0:
        myResultEdges = [];
        break;
      case 1:
        myResultEdges = graph.bdfsSt(Number(inputStartNode.value),true);
        break;
      case 2:
        myResultEdges = graph.bdfsSt(Number(inputStartNode.value),false);
        break;
      case 3:
        graph.Dijkstra(Number(inputStartNode.value));
        break;
      case 4:
        graph.Prim(Number(inputStartNode.value));
        break;
      case 5:
        graph.Kruskal();
        break;
      case 6:
        graph.reversedelete();
        break;
    }

  }

})();//IIFE for encapsulation
