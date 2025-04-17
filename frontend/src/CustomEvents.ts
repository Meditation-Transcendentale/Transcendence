export class CustomEvents {
	public static auth: Event;
	public static quit: Event;

	public static build() {
		CustomEvents.auth = new Event("auth");
		CustomEvents.quit = new Event("quit");
	}
}
