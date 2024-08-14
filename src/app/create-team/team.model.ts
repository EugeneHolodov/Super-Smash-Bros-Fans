
export interface IMember {
  name: string;
  icon: string;
  team_id?: string;
  id?: number; 
  totalScore?: number;
}

export interface IMatchFrom {
  id: string;
  date: string;
  winner: IMember;
  second: IMember;
  third: IMember;
  another?: IMember[];
  participants: IMember[];
}

export interface IMatchTo {
  date: string;
  winner: IMember;
  second: IMember;
  third: IMember;
  another?: IMember[];
  participants: IMember[];
}

export interface ITeamForm {
  id: string;
  owner: string;
  totalGames: number;
  name: string;
  image?: string; // Image can be a URL or a local path
  members: IMember[];
  matchesHistory: IMatchFrom[] | null;
}

export interface ITeamTo {
  id?: string;
  owner: string;
  totalGames?: number;
  name: string;
  image?: string; // Image can be a URL or a local path
  members: IMember[];
  matchesHistory?: IMatchTo[] | null;
}

export interface ITeam {
  id?: string;
  owner: string;
  totalGames?: number;
  name: string;
  image?: string; // Image can be a URL or a local path
  members: IMember[];
  matchesHistory: IMatchTo[] | null;
}
