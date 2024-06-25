import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from './services/TeamService'
import { Subject, Observable, interval } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TeamDto } from "shared-objects";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit, OnDestroy {
  newTeam: TeamDto = new TeamDto('', '', '', '', ["International Cricket"]);
  teamsWithSelectedTag: TeamDto[] = [];
  allTags: string[] = [];
  selectedTag: string = 'International Cricket';
  logoPreview: string | ArrayBuffer | null = null;
  searchedTeams: TeamDto[] = [];
  searchTeamName: string = '';

  private searchSubject: Subject<string> = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();
  isSearching: boolean = false;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.loadTeamsByTag();

    const customOperator = () => (source: Observable<string>) =>
      new Observable<string>((observer) => {
        let isClearing = false; // Flag to track if clearing the search

        const subscription = source.subscribe({
          next: (value) => {
            if (!value) {
              isClearing = true;
              this.searchedTeams = []
              this.isSearching = false;
            } else if (isClearing) {
              //this.isSearching = true; // Reset isSearching if cleared then typed again
              isClearing = false;
            }

            observer.next(value);
          },
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => subscription.unsubscribe();
      });

    this.searchSubject.pipe(
      customOperator(),
      debounceTime(2000), // Debounce for 3 seconds
      distinctUntilChanged(), // Only emit if the value has changed
      takeUntil(this.destroy$) // Unsubscribe when component is destroyed
    ).subscribe((searchValue) => {
      if (searchValue) {
        this.isSearching = true
        this.searchTeam(searchValue);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event): void {
    // Send search value to search subject
    const target = event.target as HTMLInputElement;
    const value = target.value.trim(); // Get the trimmed value
    this.searchSubject.next(value);
  }

  loadTeamsByTag(): void {
    this.teamService.getTeamsByTag(this.selectedTag).subscribe((teams) => {
      this.teamsWithSelectedTag = teams;
    });
  }

  searchTeam(name: string): void {
    this.teamService.searchTeamByName(name).subscribe((teams) => {
      this.searchedTeams = teams;
    }, (error) => {
      this.searchedTeams = [];
    });
  }

  isTeamInCurrentTag(team: TeamDto): boolean {
    return this.teamsWithSelectedTag.some(t => t.id === team.id);
  }

  addTagToSearchedTeam(team: TeamDto): void {
    this.teamService.addTagToTeam(team.name, this.selectedTag).subscribe(
      (updatedTeam) => {
        this.loadTeamsByTag();  // Refresh the team list
      },
      (err) => {
        alert('Failed to add the team to the sport: ' + err.message);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        this.previewFile(file);
      } else {
        alert('Only JPG and PNG files are allowed.');
        this.newTeam.logo = '';
        this.logoPreview = null;
      }
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.newTeam.logo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.teamService.createTeam(this.newTeam).subscribe(
      (team) => {
        this.newTeam = new TeamDto('', '', '', '', [this.selectedTag]);
        this.logoPreview = null;
        this.loadTeamsByTag();
      },
      (error) => {
        if (error.status === 409) {
          if (!this.teamsWithSelectedTag.some(t => t.name.toLowerCase() === this.newTeam.name.toLowerCase())) {
            const addTag = confirm('Team already exists. Do you want to add the team to the current tag?');
            if (addTag) {
              this.teamService.addTagToTeam(this.newTeam.name, this.selectedTag).subscribe(
                (updatedTeam) => {
                  this.newTeam = new TeamDto('', '', '', '', [this.selectedTag]);
                  this.loadTeamsByTag();  // Refresh the team list
                },
                (err) => {
                  alert('Failed to add tag: ' + err.message);
                }
              );
            }
          }
          else {
            this.newTeam = new TeamDto('', '', '', '', [this.selectedTag]);
            alert('Team already exists')
          }
        } else {
          alert('Failed to create team: ' + error.message);
        }
      }
    );
  }
}
