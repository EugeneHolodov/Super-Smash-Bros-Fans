import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
import { ImageService } from '../services/image.service';
import { ITeam } from '../create-team/team.model';

@Component({
  selector: 'bot-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css'],
})
export class TeamPageComponent {
  path: string = '';
  team: ITeam = {} as ITeam;

  constructor(
    private route: ActivatedRoute,
    private teamsSvc: TeamsService,
    private imageSvc: ImageService
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.path = contactId;

    this.teamsSvc.getTeam(this.path).subscribe((team) => {
      if (team) {
        this.team = team;
      }
    });
  }
  showImage(imgUrl: string | undefined) {
    return this.imageSvc.showImage(imgUrl);
  }

  showIcon(icoUrl: string) {
    return this.imageSvc.showIcon(icoUrl);
  }
}
