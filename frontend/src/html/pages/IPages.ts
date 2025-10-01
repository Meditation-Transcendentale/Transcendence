export interface IPage {
	loaded: boolean;
	load(): void;
	unload(): void;
}
