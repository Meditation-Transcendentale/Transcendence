// List of AI opponent names
const AI_NAMES = [
	"DeepPaddle",
	"The Algorithm",
	"RoboSlam",
	"Neural Net",
	"Ping Pong Terminator",
	"Binary Beast",
	"Quantum Paddle",
	"Matrix Master",
	"Cyber Striker",
	"Digital Destroyer",
	"AI-nstein",
	"The Calculator",
	"Logic Lord",
	"Byte Brawler",
	"Code Crusher",
	"Data Demon",
	"Pixel Punisher",
	"Circuit Smasher",
	"Bot Bouncer",
	"Silicon Slayer"
];

export function getRandomAIName(): string {
	const randomIndex = Math.floor(Math.random() * AI_NAMES.length);
	return AI_NAMES[randomIndex];
}
