import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMatchTo, IMember, ITeamForm, ITeamTo } from '../create-team/team.model';
import { MyAuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient, private authSvc: MyAuthService) {}

  getAllTeams(): Observable<ITeamForm[]> {
    return this.http.get<ITeamForm[]>('api/teams');
  }

  getTeam(id: string): Observable<ITeamForm | undefined> {
    return this.http.get<ITeamForm>(`api/teams/${id}`);
  }

  getTeamByOwner(owner: string): Observable<ITeamForm | undefined> {
    return this.http.get<ITeamForm>(`api/teams/owner/${owner}`);
  }

  saveTeam(
    team: ITeamTo,
    image?: File | null,
    teamId?: string
  ): Observable<any> {
    return this.authSvc.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('No access token available');
        }
        console.log('token:', token);
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        console.log('headers:', headers);
        const formData = new FormData();
        formData.append('owner', team.owner);
        formData.append('name', team.name);
        formData.append('totalGames', team.totalGames?.toString() || '0');

        if (team.matchesHistory) {
          team.matchesHistory.forEach((match, index) => {
            formData.append(`matchesHistory[${index}].date`, match.date);
            formData.append(
              `matchesHistory[${index}].winner`,
              match.winner.name
            );
            formData.append(
              `matchesHistory[${index}].second`,
              match.second.name
            );
            formData.append(`matchesHistory[${index}].third`, match.third.name);
            match.participants.forEach((participant, i) => {
              formData.append(
                `matchesHistory[${index}].participants[${i}]`,
                participant.name
              );
            });
          });
        }

        if (image) {
          formData.append('image', image || '');
        }

        team.members.forEach((member, index) => {
          formData.append(`members[${index}].name`, member.name);
          formData.append(`members[${index}].icon`, member.icon);
          formData.append(
            `members[${index}].totalScore`,
            member.totalScore?.toString() || '0'
          );
        });

        if (teamId) {
          return this.http.put(`api/teams/${teamId}`, formData, { headers });
        } else {
          return this.http.post('api/teams', formData, { headers });
        }
      })
    );
  }

  seveMatch(match: IMatchTo, members: IMember[], teamId: string): Observable<any> {
    return this.authSvc.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('No access token available');
        }
        console.log('token:', token);
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        console.log('headers:', headers);
        const formData = new FormData();
        formData.append('date', match.date);
        formData.append('winner', match.winner.name);
        formData.append('second', match.second.name);
        formData.append('third', match.third.name);
        match.participants.forEach((participant, index) => {
          formData.append(`participants[${index}]`, participant.name);
        });

        members.forEach((member, index) => {
          formData.append(`members[${index}].name`, member.name);
          formData.append(`members[${index}].icon`, member.icon);
          formData.append(
            `members[${index}].totalScore`,
            member.totalScore?.toString() || '0'
          );
        });
        return this.http.put(`api/teams/${teamId}`, formData, {
          headers,
        });
      })
    );
  }
}
