import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';



@Component({
  selector: 'bot-hero-list-groups',
  templateUrl: './hero-list-groups.component.html',
  styleUrls: ['./hero-list-groups.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: 120,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class HeroListGroupsComponent {
   @Input() heroes: any;

   @Output() remove = new EventEmitter<number>();

   removeHero(id: number) {
    console.log('removeHero:', id);
     this.remove.emit(id);
   }
}


