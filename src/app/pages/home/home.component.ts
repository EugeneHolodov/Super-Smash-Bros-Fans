import { Component, AfterViewInit, ElementRef, HostListener, ViewChild} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('showItem', [
      state('show', style({ opacity: 1, transform: 'none' })),
      state('hide', style({ opacity: 0, transform: 'none' })),
      state('hideLeft', style({ opacity: 0, transform: 'translateX(200px)' })),
      state('hideRight', style({ opacity: 0, transform: 'translateX(-200px)' })),
      state('hideBottom', style({ opacity: 0, transform: 'translateY(200px)' })),
      transition('hide => show', animate('700ms ease-in')),
      transition('hideLeft => show', animate('700ms ease-in')),
      transition('hideRight => show', animate('700ms ease-in')),
      transition('hideBottom => show', animate('700ms ease-in')),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  // Separate states for each element
  coverState = 'hide';
  fightersState = 'hideLeft';
  tournamentsState = 'hideRight';
  welcomeIconLeftState = 'hideLeft';
  welcomeIconRightState = 'hideRight';
  welcomeTextState = 'hideBottom';
  newsState = 'hideBottom';
  


  // ViewChild or ViewChildren for individual or multiple elements
  @ViewChild('fighters') fightersElement!: ElementRef;
  @ViewChild('tournaments') tournamentsElement!: ElementRef;
  @ViewChild('welcomeIconLeft') welcomeIconLeftElement!: ElementRef;
  @ViewChild('welcomeIconRigh') welcomeIconRighElement!: ElementRef;
  @ViewChild('welcomeText') welcomeTextElement!: ElementRef;
  @ViewChild('news') newsElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY;
    // Check for the Fighters section
    const fightersPosition = this.fightersElement.nativeElement.offsetTop;
    if (scrollPosition >= fightersPosition - 450) { 
      this.fightersState = 'show';
    }

    const welcomeIconLeftPosition = this.welcomeIconLeftElement.nativeElement.offsetTop;
    if (scrollPosition >= welcomeIconLeftPosition - 950) { 
      this.welcomeIconLeftState = 'show';
      this.welcomeIconRightState = 'show';
      this.welcomeTextState = 'show';
    }

    // Check for the Tournaments section
    const tournamentsPosition = this.tournamentsElement.nativeElement.offsetTop;
    if (scrollPosition >= tournamentsPosition - 700) { 
      this.tournamentsState = 'show'
    }

    // Check for the Parts section
    const newsPosition = this.newsElement.nativeElement.offsetTop;
    if (scrollPosition >= newsPosition ) { 
      this.newsState = 'show';
    }
  }

  ngAfterViewInit() {
    this.coverState = 'show';
    this.checkScroll(); // Initial check in case some elements are already in view
  }
}
