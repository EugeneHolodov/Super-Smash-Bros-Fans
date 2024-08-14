import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IFighter } from '../catalog/fighter.model';
import { ProductService } from '../catalog/product.service';

@Component({
  selector: 'bot-fighter-page',
  templateUrl: './fighter-page.component.html',
  styleUrls: ['./fighter-page.component.css'],
})
export class FighterPageComponent {
  fighter: IFighter = {} as IFighter;
  fighters: IFighter[] = [];
  seriesFighters: IFighter[] = [];
  path: string = '';

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.productSvc.getFighters().subscribe((fighters) => {
      this.fighters = fighters;
      this.getCurentFighter();
     
    });

    this.route.params.subscribe((params) => {
      this.path = params['name'];
      this.getCurentFighter();
      window.scrollTo(0, 0);
    });
  }

  getCurentFighter() {
    this.fighter = this.fighters.find(
      (fighter: IFighter) => fighter.name.toLocaleLowerCase() === this.path
    )!;
    this.updateSeriesFighters();
  }

  embedYouTubeVideo(videoUrl: string): SafeResourceUrl {
    if (!videoUrl) {
      return '';
    }
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl?.match(regExp);
    const url = match ? `https://www.youtube.com/embed/${match[1]}` : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToNext() {
    const next = this.fighters.indexOf(this.fighter) + 1;
    this.router.navigate(['/fighter', this.fighters[next].name.toLocaleLowerCase()]);
  }
  goToPrevious() {
    const previous = this.fighters.indexOf(this.fighter) - 1;
    this.router.navigate(['/fighter', this.fighters[previous].name.toLocaleLowerCase()]);
  }

  updateSeriesFighters() {
    if (!!this.fighters.length) {
      this.seriesFighters = this.fighters.filter(
        (fighter) => fighter.series.name === this.fighter.series.name && fighter.name !== this.fighter.name
      );
    }
  }
}
