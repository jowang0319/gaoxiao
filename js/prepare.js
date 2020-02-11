window.onbeforeunload = function() {
  window.scrollTo(0,0);
}

document.onreadystatechange = function(){

  window.onload = setTimeout(function(){
    $(".loading_gx").fadeOut();
    $("body").css({overflowY:"auto"});
  }, 5000);
}

var a,
  video_length = 80,
  video,
  scroller = document.getElementById('mask'),
  text1 = document.getElementById('text1'),
  text2 = document.getElementById('text2'),
  an = document.getElementById('an'),
  button = document.getElementsByClassName('button');

var duration = 10;
var w,h,ratio,ratio_h,space_height,back1,back2,back3,back5,front1,front111,front2,front3,front4,front5,front6,front7,half_scatter_h,front9,front10,front11,credit;
var width_icon, height_icon, margin_icon, column;

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

console.log(isAndroid)
if (isAndroid == true){
  $("#an").css("display","none")
  $(".tishi").css("display","none")
  $("#mask").css("display","none");
  // $("body").css("overflow","auto")
  $("#front4").css("height","100vh")
  document.getElementById('video_m').style.opacity = "0";
  video_android.style.display = "block";
  $("#video_android").on("click", function(){console.log("click")
    video_android.play();
    video_android.controls = true;
  })

  
}

function resize1(){

  w = $(window).width();
  h = $(window).height();
  ratio = w/100;
  ratio_h = h/100;
  if(w<1500){
    width_icon = 30;
    height_icon = 40;
  }else{
    width_icon = 30;
    height_icon = 50;
  }
  margin_icon = 2.5;

  console.log(w,h)

  front1 = $("#front1").offset().top;
  front2 = $("#front2").offset().top - 1 * h;
  front3 = $("#front3").offset().top - 1 * h;
  front4 = $("#front4").offset().top - 1 * h;
  front_fudan = $("#front_fudan").offset().top - .8 * h;
  front5 = $("#front5").offset().top - 1 * h;
  front6 = $("#front6").offset().top - 1 * h;
  front7 = $("#front7").offset().top - 1 * h;
  front8 = $("#front8").offset().top - 1 * h;
  front9 = $("#front9").offset().top - 1 * h;
  front10 = $("#front10").offset().top - 1* h;
  front11 = $("#front11").offset().top - 1* h;
  front12 = $("#front12").offset().top - 1* h;
  front13 = $("#front13").offset().top - 1* h;
  front14 = $("#front14").offset().top - 1* h;
  front15 = $("#front15").offset().top - 1* h;
  front16 = $("#front16").offset().top - 1* h;
  front17 = $("#front17").offset().top - 1* h;
  front18 = $("#front18").offset().top - 1* h;
  front19 = $("#front19").offset().top - 1* h;
  front20 = $("#front20").offset().top - 1* h;
  front21 = $("#front21").offset().top - 1* h;
  front22 = $("#front22").offset().top - 1* h;
  front23 = $("#front23").offset().top - 1* h;
  front24 = $("#front24").offset().top - 1* h;
  front25 = $("#front25").offset().top - h;
  
} /*RESIZE1 END*/
resize1();

window.addEventListener("resize", resize1);

if(w<800){
  a = 35;
  video = document.getElementById('video_m');
 }else{
  a = 230;
  video = document.getElementById('video');
 }


var cover = document.getElementById('cover');
var hand = document.getElementsByClassName('hand');
if(w<800){
  cover.src = "img/cover2_m.jpg";
}else{
  cover.src = "img/cover2.jpg";
}

function changeSection(n){
  for(var i=0; i<=25; i++){
    if(i==n) {section[i]=1;} 
    else {section[i]=0}
  }
}

/*function preventDefault(e) {  
  e = e || window.event;  
  if (e.preventDefault)  
      e.preventDefault();  
  e.returnValue = false;    
}

function preventDefaultForScrollKeys(e) {  
    if (keys[e.keyCode]) {  
        preventDefault(e);  
        return false;  
    }  
}    

function disableScroll(){
    console.log("disable scroll")
    if (window.addEventListener) // older FF  
    window.addEventListener('DOMMouseScroll', preventDefault, false);  
    window.onwheel = preventDefault; // modern standard  
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE  
    window.ontouchstart  = preventDefault; // mobile  
    window.ontouchmove  = preventDefault; // mobile  
    document.onkeydown  = preventDefaultForScrollKeys;  
}

function enableScroll() {
    console.log("enable scroll")  
    if (window.removeEventListener)  
        window.removeEventListener('DOMMouseScroll', preventDefault, false);  
    window.onmousewheel = document.onmousewheel = null;   
    window.onwheel = null;
    window.ontouchstart  = null; // mobile     
    window.ontouchmove = null;    
    document.onkeydown = null;
    // bindScroll()
}*/


