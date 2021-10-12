prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("webcam");

Webcam.attach("#webcam");

function takeSnapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='caputuredImg' src='"+data_uri+"'>";
    });
}

console.log("ml5 version:", ml5.version);

classifer = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gGaqLGT2r/model.json", modelReady);

function modelReady()
{
    console.log("Model Ready!");
}

function speaking()
{
    synth = window.speechSynthesis;
    speak1 = "1st prediction is " + prediction1;
    speak2 = "2nd prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function findEmoji()
{
    img = document.getElementById("caputuredImg");
    classifer.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        consle.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("predictionWord1").innerHTML = result[0].label;
        document.getElementById("predictionWord2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speaking();
        if(prediction1 == "Happy")
        {
            document.getElementById("predictionEmoji1").innerHTML = "&#128522";
        }

        if(prediction1 == "Sad")
        {
            document.getElementById("predictionEmoji1").innerHTML = "&#128532";
        }

        if(prediction1 == "Angry")
        {
            document.getElementById("predictionEmoji1").innerHTML = "&#128548";
        }

        if(prediction2 == "Happy")
        {
            document.getElementById("predictionEmoji2").innerHTML = "&#128522";
        }

        if(prediction2 == "Sad")
        {
            document.getElementById("predictionEmoji2").innerHTML = "&#128532";
        }

        if(prediction2 == "Angry")
        {
            document.getElementById("predictionEmoji2").innerHTML = "&#128548";
        }
    }
}

