import { ShowController } from './../ShowController';
import express from "express";

export const showRouter = express.Router();

const showController =new ShowController();

showRouter.post("", showController.createShow)
showRouter.get("",showController.getShowsByDate)