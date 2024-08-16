import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { IFighter } from './fighter.model';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    trigger('in', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(100, [
            animate('300ms', style({ opacity: 1, transform: ' scale(1)' })),
          ]),
        ]),
      ])
      ]),
      trigger('leave', [
        transition(':leave', [
          query(':leave', [
            style({ opacity: 1, transform: 'scale(1)' }),
            animate('800ms ease-in', style({ opacity: 0, transform: 'translateX(-200px)  scale(0.8)' })),        
          ]),
        ]),
      ]),  
    ],
})
export class CatalogComponent {
  products: any;
  fighters: any;
  filter: string = '';
  filters: string[] = [''];
  

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productSvc.getFighters().subscribe((fighters) => {
      console.log('fighters', fighters);
      this.fighters = fighters;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  getFilteredFighters() {
    return this.filter === ''
      ? this.fighters
      : this.fighters.filter(
          (fighter: any) => fighter.series.name === this.filter
        );
  }

  getFiltersList() {
    if (!this.fighters || this.fighters.length === 0) {
      return;
    }
    const nameCount = this.fighters.reduce((acc: any, fighter: IFighter) => {
      const name = fighter.series.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    this.filters = Object.keys(nameCount).filter(name => nameCount[name] > 1);

    return this.filters;
  }

  getFilterIcon(name: string) {
    return this.fighters.find((fighter: any) => fighter.series.name === name)
      ?.series.icon;
  }
}
