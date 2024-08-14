import { Injectable } from '@angular/core';
import { IMember, ITeam } from '../../create-team/team.model';


@Injectable({
    providedIn: 'root',
  })
  export class TeamService {

    
getDisplayedMembersWithRank(team: ITeam): { rank: number, members: IMember[] }[] {
    if (!team.members) {
      return [];
    }
  
    // Sort members by totalScore in descending order
    const sortedMembers = team.members.sort((a, b) => b.totalScore! - a.totalScore!);
  
    // Group members by score
    const groupedByScore = sortedMembers.reduce((acc, member) => {
      const scoreGroup = acc.find(group => group.score === member.totalScore);
      if (scoreGroup) {
        scoreGroup.members.push(member);
      } else {
        acc.push({ score: member.totalScore!, members: [member] });
      }
      return acc;
    }, [] as { score: number, members: IMember[] }[]);
  
    // Assign ranks to groups
    return groupedByScore.map((group, index) => ({
      rank: index + 1,
      members: group.members,
    }));
  }
}