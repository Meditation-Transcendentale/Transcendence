import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

export function gameScoreInterface(){
	const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
	
	const scoreTitle = new TextBlock();
	scoreTitle.text = "Score";
	scoreTitle.color = "white";
	scoreTitle.fontSize = 34;
	scoreTitle.left = "0px";
	scoreTitle.top = "-300px";
	advancedTexture.addControl(scoreTitle);
	
	const scorePipe = new TextBlock();
	scorePipe.text = "|";
	scorePipe.color = "white";
	scorePipe.fontSize = 24;
	scorePipe.left = "0px";
	scorePipe.top = "-250px";
	advancedTexture.addControl(scorePipe);
	
	let scoreP1 = 0;
	let scoreP2 = 0;
	
	const score = new TextBlock();
	score.text = scoreP1 + " | " + scoreP2;
	score.color = "white";
	score.fontSize = 24;
	score.left = "0px";
	score.top = "-250px";
	advancedTexture.addControl(score);

}