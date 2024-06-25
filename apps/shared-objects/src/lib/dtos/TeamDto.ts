// TeamDto.ts
export class TeamDto {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    tags: string[];
    archived: boolean;
  
    constructor(id: string, name: string, shortName: string, logo: string, tags: string[], archived: boolean = false) {
      this.id = id;
      this.name = name;
      this.shortName = shortName;
      this.logo = logo;
      this.tags = tags;
      this.archived = archived;
    }
  }
  