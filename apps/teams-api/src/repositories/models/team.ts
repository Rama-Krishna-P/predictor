import { Model } from "objection";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class Team extends Model {
    static get tableName() {
        return 'teams'
    }

    constructor() {
        super();
    }

    id: number
    name: string
    shortName: string
    logo: string
}