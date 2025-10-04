/**
 * Interface representing a html class wich simulate a web page
 *
 * Structure:
 * - `load`: void —  load the html
 * - `unload`: void —  unload the html
 */
export interface IHtml {
	load(): void;
	unload(): void;
}
