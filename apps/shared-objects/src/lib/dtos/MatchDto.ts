export interface MatchDto {
    id: number;
    matchNo: number;
    homeTeamId: string;
    awayTeamId: string;
    winnerTeamId: string | null;
    matchDateTime: Date;
    city: string;
    stadium: string;
    pointsAtStake: number;
    windowOpened: boolean;
  }
  