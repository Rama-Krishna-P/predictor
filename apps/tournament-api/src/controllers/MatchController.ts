import { Request, Response } from 'express';
import { autoInjectable, inject, injectable } from 'tsyringe';
import MatchService from '../services/MatchService';

@autoInjectable()
class MatchController {
  constructor(@inject(MatchService) private matchService: MatchService) {}

  createMatch = async (req: Request, res: Response) => {
    try {
      const match = await this.matchService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateWinnerTeamId = async (req: Request, res: Response) => {
    try {
      const match = await this.matchService.updateWinnerTeamId(Number(req.params.id), req.body.winnerTeamId);
      res.status(200).json(match);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateWindowOpened = async (req: Request, res: Response) => {
    try {
      const match = await this.matchService.updateWindowOpened(Number(req.params.id), req.body.windowOpened);
      res.status(200).json(match);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

   getMatchesWithoutWinner = async (req: Request, res: Response) => {
    try {
      const matches = await this.matchService.getMatchesWithoutWinner();
      res.status(200).json(matches);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  // getMatches = async (req: Request, res: Response) => {
  //   try {
  //     const matches = await this.matchService.getMatches();
  //     res.status(200).json(matches);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // getMatchById = async (req: Request, res: Response) => {
  //   try {
  //     const match = await this.matchService.getMatchById(Number(req.params.id));
  //     res.status(200).json(match);
  //   } catch (error) {
  //     res.status(404).json({ error: error.message });
  //   }
  // };

  // updateMatch = async (req: Request, res: Response) => {
  //   try {
  //     const match = await this.matchService.updateMatch(Number(req.params.id), req.body);
  //     res.status(200).json(match);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  // deleteMatch = async (req: Request, res: Response) => {
  //   try {
  //     await this.matchService.deleteMatch(Number(req.params.id));
  //     res.status(204).send();
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };
}

export default MatchController;