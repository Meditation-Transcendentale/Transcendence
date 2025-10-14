class StateManager {
	private states: Map<string, any>;

	public lobbyId!: string;
	public gameMode!: string;
	public gameMap!: string;
	public gameSubMode!: string;
	public gameId!: string;
	public tournamentId!: string;

	public popup: number;
	public friendlist!: boolean;

	public playPath!: string;

	constructor() {
		this.states = new Map<string, any>;
		this.lobbyId = "";
		this.gameMode = "";
		this.gameMap = "";
		this.gameSubMode = "";
		this.gameId = "";
		this.tournamentId = "";
		this.playPath = "";
		this.friendlist = false;

		this.popup = 0;
	}

	public has(key: string): boolean {
		return this.states.has(key);
	}

	public get(key: string): any {
		return this.states.get(key);
	}

	public set(key: string, value: any) {
		return this.states.set(key, value);
	}

	public remove(key: string) {
		return this.states.delete(key);
	}
}

// let g_StateManager: StateManager | null = null;
//
// export function createStateManager(): StateManager {
// 	if (g_StateManager === undefined || g_StateManager === null) {
// 		g_StateManager = new StateManager();
// 		//Object.freeze(g_StateManager) // Not sure if necessary or working
// 	}
// 	return g_StateManager;
// }
//
// export default g_StateManager;

export const stateManager = new StateManager();
