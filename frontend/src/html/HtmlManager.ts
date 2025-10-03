import { NotificationHtml } from "./NotificationHtml";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { IPage } from "./pages/IPages";


class HtmlManager {
	private pages: Map<string, IPage>;
	private currentPage: IPage | null;

	public notification: NotificationHtml;

	constructor() {
		console.log("%c HTML Manager", "color: white; background-color: red");
		this.pages = new Map<string, IPage>;
		this.currentPage = null;
		this.notification = new NotificationHtml();
	}

	public async loadPage(page: string, html: string) {
		if (!this.pages.has(page)) {
			const div = await this.fetchHTML(html);
			switch (page) {
				case "/auth": {
					this.pages.set(page, new Auth(div))
					break;
				}
				case "/home": {
					this.pages.set(page, new Home(div));
					break;
				}
			}
		}
		const ts = this.pages.get(page);
		if (!ts || ts.loaded) {
			return;
		}
		this.currentPage?.unload();
		ts.load();
		this.currentPage = ts;
	}


	private async fetchHTML(path: string): Promise<HTMLDivElement> {
		const url = `https://${window.location.hostname}:7000/html/` + path + ".html";
		const response = await fetch(url, { redirect: "error" })

		if (!response.ok) {
			Promise.reject(response)
		};

		const text = await response.text();
		const div = document.createElement("div");
		div.innerHTML = text;
		return div.firstChild as HTMLDivElement;
	}
}

export const htmlManager = new HtmlManager();
