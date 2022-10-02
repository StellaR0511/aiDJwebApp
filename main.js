leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;


starWarsStatus = "";
hpStatus = "";

starWars = "";
harryPotter = "";

function preload(){
    starWars = loadSound("star_wars.mp3");
    harryPotter = loadSound("harry_potter.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}

function draw(){

    image(video, 0,0,500,400);
    fill("red");
    stroke("red");
    starWars.isPlaying();
    harryPotter.isPlaying();
    if(starWars.isPlaying()==true){
        starWarsStatus = true;
    } 
    else if(harryPotter.isPlaying()==true){
        hpStatus = true;
    }
    if(starWars.isPlaying()==false){
        starWarsStatus = false;
    } 
    else if(harryPotter.isPlaying()==false){
        hpStatus = false;
    }
    if(scoreRightWrist>0.1){
        circle(rightWristX, rightWristY, 20)
        if(rightWristY>400){
            starWars.stop();
            if(hpStatus == false){
            harryPotter.play();
            document.getElementById("song_name").innerHTML = "Song Name: Harry Potter"
            }
        }
        
    }
    if(scoreLeftWrist>0.1){
        circle(leftWristX, leftWristY, 20)
        if(leftWristY>400){
            harryPotter.stop();
            if(starWarsStatus == false){
            starWars.play();
            document.getElementById("song_name").innerHTML = "Song Name: Star Wars"
            }
        }
    }
    
}
function modelLoaded(){
    console.log("Model Loaded!");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+leftWristX+"   Left Wrist Y = "+leftWristY);
        console.log("Right Wrist X = "+rightWristX+"   Right Wrist Y = "+rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = "+scoreLeftWrist+"                       Right Wrist Score = "+scoreRightWrist);
    }
}