import { Router, Request, Response, NextFunction } from "express";
import { autoInjectable } from "tsyringe";
import { TeamsService } from "../services/teams-service";

@autoInjectable()
export class TeamsController {
    routes: Router = Router()

    static getRoutes() {
        const controller = new TeamsController()
        controller.routes.get('/', controller.getTeams)
        controller.routes.post('/', controller.createTeam)
        return controller.routes
    }

    constructor(private service?: TeamsService){
        console.log(service)
    }

    createTeam(req: Request, res: Response) {
        console.log(req.body)
        res.status(201).send('inserted')
    }

    async getTeams(_: Request, res: Response) {
        res.json(await this.service.getAllTeams())
        res.send({ message: 'Welcome to teams-api from teams controller!' });
    }
}