var express = require('express');
var app = express();



app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + './index.html'));
})


app.listen(8080, () =>{
  console.log("listening for req on 8080");
})
