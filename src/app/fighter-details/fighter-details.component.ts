import { Component, Input } from '@angular/core';
import { IFighter } from '../pages/fighters/fighter.model';

@Component({
  selector: 'bot-fighter-details',
  templateUrl: './fighter-details.component.html',
  styleUrls: ['./fighter-details.component.css']
})
export class FighterDetailsComponent {
  @Input() fighter!: IFighter;

  getImageUrl(fighter: IFighter) {
    if (!fighter) return '';
    return fighter.images.icon;
  }


}
