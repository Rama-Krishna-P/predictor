import { autoInjectable } from 'tsyringe';
import { Team } from '../models/Team';
import { raw } from 'objection';

@autoInjectable()
export class TeamService {
    async createTeam(team: Partial<Team>): Promise<Team> {
        
        const existingTeam = await Team.query().findOne({ name: team.name });
        if (existingTeam) {
            throw new Error('Duplicate record: A team with this name already exists.');
        }

        const result = await Team.query().insert(team);
        return result;
    }

    async getTeamsByTag(tag: string): Promise<Team[]> {
        try {
            const teams = await Team.query().whereRaw('tags LIKE ?', [`%${tag}%`]);
            return teams;
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async searchTeamsByName(searchText: string): Promise<Team[]> {
        const teams = await Team.query().where('name', 'like', `%${searchText}%`);
        return teams;
    }

    async getAllTags(): Promise<string[]> {
        const teams = await Team.query().select('tags');
        const allTags = teams.flatMap(team => team.tags);
        const uniqueTags = [...new Set(allTags)];
        return uniqueTags;
    }

    async addTagToTeamByName(name: string, tag: string): Promise<Team> {
        const team = await Team.query().findOne({ name });
        if (!team) {
            throw new Error('Team not found');
        }
        if (!team.tags.includes(tag)) {
            team.tags.push(tag);
            await team.$query().patch({ tags: team.tags });
        }
        return team;
    }
}
