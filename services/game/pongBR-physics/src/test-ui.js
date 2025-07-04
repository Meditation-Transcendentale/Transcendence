import blessed from 'blessed';

const screen = blessed.screen({
	smartCSR: true,
	title: 'Test Terminal UI'
});

const box = blessed.box({
	top: 'center',
	left: 'center',
	width: 40,
	height: 20,
	content: 'Hello, world!',
	border: {
		type: 'line'
	},
	style: {
		fg: 'white',
		bg: 'black',
		border: {
			fg: '#f0f0f0'
		}
	}
});

screen.append(box);
screen.render();

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

