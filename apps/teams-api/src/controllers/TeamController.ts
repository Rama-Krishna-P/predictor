import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { TeamService } from '../services/TeamService';
import { TeamDto } from "shared-objects";
import { TeamMapper } from '../mappers/TeamMapper';

@autoInjectable()
export class TeamController {
  constructor(private teamService: TeamService) {}

  createTeam = async (req: Request, res: Response): Promise<void> => {
    try {
      const teamDto: TeamDto = req.body;
      const team = TeamMapper.toEntity(teamDto);
      const createdTeam = await this.teamService.createTeam(team);
      res.status(201).json(TeamMapper.toDto(createdTeam));
    } catch (error) {
      if (error.message.includes('Duplicate record')) {
        res.status(409).json({ error: error.message });
      } else {
        console.log(error)
        res.status(400).json({ error: error.message });
      }
    }
  };

  getTeamsByTag = async (req: Request, res: Response): Promise<void> => {
    try {
      const tag = req.params.tag;
      const teams = await this.teamService.getTeamsByTag(tag);
      const teamDtos = teams.map(TeamMapper.toDto);
      res.json(teamDtos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  searchTeamsByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'Name query parameter is required and must be a string' });
      return;
    }
    try {
      const teams = await this.teamService.searchTeamsByName(name);
      const teamDtos = teams.map(TeamMapper.toDto);
      res.status(200).json(teamDtos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getAllTags = async (req: Request, res: Response): Promise<void> => {
    try {
      const tags = await this.teamService.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  addTagToTeamByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;
    const { tag } = req.body;
    try {
      const updatedTeam = await this.teamService.addTagToTeamByName(name, tag);
      res.status(200).json(TeamMapper.toDto(updatedTeam));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
