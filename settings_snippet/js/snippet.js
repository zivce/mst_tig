window.onload = function(){

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



}

window.onresize = function(){
  console.log(window.innerWidth);
}
