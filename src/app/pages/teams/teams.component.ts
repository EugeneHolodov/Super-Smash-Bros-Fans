import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { ImageService } from 'src/app/services/image.service';
import { ITeam } from '../create-team/team.model';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'bot-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [
    trigger('in', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger(100, [
              animate('300ms', style({ opacity: 1, transform: ' scale(1)' })),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ opacity: 1, transform: 'scale(1)' }),
            stagger(100, [
              animate('300ms', style({ opacity: 0, transform: ' scale(0.8)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('hover', [
      state(
        'hover',
        style({
          cursor: 'pointer',
          borderBottom: '4px solid var(--accent-color)',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          width: '90%',
        })
      ),

      state('hoverInfo', style({ display: 'flex', opacity: 1 })),
      state('out', style({ width: '400px' })),
      state('outInfo', style({ display: 'none', opacity: 0 })),
      transition('out => hover', animate('400ms ease-in')),
      transition('hover => out', animate('200ms ease-out')),
      transition('outInfo => hoverInfo', animate('300ms 300ms ease-in')),
      transition('hoverInfo => outInfo', animate('300ms ease-out')),
    ]),
  ],
})
export class TeamsComponent {
  teams: ({ hoverState: any } & ITeam)[] = []; // Extend ITeam with hoverState

  constructor(private teamsSvc: TeamsService, private imageSvc: ImageService) {}

  ngOnInit() {
    this.teamsSvc.getAllTeams().subscribe((teams) => {
      if (teams) {
        console.log('teams:', teams);
        this.teams = teams.map((team) => ({
          ...team,
          hoverState: {
            allState: 'out',
            titleState: 'out',
            infoState: 'outInfo',
          },
        }));
      }
    });
  }

  onMouseEnter(index: number) {
    this.teams[index].hoverState.allState = 'hover';
    //this.teams[index].hoverState.infoState = 'hoverInfo';
  }

  onMouseLeave(index: number) {
    this.teams[index].hoverState.allState = 'out';
    // this.teams[index].hoverState.infoState = 'outInfo';
  }

  showImage(imgUrl: string | undefined) {
    return this.imageSvc.showImage(imgUrl);
  }

  showIcon(icoUrl: string) {
    return this.imageSvc.showIcon(icoUrl);
  }
}
