import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { ImageService } from 'src/app/services/image.service';
import { ITeam } from 'src/app/create-team/team.model';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'bot-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  animations: [
    trigger('in', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(100, [
            animate('300ms', style({ opacity: 1, transform: ' scale(1)' })),
          ]),
        ], {optional: true}),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          stagger(100, [
            animate('300ms', style({ opacity: 0, transform: ' scale(0.8)' })),
          ]),
        ], {optional: true}),
      ])
      ]),
    ],
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
