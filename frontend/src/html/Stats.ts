import { postRequest } from "../networking/request";

class ClassicStats {

	public gamesPlayed!: number;
	public gamesWined!: number;
	public gamesLoosed!: number;
	public winRate!: number;
	public bestWinStreak!: number;
	public goalsScored!: number;
	public goalsConceded!: number;

	constructor() {
	}

	public update(uuid: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			postRequest("stats/player", { uuid: uuid, mode: "classic" })
				.then((json: any) => {
					this.gamesPlayed = json.playerStats.stats.game_played;
					this.gamesWined = json.playerStats.stats.wins;
					this.gamesLoosed = json.playerStats.stats.losses;
					this.winRate = json.playerStats.stats.win_rate;
					this.bestWinStreak = json.playerStats.stats.best_win_streak;
					this.goalsScored = json.playerStats.stats.goals_scored;
					this.goalsConceded = json.playerStats.stats.goals_conceded;
					resolve(true);
				})
				.catch((err) => {
					reject(new Error(err));
				})
		})
	}
}

class BrStats {

	public gamesPlayed!: number
	public gamesWined!: number
	public winRate!: number
	public bestPlacement!: number
	public averagePlacement!: number

	constructor() {
	}

	public async update(uuid: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			postRequest("stats/player", { uuid: uuid, mode: "br" })
				.then((json: any) => {
					this.gamesPlayed = json.playerStats.stats.game_played;
					this.gamesWined = json.playerStats.stats.wins;
					this.winRate = json.playerStats.stats.win_rate;
					this.averagePlacement = json.playerStats.stats.avg_placement;
					if (json.playerStats.stats.game_played == 0) {
						this.bestPlacement = 0;
					}
					else {
						this.bestPlacement = json.playerStats.stats.best_placement;
					}
					resolve(true);
				})
				.catch((err) => {
					reject(new Error(err));
				})
		})
	}
}

class MatchHistory {

	public history!: any[];

	constructor() {
	}

	public async update(uuid: string): Promise<any> {
		return new Promise((resolve, reject) => {
			postRequest("stats/get/history", { uuid: uuid })
				.then((json: any) => {
					this.history = json.playerHistory;
					resolve(true);
				})
				.catch((err) => {
					reject(new Error(err));
				})
		})
	}

}

export class Stats {
	public classic: ClassicStats;
	public br: BrStats;
	public history: MatchHistory;

	constructor() {
		this.classic = new ClassicStats();
		this.br = new BrStats();
		this.history = new MatchHistory();
	}

	public async update(uuid: string) {
		await this.classic.update(uuid);
		await this.br.update(uuid);
		await this.history.update(uuid);
	}
}
