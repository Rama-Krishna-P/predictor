import { Model } from 'objection';

class Match extends Model {
  static tableName = 'matches';

  id!: number;
  matchNo!: number;
  homeTeamId!: string;
  awayTeamId!: string;
  winnerTeamId!: string | null;
  matchDateTime!: Date;
  city!: string;
  stadium!: string;
  pointsAtStake!: number;
  windowOpened!: boolean;
}

export default Match;