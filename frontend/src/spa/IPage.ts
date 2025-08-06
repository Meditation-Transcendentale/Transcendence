export interface IPage {
	load(params?: URLSearchParams): void;
	unload(): void;
}
