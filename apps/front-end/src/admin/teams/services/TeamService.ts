// src/app/services/team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDto } from 'shared-objects';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'api';

  constructor(private http: HttpClient) {}

  createTeam(team: TeamDto): Observable<TeamDto> {
    return this.http.post<TeamDto>(`${this.apiUrl}/teams`, team);
  }

  getTeamsByTag(tag: string): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(`${this.apiUrl}/teams/tag/${tag}`);
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tags`);
  }

  addTagToTeam(name: string, tag: string): Observable<TeamDto> {
    return this.http.post<TeamDto>(`${this.apiUrl}/teams/${name}/tags`, { tag });
  }

  searchTeamByName(name: string): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(`${this.apiUrl}/teams/search?name=${name}`);
  }
}
