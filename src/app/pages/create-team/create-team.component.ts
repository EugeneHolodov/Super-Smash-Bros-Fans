import { Component } from '@angular/core';
import { ITeam, ITeamTo } from './team.model';
import { TeamsService } from '../teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'bot-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent {
  user$ = this.auth.user$;
  team: ITeam = {
    id: '',
    name: '',
    owner: '',
    members: [
      {
        name: '',
        icon: '',
      },
    ],
    matchesHistory: null,
  };

  imageFile: File | null = null;

  constructor(
    private teamsSvc: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const ownerParam = this.route.snapshot.params['owner'];
    console.log('ownerParam:', ownerParam);
    if (!ownerParam) return;
    this.team.owner = ownerParam;
    this.teamsSvc.getTeam(ownerParam).subscribe((team) => {
      if (team) {
        this.team = team;
      }
    });
  }

  onFileSelected(file: File): void {
    this.imageFile = file;
  }

  saveTeam() {
    if (this.team.id !== '') {
      this.teamsSvc
        .saveTeam(this.team, this.imageFile, this.team.id)
        .subscribe({
          next: () => this.router.navigate(['/teams']),
          error: (err) => console.error('Error saving team:', err),
          complete: () => console.log('Save operation completed'),
        });
      return;
    }
    this.teamsSvc.saveTeam(this.team, this.imageFile).subscribe({
      next: () => this.router.navigate(['/teams']),
      error: (err) => console.error('Error saving team:', err),
      complete: () => console.log('Save operation completed'),
    });
  }

  add() {
    this.team.members.push({
      name: '',
      icon: '',
    });
  }
  remove(index: number) {
    this.team.members.splice(index, 1);
  }

  cancel() {
    this.team = {
      id: '',
      name: '',
      owner: '',
      members: [
        {
          name: '',
          icon: '',
        },
      ],
      matchesHistory: null,
    };
    this.router.navigate(['/teams']);
  }
}
