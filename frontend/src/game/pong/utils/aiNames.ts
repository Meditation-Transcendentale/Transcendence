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
	"Hurararararararara",
	"Digital Destroyer",
	"ElFlamingoBob",
	"The Calculator",
	"Logic Lord",
	"Byte Brawler",
	"Code Crusher",
	"Data Demon",
	"Mergelin The Encoder",
	"Wise Rayqua29",
	"Evil Godo",
	"Pillofixlesgpustp"
];

export function getRandomAIName(): string {
	const randomIndex = Math.floor(Math.random() * AI_NAMES.length);
	return AI_NAMES[randomIndex];
}
