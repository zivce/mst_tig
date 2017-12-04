var settingsMenu = document.getElementById('settingsMenu');
var buttonSettings = document.getElementById('buttonSettings');
var divRun = document.getElementById('divRun');
var inputStartNode = document.getElementById('startNode');


buttonSettings.onclick = function () {
  if (settingsMenu.style.right == "-20vw") {
    settingsMenu.style.right = "0vw";
  } else {
    settingsMenu.style.right = "-20vw";
  }
}
buttonSettings.onclick();

divRun.onclick = function(){
  myMST.setStartNode(inputStartNode.value);
  /* okini izvršenje algoritma */
  let g = new MSTGraph(myNodes,myEdges);
  let a = performance.now();
  g.mst();
  let b = performance.now();
  console.log("took " + Math.round((b-a)) + "ms for reverse delete to complete");
  myMST.addListOfReslutEdges(myResultEdges);
  myMST.draw();
}


