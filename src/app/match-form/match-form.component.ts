import { Component } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMember, ITeam, IMatchTo } from '../create-team/team.model';

@Component({
  selector: 'bot-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css'],
})
export class MatchFormComponent {
  
  allMembers!: IMember[];
  heroes!: IMember[];
  team!: ITeam;
  match: IMatchTo = {
    date: '',
    winner: { name: '', icon: '' },
    second: { name: '', icon: '' },
    third: { name: '', icon: '' },
    participants: [],
  };
  memberList: IMember[] = [];

  constructor(
    private teamsSvc: TeamsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];

    this.teamsSvc.getTeam(idParam).subscribe((team) => {
      if (team) {
        this.team = team;
        this.allMembers = team.members;
        this.heroes = team.members;
        this.match.participants = team.members;
        this.match.date = new Date().toISOString();
        console.log('MATCH:', team.matchesHistory);
      }
    });
  }

  isSavingDisabled() {
    return this.memberList.length < 3;
  }

  createMatch(hero: IMember) {
    let curentHero;
    if (!this.memberList.length) {
      curentHero = {
        ...hero,
        totalScore: hero.totalScore
          ? hero.totalScore === 0
            ? 20
            : hero.totalScore + 20
          : 20,
      };
      this.match.winner = curentHero;
    } else if (this.memberList.length === 1) {
      curentHero = {
        ...hero,
        totalScore: hero.totalScore
          ? hero.totalScore === 0
            ? 10
            : hero.totalScore + 10
          : 10,
      };
      this.match.second = curentHero;
    } else if (this.memberList.length === 2) {
      curentHero = {
        ...hero,
        totalScore: hero.totalScore
          ? hero.totalScore === 0
            ? 5
            : hero.totalScore + 5
          : 5,
      };
      this.match.third = curentHero;
    }
    console.log('HERO', hero);
    this.memberList.push(curentHero ? curentHero : hero);
  }

  onCenceled() {
    this.heroes = this.allMembers;
    this.memberList = [];
    this.match.winner = { name: '', icon: '' };
    this.match.second = { name: '', icon: '' };
    this.match.third = { name: '', icon: '' };
  }

  onSaved() {
    const history = { ...this.match, participants: this.memberList };
    console.log('history:', history);
    const members = this.allMembers.map((member) => {
      const matchMember = this.memberList.find(
        (matchMember) => matchMember.id === member.id
      );

      return {
        ...member,
        totalScore: matchMember ? matchMember.totalScore : member.totalScore,
      };
    });
    console.log('matchMembers:', members);
    this.teamsSvc.seveMatch(history, members, this.team.id!).subscribe({
      next: () => this.router.navigate(['/teams']),
      error: (err) => console.error('Error saving team:', err),
      complete: () => console.log('Save operation completed'),
    });
  }

  onRemove(id: number) {
    console.log('this.match:', this.match);
    console.log('this.team:', this.team);
    const hero = this.allMembers.find((hero) => hero.id === id)!;
    this.createMatch(hero);
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
  }
}
