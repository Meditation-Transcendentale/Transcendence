import { AdvancedDynamicTexture, TextBlock } from "@babylonImport";

export function gameScoreInterface(scoreP1: number, scoreP2: number) {
	const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

	const scoreTitle = new TextBlock();
	scoreTitle.text = "Score";
	scoreTitle.color = "white";
	scoreTitle.fontSize = 34;
	scoreTitle.left = "0px";
	scoreTitle.top = "-300px";
	advancedTexture.addControl(scoreTitle);

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
		},
		dispose: () => {
			console.log("scoreUI dispose");
			advancedTexture.dispose();
		}
	}
}

export function gameEndUI(playerWin: boolean) {
	const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ENDUI");

	if (playerWin) {
		const scoreTitle = new TextBlock();
		scoreTitle.text = "You won!";
		scoreTitle.color = "green";
		scoreTitle.fontSize = 50;
		scoreTitle.left = "0px";
		scoreTitle.top = "0px";
		advancedTexture.addControl(scoreTitle);
	} else {
		const scoreTitle = new TextBlock();
		scoreTitle.text = "You lost!";
		scoreTitle.color = "red";
		scoreTitle.fontSize = 50;
		scoreTitle.left = "0px";
		scoreTitle.top = "0px";
		advancedTexture.addControl(scoreTitle);
	}

	return {
		dispose: () => {
			advancedTexture.dispose();
		}
	};
}
