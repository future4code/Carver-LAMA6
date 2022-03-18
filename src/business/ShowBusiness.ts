import { ShowDatabase } from './../data/ShowDatabase';
import { Show, ShowInputDTO } from './entities/Show';
import { Authenticator } from './services/Authenticator';
import { HashManager } from './services/HashManager';
import { IdGenerator } from './services/IdGenerator';


export class ShowBusiness {

 constructor(
  private idGenerator: IdGenerator,
  private hashManager: HashManager,
  private authenticator: Authenticator,
  private showDatabase: ShowDatabase,
 ) { }

 async createShow(show: ShowInputDTO): Promise<void> {

  const id = this.idGenerator.generate();

  await this.showDatabase.createShow(
   id,
   show.week_day,
   show.start_time,
   show.end_time,
   show.band_id
  );
 }

 async getShowsByDate(date: string): Promise<Show[] | undefined> {
  const shows = await this.showDatabase.getShowsByDate(date)
  return shows
 }

 async getShowByTime(time: number): Promise<Show | undefined> {
  const show = await this.showDatabase.getShowsByTime(time)

  return show
 }

}