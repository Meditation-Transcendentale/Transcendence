export class CustomEvents {
	public static auth: Event;
	public static quit: Event;
	public static enable: Event;
	public static disable: Event;
	public static info: Event;
	public static stats: Event;
	public static play: Event;


	public static build() {
		CustomEvents.auth = new Event("auth");
		CustomEvents.quit = new Event("quit");
		CustomEvents.enable = new Event("enable");
		CustomEvents.disable = new Event("disable");
		CustomEvents.info = new Event("info");
		CustomEvents.stats = new Event("stats");
		CustomEvents.play = new Event("play");

	}
}
