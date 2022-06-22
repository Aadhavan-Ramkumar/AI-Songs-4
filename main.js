var Song1, Song2
var Song1Name = "Girls Like You",
    Song2Name = "Enemy"
var LeftWristX = 0,
    LeftWristY = 0,
    RightWristX = 0,
    RightWristY = 0
var LeftWristScore = 0
var Song1Playing = ""

function preload() {
    Song1 = loadSound("Girls Like You.mp3")
    Song2 = loadSound("Enemy.mp3")
}

function setup() {
    Canvas = createCanvas(500, 400)
    Canvas.center()

    Video = createCapture(VIDEO)
    Video.hide()

    PoseNet = ml5.poseNet(Video, () => {
        console.log("PoseNet is Initalized!")
    })
    PoseNet.on("pose", GetPoses)
}

function draw() {
    image(Video, 0, 0, 500, 400)

    Song1Playing = Song1.isPlaying()

    stroke("red")
    fill("red")

    if (LeftWristScore > 0.002) {
        circle(LeftWristX, LeftWristY, 20)
        Song2.stop()
        if (Song1Playing == false) {
            Song1.play()
            document.getElementById("SongName").innerHTML = "Song Name: " + Song1Name
        }
    }
}

function GetPoses(Results) {
    if (Results.length > 0) {
        LeftWristScore = Results[0].pose.keypoints[9].score

        LeftWristX = Results[0].pose.leftWrist.x
        LeftWristY = Results[0].pose.leftWrist.y

        RightWristX = Results[0].pose.rightWrist.x
        RightWristY = Results[0].pose.rightWrist.y
    }
}