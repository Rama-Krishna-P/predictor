import express, { Request, Response } from "express";
import { testFunction } from "test-lib";
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello World ${testFunction()}`)
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})