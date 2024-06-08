import { autoInjectable } from "tsyringe";
import { Team } from "./models/team";

@autoInjectable()
export class TeamsRepository {
    constructor() {
    }

    async all(): Promise<Team[]> {
        return Team.query()
    }
}