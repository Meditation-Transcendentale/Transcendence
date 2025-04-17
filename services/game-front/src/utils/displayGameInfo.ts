import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

export function gameScoreInterface(scoreP1: number, scoreP2: number){
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
	
	const score = new TextBlock();
	score.text = scoreP1 + " | " + scoreP2;
	score.color = "white";
	score.fontSize = 24;
	score.left = "0px";
	score.top = "-250px";
	advancedTexture.addControl(score);

	return {
		update: (newScoreP1: number, newScoreP2: number) => {
			score.text = `${newScoreP1} | ${newScoreP2}`;
		}
	}

}