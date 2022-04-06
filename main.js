hpsong = "";
psong = "";

function preload()
{
    hpsong = loadSound("music.mp3");
    psong = loadSound("music2.mp3");
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftwrist = 0;

status1 = "";


function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet has been initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score" + scoreleftwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + ", Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + ", Right wrist y = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    

    fill("#FF0000");
    stroke("#FF0000");

    status1 = psong.isPlaying();
    
    if(scoreleftwrist > 0.2)
    {

    circle(leftWristX, leftWristY, 20);
    hpsong.stop();
    if(status1 == false)
    {
        psong.play();
        document.getElementById("h31").innerHTML = "Playing Peter Pan Song";
    }
    }
    
  
}