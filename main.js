var img="";
var status="";
var objects=[];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    object_detector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";

}
function draw(){
    image(img,0,0,640,420);
    if(status !=""){
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : objects detected";
            fill("#F91805");
            percent=floor(objects[i].confidence*100);
            textSize(20);
            text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+17);
            noFill();
            stroke("#F91805");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}
function modelloaded(){
    console.log("Model loaded");
    status=true;
    object_detector.detect(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects=result;
    }
}