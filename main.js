dynamite="";
dance="";
dynamite_status="";
dance_status="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

leftWristscore=0;
rightWristscore=0;

function preload(){
    dynamite = loadSound("music.mp3");
    dance=loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(800,450);
    canvas.position(400,200);
    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);

}

function draw(){
    image(video,0,0,800,450);
    dynamite_status=dynamite.isPlaying();
    dance_status=dance.isPlaying();
    fill("#0000FF");
    stroke("#0000FF");

 

    if(leftWristscore > 0.001)
    {
    
    circle(leftWristX,leftWristY,20);
    dance.stop();
    if(dynamite_status == false)
    {
        dynamite.play();
        document.getElementById("name").innerHTML="Song = Dynamite";
    }
    }

    if(rightWristscore > 0.001)
    {
    
    circle(rightWristX,rightWristY,20);
    dynamite.stop();
    if(dance_status == false)
    {
        dance.play();
        document.getElementById("name").innerHTML="Song = Peter Pan";
    }
    }
}


function modelLoaded(){
console.log("Model Loaded Successfully");
}

function gotPoses(results){
    if(results.length>0)
    {

        console.log(results);
        leftWristscore=results[0].pose.keypoints[9].score;
        rightWristscore=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrst X = " +leftWristX+ "Left Wrist Y = " +leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrst X = " +rightWristX+ "Right Wrist Y = " +rightWristY);
        console.log(leftWristscore);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
