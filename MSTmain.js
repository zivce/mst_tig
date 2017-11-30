window.onload = function(){


/*settings snippet added */


    let algsList = document.getElementById('list_of_algs');
    let settings = document.getElementById('button_settings');

    let showedAlgsList = false;

    let listItems = algsList.querySelectorAll("li");


    listItems.forEach((el) => {
      el.onclick = function(){
        let alreadyClicked = this.parentElement.querySelector('.clicked');
        //skida sa prethodnog kliknutog

        if(alreadyClicked)
          alreadyClicked.className = "";

        el.className = "";
        el.className += "clicked";
      }

    })
    settings.onclick =  function(){

      if(!showedAlgsList){
        algsList.style.display = "block";
        algsList.className = "";
        algsList.className += "opened";
        showedAlgsList = true;
      }
      else {
        algsList.style.display = "none";
        algsList.className -= "opened";
        showedAlgsList = false;
      }
    }


    //working on rwd
    let containerPs = algsList.querySelector("#container_list_of_algs p");
    let cont = algsList.querySelector(".algs");

    let contLis = cont.querySelectorAll("li");


    window.onresize = function(){
      //ako treba da se doda za velike rez
      //test samo...
      console.log(window.innerWidth)
    }


/* settings end */



  var myMST = new MSTCanvas();
  myMST.addListOfNodes(myNodes);
  myMST.addListOfEdges(myEdges);
  myMST.draw();


}
