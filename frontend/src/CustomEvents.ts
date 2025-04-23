export class CustomEvents {
	public static auth: Event;
	public static quit: Event;
	public static enable: Event;
	public static disable: Event;

	public static build() {
		CustomEvents.auth = new Event("auth");
		CustomEvents.quit = new Event("quit");
		CustomEvents.enable = new Event("enable");
		CustomEvents.disable = new Event("disable");
	}
}
