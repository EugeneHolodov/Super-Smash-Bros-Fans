import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { ImageService } from '../services/image.service';
import { ITeam } from '../create-team/team.model';

@Component({
  selector: 'bot-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: ITeam[] = [];

  constructor(private teamsSvc: TeamsService, private imageSvc: ImageService) {}

  ngOnInit() {
    this.teamsSvc.getAllTeams().subscribe((teams) => {
      if (teams) {
        console.log('teams:', teams);
        this.teams = teams;
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
