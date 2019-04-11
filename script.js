


var xmlhttp = new XMLHttpRequest();


function processContent(name){
  var temp = document.getElementById("project-page");
  var header = temp.getElementsByTagName("h1")[0];

  while(header.firstChild){
    header.removeChild(header.firstChild);
  }

	xmlhttp.onreadystatechange = function() {
		
	  if (this.readyState == 4 && this.status == 200) {
	    var myObj = JSON.parse(this.responseText);
	    document.getElementById("description").innerHTML = myObj[name].description;
	    header.innerHTML = myObj[name].title;

      if(myObj[name].gallery){
        for(var i = 0; i < myObj[name].gallery.length; i++){
          var img = document.createElement("img");
          img.src = myObj[name].gallery[i];
          document.getElementById("gallery").appendChild(img);
        }
      }
	  }
	};
	xmlhttp.open("GET", "projects.json", true);
	xmlhttp.send();
}


function showContent(element) {
  var body = document.body;
  var temp = document.getElementById("project-page");

  var x = element.getAttribute("name");
  processContent(x);


  var image = temp.children[1];
  image.src = element.getElementsByTagName("img")[0].src;
  temp.classList.remove("hide");
  body.style.overflow = "hidden";
}

function clean(name){
  var holder = document.getElementById(name);
    while(holder.firstChild){
    holder.removeChild( holder.firstChild);
  }
}

function closeit(){
var body = document.body;
  clean("gallery");
  var temp = document.getElementById("project-page");
  body.style.overflow = "auto";
  temp.classList.add("hide");
}

$(document).ready(function(){

$(".categories a").click(function(){
  $(".page").addClass("hide");
  $($(this).attr('href')).toggleClass("hide");
});


document.onkeydown = keyCheck;

function keyCheck(e) {

    e = e || window.event;

    if (e.keyCode == '37' || e.keyCode == '39') {
        keyCode = e.keyCode;
        moveGallery(this);
    }


}

 var keyCode;
 var image_array = document.getElementsByClassName('image-p');
 
  $('#design .gallery .thumbnail').click(function(){
    $('#gallery-zoom').css('display','flex');   
    for(var i = 0; i < image_array.length; i++){
      
      if(image_array[i].src == this.getElementsByTagName('img')[0].src){
            var image = document.getElementById("img-zoom");
            image.src = this.getElementsByTagName('img')[0].src;
      }
    }
  });
  
  $('#right-arrow, #left-arrow').click(function(){
    moveGallery(this);
 
  });



  function moveGallery(entered){

        var image = document.getElementById("img-zoom");
    
       if(image_array[image_array.length-1].src == image.src && (entered.id == "right-arrow" || keyCode == '39')){
         image.src = image_array[0].src; 
         return; 
        }
    
        if(image_array[0].src == image.src && (entered.id == "left-arrow" || keyCode == '37')){
         image.src = image_array[image_array.length-1].src;  
         return;
        }
    
     for(var i = 0; i < image_array.length; i++){
      if(image_array[i].src == image.src){
            
        if(entered.id == "right-arrow" || keyCode == '39'){
           /*$(image_array[i]).css('left','-100%');*/
            image.src = image_array[i+1].src;
            break;
        }else{
            image.src = image_array[i - 1].src;
        }        
      }
    }   
  }
    
  $('#close').click(function(){
    $('#gallery-zoom').css('display','none');   
  });
  

  });


