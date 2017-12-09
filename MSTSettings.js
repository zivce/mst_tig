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
  let b,a;

  switch (selectAlgorithm.selectedIndex) {
    case 0:
      myResultEdges = [];
      break;
    case 1:
      myResultEdges = [];
      break;
    case 2:
      graph.findST();
      break;
    case 3:
      myResultEdges = [];
      break;
    case 4:
      myResultEdges = [];
      break;
    case 5:
      b = performance.now();
      graph.Kruskal();
      a = performance.now();
      console.log("it took kruskal: " + (a-b) +" ms");
      break;
    case 6:
    b = performance.now();
      graph.Milos();
      a = performance.now();
      console.log("it took revdel: " + (a-b) +" ms");
      break;
  }

}
