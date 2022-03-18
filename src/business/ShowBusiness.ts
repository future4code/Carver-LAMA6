import { ShowDatabase } from './../data/ShowDatabase'
import { ShowInputDTO } from './entities/Show'
import { IdGenerator } from './services/IdGenerator'

export class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private showDatabase: ShowDatabase
  ) {}

  async createShow(show: ShowInputDTO): Promise<void> {
    const id = this.idGenerator.generate()

    await this.showDatabase.createShow(
      id,
      show.week_day,
      show.start_time,
      show.end_time,
      show.band_id
    )
  }
}
