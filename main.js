video="";
objects=[];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas=createCanvas(450,350);
    canvas.position(480,200);
}

function start() {
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML=" Status : detecting objects "
}

function modelloaded() {
    console.log("model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function getresult(error,results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}



function draw() {
    image(video,0,0,450,350);
    if(status!="") {
        objectdetector.detect(video,getresult);
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="status - object detected";
            document.getElementById("no_of_obj").innerHTML="No of objects detected :" + objects.length;
           
            fill("lightgreen");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#878cc9");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }          
    }
}

