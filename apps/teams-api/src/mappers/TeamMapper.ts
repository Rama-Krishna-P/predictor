// TeamMapper.ts
import { Team } from '../models/Team';
import { TeamDto } from 'shared-objects';
import { v4 as uuidv4 } from 'uuid';

export class TeamMapper {
  static toDto(team: Team): TeamDto {
    return new TeamDto(team.id, team.name, team.shortName, team.logo, team.tags, team.archived);
  }

  static toEntity(teamDto: TeamDto): Team {
    return Team.fromJson({
        id: teamDto.id == '' ? uuidv4() : teamDto.id,
        name: teamDto.name,
        shortName: teamDto.shortName,
        logo: teamDto.logo,
        tags: teamDto.tags,
        archived: teamDto.archived
      });
  }
}
