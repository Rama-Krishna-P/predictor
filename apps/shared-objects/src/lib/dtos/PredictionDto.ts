import { MatchDto } from "./MatchDto";

export interface PredictionDto {
    matchId: number;
    predictedTeamId: string | null;
    userId: string;
    penalty: number | null;
    points: number | null;
    bonus: number | null;
    match: MatchDto
  }
  