import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TeamsService } from '../teams/teams.service';
import { ITeamForm } from '../../create-team/team.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'bot-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user$ = this.auth.user$;
  team: ITeamForm | undefined;
  error: string | undefined;
  owner: string | undefined;

  constructor(public auth: AuthService, private teamsSvc: TeamsService) {}

  ngOnInit() {
    console.log('working');
    this.auth.user$.subscribe((user) => {
      if (user && user.email) {
        this.owner = user.email;
        this.teamsSvc
          .getTeamByOwner(user.email)
          .pipe(
            catchError((error) => {
              if (error.status === 404) {
                this.error = 'No team found for this user.';
                this.team = undefined;
              } else {
                this.error = 'An error occurred while fetching the team.';
              }
              return of(null); // Возвращаем Observable, чтобы избежать ошибки в потоке
            })
          )
          .subscribe((team) => {
            if (team) {
              this.team = team;
             
            }
          });
      }
    });
  }
  getToken(){
    const lokalToken = localStorage.getItem('token');
    console.log('lokalToken:', lokalToken);
  }

  getUserInfo() {
    this.auth.user$.subscribe((user) => {
      console.log(user);
    });
  }
}
