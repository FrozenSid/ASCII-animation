/*--ALEX Homework 6 ASCIIanimation*/

var TextFile;
var CurrentFrame;
var FrameCount;
var FrameDelay;

// Function to start the animation
function StartAnimation(){
	TextFile = document.getElementById("mytextarea").value; //save the contents of the textarea  
	CurrentFrame = TextFile.split("=====\n"); //separator for the frames in the textarea
	
	if(CurrentFrame.length <= 1)
	{
		alert("No ASCII Animation selected! Please, select an ASCIImation from the ''Animation'' dropdown menu!");
		return;
	}
	
	SetEnable(true); //this will enable the stop button 
	FrameCount = 0; // set counter to 0 so that every time it is initialized to zero when we select start button.
	GetFrame(); // method to get the next frame
	FrameDelay = window.setInterval(GetFrame, 250); // set the frame time interval before it loops back
}



// Function to get the next frame.
function GetFrame()
{
	document.getElementById("mytextarea").value = CurrentFrame[FrameCount];
	FrameCount = (FrameCount + 1) % CurrentFrame.length;
	//get the frames in the textarea by counting the first one and the remainder of the lenght of current frame
}



// Function to stop the animation
function StopAnimation()
{
	clearTimeout(FrameDelay);
	FrameDelay = null;
	document.getElementById("mytextarea").value = TextFile;
	SetEnable(false); // this will disable the stop button 
}



// Function to disable and enable the controls
function SetEnable(Value)
{
	document.getElementById("mytextarea").readOnly = Value; 
	document.getElementById("Animation").disabled = Value; 
	document.getElementById("Stop").disabled =! Value;  //if true --> Enable stop; if false --> Disable stop
	document.getElementById("Start").disabled = Value; //if true --> Disable Start; if false --> Enable start
	document.getElementById("turbo").disabled =! Value; // if true --> Enable turbo 
	document.getElementById("turbo").checked =! Value; //if checked ---> Enable turbo
		
}



// Function to Select the animation and get the text into the text area
function SelectAnimation()
{
	var whichOne = document.getElementById("Animation").value;
	document.getElementById("mytextarea").value = ANIMATIONS[whichOne];
	//get the animations from the animations.js file and apply them in the textarea
}



// Function to Select the size of the text
function SelectSize()
{
	var SizeChosen = document.getElementById("Size").value;
	(document.getElementById("mytextarea")).style.fontSize = SizeChosen; 
	//get the sizes from the HTML document with id="Size" and apply them to the textarea
	
}



// Function to increase the speed of changing of frames (set Turbo)
function SelectTurbo(){
	var Delay = 50;
	
	if (document.getElementById("turbo").checked) //if turbo is checked
	{
		Delay = document.getElementById("turbo").value; //delay is 50ms
	}
	else
	{
		Delay = 250; 
	}
	if(FrameDelay !== null) //if frame delay not empty
	{
		window.clearInterval(FrameDelay); //clear the interval
		FrameDelay = window.setInterval(GetFrame, Delay); //set interval before it loops back
	}
}