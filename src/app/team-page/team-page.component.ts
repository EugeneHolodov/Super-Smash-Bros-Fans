import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../pages/teams/teams.service';
import { TeamService } from './services/team-page.service';
import { ImageService } from '../services/image.service';
import { IMember, ITeam } from '../pages/create-team/team.model';

@Component({
  selector: 'bot-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent {
  path: string = '';
  team: ITeam = {} as ITeam;
  displayedMembers: { rank: number, members: IMember[] }[] = [];
  constructor(
    private route: ActivatedRoute,
    private teamsSvc: TeamsService,
    private teamSvc: TeamService,
    private imageSvc: ImageService
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.path = contactId;

    this.teamsSvc.getTeam(this.path).subscribe((team) => {
      if (team) {
        this.team = team;
        this.displayedMembers = this.teamSvc.getDisplayedMembersWithRank(team);
        console.log('Displayed Members',this.displayedMembers);
      }
      console.log('Team',this.team);
    });
  }
  showImage(imgUrl: string | undefined) {
    return this.imageSvc.showImage(imgUrl);
  }

  showIcon(icoUrl: string) {
    return this.imageSvc.showIcon(icoUrl);
  }
}
