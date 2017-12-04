var settingsMenu = document.getElementById('settingsMenu');
var buttonSettings = document.getElementById('buttonSettings');
var divRun = document.getElementById('divRun');
var inputStartNode = document.getElementById('startNode');
var selectAlgorithm = document.getElementById('selectAlgorithm');


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
  myMST.addListOfReslutEdges(myResultEdges);
  myMST.draw();
}

function runAlgorithm(graph) {
  switch (selectAlgorithm.selectedIndex) {
    case 0:
      myResultEdges = [];
      break;
    case 1:
      myResultEdges = [];
      break;
    case 2:
      myResultEdges = [];
      break;
    case 3:
      myResultEdges = [];
      break;
    case 4:
      myResultEdges = [];
      break;
    case 5:
      graph.Kruskal();
      break;
    case 6:
      graph.Milos();
      break;
  }

}