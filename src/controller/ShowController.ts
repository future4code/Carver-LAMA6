import { Request, Response } from "express";
import { ShowInputDTO } from "../business/entities/Show";
import { CustomError } from "../business/error/CustomError";
import { IdGenerator } from '../business/services/IdGenerator';
import { ShowDatabase } from '../data/ShowDatabase';
import { ShowBusiness } from './../business/ShowBusiness';


const showBusiness = new ShowBusiness(
 new IdGenerator(),
 new ShowDatabase()
);

export class ShowController {

 async createShow(req: Request, res: Response) {
  try {

   const input: ShowInputDTO = {
    week_day: req.body.week_day,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    band_id: req.body.band_id
   }

   const showByTime = await showBusiness.getShowByTime(input.start_time)
   if (showByTime) {
    throw new CustomError(402, "Show has exist in that time")
   }

   await showBusiness.createShow(input)

   res.status(200).send("Show created sucessufull")

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

 async getShowsByDate(req:Request, res:Response){
  try{
   const date = req.params.date
   await showBusiness.getShowsByDate()

  }catch(error){
   res
   .status(error.statusCode || 400)
   .send({ error: error.message });
 }
  }
 }

}