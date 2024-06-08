import { autoInjectable } from "tsyringe";
import { Team } from "../repositories/models/team";
import { TeamsRepository } from "../repositories/teams-repository";

@autoInjectable()
export class TeamsService {
    constructor(private repository: TeamsRepository) {

    }

    async getAllTeams(): Promise<Team[]> {
        return await this.repository.all()
    }
}