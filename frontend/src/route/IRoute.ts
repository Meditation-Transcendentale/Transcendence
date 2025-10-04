export interface IRoute {
	created: boolean;
	load(): Promise<void>;
	unload(): Promise<void>;
}
