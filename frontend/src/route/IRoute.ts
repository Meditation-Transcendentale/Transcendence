/**
 * Interface representing a route to load content
 * 
 * Structure:
 * - `created`: boolean — indicate if the route created its needed content
 * - `load`: void —  load the route
 * - `unload`: void —  unload the route
 */
export interface IRoute {
	created: boolean;
	load(): Promise<void>;
	unload(): Promise<void>;
}
